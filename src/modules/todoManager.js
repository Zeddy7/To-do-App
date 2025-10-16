import createProject from "./project.js";
import createTodo from "./todo.js";

const TodoManager = (function () {
   let projectList = [];
   const STORAGE_KEY = "todoProjects";

   const saveToStorage = () => {
      const dataToSave = projectList.map(project => project.toJSON());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
   };

   const rehydrateProject = parsedProject => {
      const rehydratedTodos = parsedProject.todos.map(parsedTodo =>
         createTodo(
            parsedTodo.title,
            parsedTodo.description,
            parsedTodo.dueDate,
            parsedTodo.priority,
            parsedTodo.isComplete,
            saveToStorage
         )
      );
      return createProject(parsedProject.title, rehydratedTodos, saveToStorage);
   };

   const loadFromStorage = () => {
      try {
         const storedData = localStorage.getItem(STORAGE_KEY);
         if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData) {
               projectList = parsedData.map(rehydrateProject);
            }
         }
      } catch (e) {
         console.error("Error loading from local storage:", e);
      }
   };

   const addProject = title => {
      const newProject = createProject(title, [], saveToStorage);
      projectList.push(newProject);
      saveToStorage();
      return newProject;
   };

   const removeProject = index => {
      projectList.splice(index, 1);
      saveToStorage()
   };


   const getProjects = () => projectList;

   function addTodoToProject(index, title, description, dueDate, priority) {
      // const chosenProject = index;
      const specificProject = projectList[index];
      if (specificProject) {
         specificProject.addNewTodo(title, description, dueDate, priority);
         // saveToStorage()
      }
   }

   function populateProject(defaultProject) {
      defaultProject.addNewTodo(
         "Build the UI",
         "Implement the DOM manipulation to render projects and todos.",
         "2025-10-17",
         "High Priority"
      );
      defaultProject.addNewTodo(
         "Test localStorage",
         "Add some test data and verify that it persists after a page refresh.",
         "2025-10-18",
         "Medium Priority"
      );
      defaultProject.addNewTodo(
         "Create a README.md file",
         "",
         "2025-10-18",
         "Medium Priority"
      );
   }

   (function init() {
      loadFromStorage();
      if (projectList.length === 0) {
         const defaultProject = addProject("Default");
         populateProject(defaultProject);
      }
   })();

   return { addProject, getProjects, addTodoToProject, removeProject };
})();

export default TodoManager;

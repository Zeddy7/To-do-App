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

   const getProjects = () => projectList;

   // const addTodoToProject = (
   //    projectIndex,
   //    title,
   //    description,
   //    dueDate,
   //    priority,
   //    saveToStorage
   // ) => {
   //    const project = projectList[projectIndex];
   //    if (project) {
   //       const newTodo = createTodo(
   //          title,
   //          description,
   //          dueDate,
   //          priority,
   //          saveToStorage
   //       );
   //       project.addNewTodo(newTodo);
   //       saveToStorage();
   //    }
   // };

   // New: Method to populate the default project with todos
   const populateDefaultProject = (defaultProject) => {
    const sampleTodos = [
      {
        title: "Build the UI",
        description: "Implement the DOM manipulation to render projects and todos.",
        dueDate: "2025-10-17",
        priority: "High"
      },
      {
        title: "Test localStorage",
        description: "Add some test data and verify that it persists after a page refresh.",
        dueDate: "2025-10-18",
        priority: "Medium"
      },
      {
        title: "Test localStorage",
      //   description: "Add some test data and verify that it persists after a page refresh.",
        dueDate: "2025-10-18",
        priority: "Medium"
      }
    ];

    

    sampleTodos.forEach(todoData => {
      // Use the project's internal addNewTodo method, which handles the callback
      defaultProject.addNewTodo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority
      );
    });
  };

  (function init() {
    loadFromStorage();
    if (projectList.length === 0) {
      const defaultProject = addProject("Default");
      populateDefaultProject(defaultProject);
    }
  })();

  return { addProject, getProjects };
})()

export default TodoManager;
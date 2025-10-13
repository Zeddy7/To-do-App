import createProject from "./project.js";
import createTodo from "./todo.js";

const TodoManager = (function () {
  let projectList = [];
  const STORAGE_KEY = "todoProjects";

  const saveToStorage = () => {
    const dataToSave = projectList.map(project => project.toJSON());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  };

  const rehydrateProject = (parsedProject) => {
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
    return createProject(
      parsedProject.title,
      parsedProject.description,
      rehydratedTodos,
      saveToStorage
    );
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

  const addProject = (title, description) => {
    const newProject = createProject(title, description, [], saveToStorage);
    projectList.push(newProject);
    saveToStorage();
    return newProject;
  };

  const getProjects = () => projectList;

  (function init() {
    loadFromStorage();
    if (projectList.length === 0) {
      addProject("Default Project", "Your first project!");
    }
  })();

  return { addProject, getProjects };
})();

export default TodoManager;

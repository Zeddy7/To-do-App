import createProject from './project.js'

const TodoModule = (function () {
   const projectList = [];

   const addProject = (title, description) => {
      const project = createProject(title, description);
      projectList.push(project);
      saveData();
      return project;
   };

   const getProjects = () => projectList;

   const saveData = () => {
      localStorage.setItem("todoProjectList", JSON.stringify(projectList));
   };

   const loadData = () => {
      const storedData = JSON.parse(localStorage.getItem("todoProjectList"));
      if (storedData) {
         rehydrateProjects(storedData);
      }
   };

   const rehydrateProjects = projects => {
      projects.forEach(project => {
         addProject(project.title, project.description)
         project.todoList.forEach(todo => {
            project.addNewTodo(todo)
         });
      });
   };

   // const rehydrateTodos = todos => {
   //    todos.forEach(todo => {
   //       createTodo(todo.title, todo.description, todo.dueDate, todo.priority);
   //    });
   // };

   
   (function init() {
      loadData();
      if (projectList.length === 0) {
         addProject("Default Project", "Your first project!");
      }
   })();

   return { addProject, getProjects };
})();

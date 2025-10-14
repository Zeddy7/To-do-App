import TodoManager from "./todoManager";

const DomManager = (function () {
   const projectContainer = document.querySelector(".project-container");
   const todoContainer = document.querySelector(".todo-container");

   const renderProjects = projects => {
      projectContainer.textContent = "";

      projects.forEach((project, index) => {
         const card = document.createElement("div");
         card.classList.add("project");
         card.dataset.index = index;

         card.innerHTML = `
            <li><a>${project.getTitle()}</a></li>`;

         card.addEventListener("click", e => {
            const idx = e.currentTarget.dataset.index;
            const selectedProject = TodoManager.getProjects()[idx];
            renderTodos(selectedProject.getTodoList());
         });

         projectContainer.appendChild(card);
      });
   };

   const renderTodos = todos => {
      todoContainer.textContent = "";

      todos.forEach(todo => {
         const card = document.createElement("div");
         card.classList.add("todo");
         card.innerHTML = `
         <h2>${todo.getTitle()}</h2>
         <p>Description: ${todo.getDesc()}</p>
         <h2>${todo.getDate()}</h2>
         <h2>${todo.getPrio()}</h2>
         <h2>${todo.getCompStatus()}</h2>`;
         todoContainer.appendChild(card);
      });
   };

   const myDialog = document.getElementById("myDialog");
   const openButton = document.getElementById("openDialog");
   const closeButton = document.getElementById("closeDialog");
   const addProjectButton = document.querySelector(".addProject");
   const title = document.querySelector("#title");
   const form = document.querySelector("form");

   openButton.addEventListener("click", () => {
      myDialog.showModal();
   });
   closeButton.addEventListener("click", () => {
      myDialog.close();
   });
   addProjectButton.addEventListener("click", e => {
      if (!title.value) return e.preventDefault();
      TodoManager.addProject(title.value);
      const projects = TodoManager.getProjects();
      renderProjects(projects);
      form.reset();
      myDialog.close();
   });

   const init = () => {
      const projects = TodoManager.getProjects();
      renderProjects(projects);
   };

   return { init, renderProjects, renderTodos };
})();

export default DomManager;

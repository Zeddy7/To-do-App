import TodoManager from "./todoManager";
import ProjectImage from "../images/assignment_add_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg";

const DomManager = (function () {
   const projectContainer = document.querySelector(".project-container");
   const todoContainer = document.querySelector(".todo-container");

   const renderProjects = projects => {
      projectContainer.textContent = "";

      projects.forEach((project, index) => {
         const card = document.createElement("div");
         const newImage = document.createElement("img");
         newImage.src = ProjectImage;

         card.classList.add("project");
         card.dataset.index = index;

         card.innerHTML = `
            <li><a>${project.getTitle()}</a></li>`;

         card.addEventListener("click", e => {
            const idx = e.currentTarget.dataset.index;
            const selectedProject = TodoManager.getProjects()[idx];
            renderTodos(selectedProject.getTodoList());
         });

         card.prepend(newImage);
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

   const title = document.querySelector("#title");
   const form = document.querySelector("form");
   const addProjectButton = document.querySelector(".addProject");
   const sidebar = document.getElementById("sidebar");
   const openProject = document.getElementById("open-project");
   const addProjectContent = document.querySelector(".dialog-content");
   const closeProjectContent = document.querySelector(".cancel-project");

   addProjectButton.addEventListener("click", () => {
      if (!title.value) return;
      TodoManager.addProject(title.value);
      const projects = TodoManager.getProjects();
      renderProjects(projects);
      form.reset();
      addProjectContent.classList.toggle("close-project");
   });

   openProject.addEventListener("click", () => {
      if (sidebar.classList.contains("close")) {
         sidebar.classList.toggle("close");
      }
      addProjectContent.classList.toggle("close-project");
      form.reset()
   });

   closeProjectContent.addEventListener("click", () => {
      form.reset();
      addProjectContent.classList.toggle("close-project");
   });

   //    const myDialog = document.getElementById("myDialog");
   //    const openButton = document.getElementById("openDialog");
   //    const closeButton = document.getElementById("closeDialog");
   //    const addProjectButton = document.querySelector(".addProject");
   //    const title = document.querySelector("#title");
   //    const form = document.querySelector("form");

   //    openButton.addEventListener("click", () => {
   //       myDialog.showModal();
   //    });
   //    closeButton.addEventListener("click", () => {
   //       myDialog.close();
   //    });
   //    addProjectButton.addEventListener("click", e => {
   //       if (!title.value) return e.preventDefault();
   //       TodoManager.addProject(title.value);
   //       const projects = TodoManager.getProjects();
   //       renderProjects(projects);
   //       form.reset();
   //       myDialog.close();
   //    });

   const init = () => {
      const projects = TodoManager.getProjects();
      renderProjects(projects);
   };

   return { init, renderProjects, renderTodos };
})();

export default DomManager;

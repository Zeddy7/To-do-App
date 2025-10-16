import TodoManager from "./todoManager";
import ProjectImage from "../images/assignment_add_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg";
import EditImage from "../images/edit.svg";
import DeleteImage from "../images/delete.svg";

const DomManager = (function () {
   const projectContainer = document.querySelector(".project-container");
   // const todoContainer = document.querySelector(".todo-container");
   const todoMain = document.querySelector(".todo-content");
   const myDialog = document.getElementById("myDialog");
   const openButton = document.getElementById("openDialog");
   const closeButton = document.querySelector(".closeDialog");
   const submitTodo = document.querySelector(".submit-todo");
   const todoTitle = document.querySelector("#todo-title");
   const dueDate = document.querySelector("#todo-date");
   const description = document.querySelector("#description");
   const taskPriority = document.querySelector("#task-priority");
   const form = document.querySelector(".todo-form");

   openButton.addEventListener("click", () => {
      myDialog.showModal();
   });

   closeButton.addEventListener("click", e => {
      e.preventDefault();
      myDialog.close();
   });

   let currentProjectIndex = 0;

   const renderProjects = projects => {
      projectContainer.textContent = "";

      projects.forEach((project, index) => {
         const card = document.createElement("div");
         const newImage = document.createElement("img");
         newImage.src = ProjectImage;

         const editImage = document.createElement("img");
         editImage.src = EditImage;

         card.classList.add("project");
         card.dataset.index = index;

         card.innerHTML = `
            <li>${project.getTitle()}</li>`;

         card.addEventListener("click", e => {
            currentProjectIndex = e.currentTarget.dataset.index;
            const selectedProject = TodoManager.getProjects()[currentProjectIndex];
            renderTodos(selectedProject.getTodoList());
         });

         editImage.addEventListener("click", e => {
            e.stopPropagation();
            myDialog.showModal();
         });

         card.prepend(newImage);
         card.append(editImage);
         projectContainer.appendChild(card);
      });
   };

   submitTodo.addEventListener("click", event => {
      event.preventDefault();
      if (!todoTitle.value || !dueDate.value || !taskPriority.value) return;
      
      TodoManager.addTodoToProject(
         currentProjectIndex,
         todoTitle.value,
         description.value,
         dueDate.value,
         taskPriority.value
      );
      
      displayTodoForSpecificProject(currentProjectIndex);
      form.reset();
      myDialog.close();
   });

   const renderTodos = todos => {
      todoMain.innerHTML = "";
      todos.forEach((todo, index) => {
         const todoContainer = document.createElement("div");
         todoContainer.classList.add("todo-container");

         const newImage = document.createElement("img");
         newImage.src = EditImage;
         
         const deleteImage = document.createElement("img");
         deleteImage.src = DeleteImage;

         todoContainer.innerHTML = `
         <input type="checkbox" id="item${index}" />
         <label for="item${index}">${todo.getTitle()}</label>
         <p class="todo-desc">${todo.getDesc()}</p>
         <p>${todo.getDate()}</p>`;

         newImage.addEventListener("click", e => {
            e.target;
            myDialog.showModal();
         });

         todoContainer.appendChild(newImage);
         todoContainer.appendChild(deleteImage);
         todoMain.appendChild(todoContainer);
      });
   };

   let currentTodoIndex = 0;


   const title = document.querySelector("#title");
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
      title.value = "";
      addProjectContent.classList.toggle("close-project");
   });

   openProject.addEventListener("click", () => {
      if (sidebar.classList.contains("close")) {
         sidebar.classList.toggle("close");
      }
      addProjectContent.classList.toggle("close-project");
      title.value = "";
   });

   closeProjectContent.addEventListener("click", () => {
      title.value = "";
      addProjectContent.classList.toggle("close-project");
   });

   function displayTodoForSpecificProject(index) {
      const specificProject = TodoManager.getProjects()[index];
      if (specificProject) {
         const todos = specificProject.getTodoList();
         renderTodos(todos);
      }
   }

   const init = () => {
      const projects = TodoManager.getProjects();
      renderProjects(projects);
   };

   return { init, renderProjects, renderTodos };
})();

export default DomManager;

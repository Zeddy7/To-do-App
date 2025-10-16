import TodoManager from "./todoManager";
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
         card.classList.add("project");
         card.dataset.index = index;

         const editImage = document.createElement("img");
         editImage.src = EditImage;

         const deleteImage = document.createElement("img");
         deleteImage.src = DeleteImage;

         card.innerHTML = `
         <li>${project.getTitle()}</li>`;

         card.addEventListener("click", e => {
            currentProjectIndex = e.currentTarget.dataset.index;
            const selectedProject =
               TodoManager.getProjects()[currentProjectIndex];
            renderTodos(selectedProject.getTodoList());
         });

         editImage.addEventListener("click", e => {
            e.stopPropagation();
            editProjectTitle.value = project.getTitle();
            editProjectDialog.showModal();
         });

         card.append(editImage);
         card.append(deleteImage);
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

   const editProjectDialog = document.querySelector("#myProjectDialog");
   const closeProjectEdit = document.querySelector(".cancel-edit-project");
   const submitEditProject = document.querySelector("#submit-edit-project");
   const editProjectTitle = document.querySelector("#edit-project-title");

   closeProjectEdit.addEventListener("click", e => {
      e.preventDefault();
      editProjectDialog.close();
   });

   submitEditProject.addEventListener("click", event => {
      event.preventDefault();
      if (!editProjectTitle.value) return;

      const specificProject = TodoManager.getProjects()[currentProjectIndex];
      if (specificProject) {
         specificProject.setTitle(editProjectTitle.value);
      }
      renderProjects(TodoManager.getProjects());

      displayTodoForSpecificProject(currentProjectIndex);
      form.reset();
      editProjectDialog.close();
   });

   const editTodoDialog = document.querySelector("#myTodoDialog");
   const closeEditButton = document.querySelector(".cancel-edit-todo");
   const submitEditTodo = document.querySelector("#submit-edit-todo");
   const editTodoTitle = document.querySelector("#edit-todo-title");
   const editDueDate = document.querySelector("#edit-todo-date");
   const editDescription = document.querySelector("#edit-description");
   const editTaskPriority = document.querySelector("#edit-task-priority");

   closeEditButton.addEventListener("click", e => {
      e.preventDefault();
      editTodoDialog.close();
   });

   let currentTodoIndex = 0;

   const renderTodos = todos => {
      todoMain.innerHTML = "";
      todos.forEach((todo, index) => {
         const todoContainer = document.createElement("div");
         todoContainer.classList.add("todo-container");
         todoContainer.dataset.index = index;

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
            currentTodoIndex =
               e.target.closest(".todo-container").dataset.index;
            editTodoTitle.value = todo.getTitle();
            editDescription.value = todo.getDesc();
            editDueDate.value = todo.getDate();
            editTaskPriority.value = todo.getPrio();
            editTodoDialog.showModal();
         });

         todoContainer.appendChild(newImage);
         todoContainer.appendChild(deleteImage);
         todoMain.appendChild(todoContainer);
      });
   };

   submitEditTodo.addEventListener("click", event => {
      event.preventDefault();
      if (!editTodoTitle.value || !editDueDate.value || !editTaskPriority.value)
         return;

      const specificProject = TodoManager.getProjects()[currentProjectIndex];
      if (specificProject) {
         const todos = specificProject.getTodoList();
         const specificTodo = todos[currentTodoIndex];
         if (specificTodo) {
            specificTodo.setTitle(editTodoTitle.value);
            specificTodo.setDesc(editDescription.value);
            specificTodo.setDate(editDueDate.value);
            specificTodo.setPrio(editTaskPriority.value);
         }
      }

      displayTodoForSpecificProject(currentProjectIndex);
      form.reset();
      editTodoDialog.close();
   });

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

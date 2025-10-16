import TodoManager from "./todoManager";
import EditImage from "../images/edit.svg";
import DeleteImage from "../images/delete.svg";

const DomManager = (function () {
   const projectContainer = document.querySelector(".project-container");
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

   const editProjectDialog = document.querySelector("#myProjectDialog");
   const closeProjectEdit = document.querySelector(".cancel-edit-project");
   const submitEditProject = document.querySelector("#submit-edit-project");
   const editProjectTitle = document.querySelector("#edit-project-title");

   const editTodoDialog = document.querySelector("#myTodoDialog");
   const closeEditButton = document.querySelector(".cancel-edit-todo");
   const submitEditTodo = document.querySelector("#submit-edit-todo");
   const editTodoTitle = document.querySelector("#edit-todo-title");
   const editDueDate = document.querySelector("#edit-todo-date");
   const editDescription = document.querySelector("#edit-description");
   const editTaskPriority = document.querySelector("#edit-task-priority");

   const title = document.querySelector("#title");
   const addProjectButton = document.querySelector(".addProject");
   const sidebar = document.getElementById("sidebar");
   const openProject = document.getElementById("open-project");
   const addProjectContent = document.querySelector(".dialog-content");
   const closeProjectContent = document.querySelector(".cancel-project");

   let currentProjectIndex = 0;
   let currentTodoIndex = 0;

   const renderProjects = projects => {
      projectContainer.textContent = "";

      projects.forEach((project, index) => {
         const card = document.createElement("div");
         card.classList.add("project");
         card.classList.add("sides");
         card.dataset.index = index;

         const editImage = document.createElement("img");
         editImage.src = EditImage;

         const deleteImage = document.createElement("img");
         deleteImage.src = DeleteImage;

         const listProject = document.createElement("li");
         listProject.textContent = project.getTitle();

         listProject.classList.add("sides");

         deleteImage.addEventListener("click", e => {
            e.target;
            const projectIndex = e.target.closest(".project").dataset.index;
            TodoManager.removeProject(projectIndex);
            renderProjects(TodoManager.getProjects());
            todoMain.innerHTML = "";
         });

         // Select project
         card.addEventListener("click", e => {
            currentProjectIndex = e.currentTarget.dataset.index;
            const selectedProject =
               TodoManager.getProjects()[currentProjectIndex];

            if (!selectedProject) return;
            renderTodos(selectedProject.getTodoList());
         });

         // Edit project
         editImage.addEventListener("click", e => {
            // e.stopPropagation();
            editProjectTitle.value = project.getTitle();
            editProjectDialog.showModal();
         });

         card.append(listProject);
         card.append(editImage);
         card.append(deleteImage);
         projectContainer.appendChild(card);
      });
   };

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

         let checkbox = document.createElement("input");
         checkbox.type = "checkbox";
         checkbox.id = `item${index}`;

         let label = document.createElement("label");
         label.htmlFor = `item${index}`;
         label.textContent = `${todo.getTitle()}`;

         todoContainer.innerHTML = `
         <p class="todo-desc">${todo.getDesc()}</p>
         <p>${todo.getDate()}</p>`;

         // Delete todo
         deleteImage.addEventListener("click", e => {
            e.target;
            const todoIndex = e.target.closest(".todo-container").dataset.index;
            TodoManager.getProjects()[currentProjectIndex].removeTodo(
               todoIndex
            );
            displayTodoForSpecificProject(currentProjectIndex);
         });

         // Edit todo (open dialog and populate)
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

         let todoCompStatus = todo.getCompStatus();

         checkbox.addEventListener("change", function () {
            todo.toggleCompStatus();
            todoContainer.classList.toggle("completed-todo", this.checked);
         });

         checkbox.checked = todoCompStatus;
         if (todoCompStatus) {
            todoContainer.classList.add("completed-todo");
         }

         todoContainer.prepend(label);
         todoContainer.prepend(checkbox);
         todoContainer.appendChild(newImage);
         todoContainer.appendChild(deleteImage);
         todoMain.appendChild(todoContainer);
      });
   };

   // Event bindings (dialogs & forms)
   const bindDialogEvents = () => {
      openButton.addEventListener("click", () => {
         myDialog.showModal();
      });

      closeButton.addEventListener("click", e => {
         e.preventDefault();
         myDialog.close();
      });

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
   };

   const bindProjectEditEvents = () => {
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
   };

   const bindTodoEditEvents = () => {
      closeEditButton.addEventListener("click", e => {
         e.preventDefault();
         editTodoDialog.close();
      });

      submitEditTodo.addEventListener("click", event => {
         event.preventDefault();
         if (
            !editTodoTitle.value ||
            !editDueDate.value ||
            !editTaskPriority.value
         )
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
   };

   const bindProjectCreationEvents = () => {
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
   };

   function displayTodoForSpecificProject(index) {
      const specificProject = TodoManager.getProjects()[index];
      if (specificProject) {
         const todos = specificProject.getTodoList();
         renderTodos(todos);
      }
   }

   // Initialize bindings immediately
   const bindAll = () => {
      bindDialogEvents();
      bindProjectEditEvents();
      bindTodoEditEvents();
      bindProjectCreationEvents();
   };

   bindAll();

   // const renderAllTodos = (projects) => {
   //    projects.forEach(project => {
   //       let allTodos = project.getTodoList();
   //       console.log('Todos from project:', project.getTitle());
   //       console.log('AllTodos:', allTodos);
   //       renderTodos(allTodos);
   //    });
   // }

   const initProjects = () => {
      const projects = TodoManager.getProjects();
      renderProjects(projects);
   };

   const initTodos = () => {
      const projects = TodoManager.getProjects();
      renderAllTodos(projects);
   };

   return { initProjects, renderProjects, renderTodos, initTodos };
})();

export default DomManager;

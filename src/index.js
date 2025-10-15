import DomManager from "./modules/domManger";
import "./style.css";

DomManager.init();

const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const addProjectContent = document.querySelector(".dialog-content");

toggleButton.addEventListener("click", () => {
   sidebar.classList.toggle("close");
   addProjectContent.classList.remove("close-project");
});

const myDialog = document.getElementById("myDialog");
const openButton = document.getElementById("openDialog");
const closeButton = document.querySelector(".closeDialog");
const submitTodo = document.querySelector(".submit-todo");
const todoTitle = document.querySelector("#todo-title");
const dueDate = document.querySelector("#todo-date");
const description = document.querySelector("#description");
const taskPriority = document.querySelector("#task-priority");
const todoContainer = document.querySelector(".todo-container");

openButton.addEventListener("click", () => {
   myDialog.showModal();
});

todoContainer.addEventListener("click", () => {
   // e.target;
   myDialog.showModal();
});

closeButton.addEventListener("click", () => {
   myDialog.close();
});
submitTodo.addEventListener("click", e => {
   // if ((!title.value, !dueDate.value, !description.value))
      return e.preventDefault();
   // addBookToLibrary(
   //    title.value,
   //    description.value,
   //    dueDate.value,
   //    taskPriority.value
   // );
   // displayBooks();
   form.reset();
   myDialog.close();
});

// function toggleSubMenu(button) {
//    if (!button.nextElementSibling.classList.contains("show")) {
//       closeSubMenus();
//    }

//    button.nextElementSibling.classList.toggle("show");
//    button.classList.toggle("rotate");

//    if (sidebar.classList.contains("close")) {
//       sidebar.classList.toggle("close");
//    }
// }

// function closeSubMenus() {
//    Array.from(sidebar.getElementsByClassName("show")).forEach(ul => {
//       ul.classList.remove("show");
//       ul.previousElementSibling.classList.remove("rotate");
//    });
// }

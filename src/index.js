import DomManager from "./modules/domManager";
import "./style.css";

DomManager.initProjects();

const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const addProjectContent = document.querySelector(".dialog-content");
// const checks = document.querySelector(".todo-check");

toggleButton.addEventListener("click", () => {
   sidebar.classList.toggle("close");
   addProjectContent.classList.remove("close-project");
});

function setActiveItem(selectedElement) {
   const allItems = document.querySelectorAll(".sides");

   allItems.forEach(item => {
      item.classList.remove("active");
   });

   selectedElement.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
   const sidebarItems = document.querySelectorAll(".sides");
   sidebarItems.forEach(item => {
      item.addEventListener("click", event => {
         setActiveItem(event.currentTarget);
      });
   });
});

import DomManager from "./modules/domManager";
import "./style.css";

DomManager.initProjects();
DomManager.initTodos();

const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const addProjectContent = document.querySelector(".dialog-content");
const allTodos = document.querySelector(".all-todos");
const todayTodos = document.querySelector(".today");
const thisWeekTodos = document.querySelector(".this-week");

allTodos.addEventListener("click", () => {
   DomManager.initTodos();
})

todayTodos.addEventListener("click", (e) => {
   if (e.currentTarget.classList.contains("active")) {
      return;
   }
   DomManager.initTodayTodos();
})

thisWeekTodos.addEventListener("click", () => {
   DomManager.initWeekTodos();
})

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

document.addEventListener("click", () => {
   const sidebarItems = document.querySelectorAll(".sides");
   sidebarItems.forEach(item => {
      item.addEventListener("click", event => {
         setActiveItem(event.currentTarget);
      });
   });
});

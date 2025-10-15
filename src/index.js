import DomManager from "./modules/domManager";
import "./style.css";

DomManager.init();

const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const addProjectContent = document.querySelector(".dialog-content");

toggleButton.addEventListener("click", () => {
   sidebar.classList.toggle("close");
   addProjectContent.classList.remove("close-project");
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


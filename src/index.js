import DomManager from "./modules/domManger";
import "./style.css"

DomManager.init()

const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

function toggleSidebar() {
   sidebar.classList.toggle("close");
   closeSubMenus();
}

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
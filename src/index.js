import { addHomeContent } from "./home";
import { addMenuContent } from "./menu";
import { addContactContent } from "./contact";
import "./style.css";

addHomeContent();

const homeButton = document.querySelector("#home");
const menuButton = document.querySelector("#menu");
const contactButton = document.querySelector("#contact");

homeButton.classList.add("active");

let homeActive = true;
let menuActive = false;
let contactActive = false;

homeButton.addEventListener("click", () => {
   addHomeContent();

   homeButton.classList.add("active");
   menuButton.classList.remove("active");
   contactButton.classList.remove("active");
});

menuButton.addEventListener("click", () => {
   addMenuContent();

   menuButton.classList.add("active");
   homeButton.classList.remove("active");
   contactButton.classList.remove("active");
});

contactButton.addEventListener("click", () => {
   addContactContent();

   contactButton.classList.add("active");
   homeButton.classList.remove("active");
   menuButton.classList.remove("active");
});

import Burger1 from "./images/burger1.png";
import Burger2 from "./images/burger2.png";
import Burger3 from "./images/burger3.png";
import Burger4 from "./images/burger4.png";
import Burger5 from "./images/burger5.png";
import Burger6 from "./images/burger6.png";
import Burger7 from "./images/burger7.png";
import Burger8 from "./images/burger8.png";
import Burger9 from "./images/burger9.png";
import Burger10 from "./images/bacon-burger.png";

const menuItems = [
   {
      image: Burger1,
      title: "Cheeseburger",
      price: "$9.00",
   },
   {
      image: Burger2,
      title: "Bacon Burger",
      price: "$10.50",
   },
   {
      image: Burger3,
      title: "Veggie Burger",
      price: "$8.50",
   },
   {
      image: Burger5,
      title: "Turkey Burger",
      price: "$5.50",
   },
   {
      image: Burger6,
      title: "Chicken Burger",
      price: "$7.50",
   },
   {
      image: Burger7,
      title: "Bison Burger",
      price: "$8.30",
   },
   {
      image: Burger8,
      title: "California Burger",
      price: "$9.20",
   },
   {
      image: Burger9,
      title: "Green Chile Cheeseburger",
      price: "$8.50",
   },
   {
      image: Burger10,
      title: "ShackBurger",
      price: "$8.10",
   },
   {
      image: Burger4,
      title: "Gourmet Burger",
      price: "$8.50",
   },
];

function createMenuItem(item) {
   const menuItemContainer = document.createElement("div");
   menuItemContainer.classList.add("menu-item");

   const newImage = document.createElement("img");
   newImage.src = item.image;
   newImage.alt = item.title;

   const heading = document.createElement("h3");
   heading.textContent = item.title;

   const price = document.createElement("h2");
   price.textContent = item.price;

   menuItemContainer.appendChild(newImage);
   menuItemContainer.appendChild(heading);
   menuItemContainer.appendChild(price);

   return menuItemContainer;
}

export function addMenuContent() {
   const content = document.querySelector("#content");

   content.textContent = "";
   const menuItemContainer = document.createElement("div");
   menuItemContainer.classList.add("image-con");

   menuItems.forEach(item => {
      const menuItemElement = createMenuItem(item);
      menuItemContainer.appendChild(menuItemElement);
      content.appendChild(menuItemContainer);
   });
}

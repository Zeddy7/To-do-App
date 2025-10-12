import RestaurantImage from "./images/burger0.jpg";

export function addHomeContent() {
   const content = document.querySelector("#content");

   content.textContent = "";
   const heading = document.createElement("div");
   const hours = document.createElement("div");

   heading.classList.add("intro");
   hours.classList.add("hours");

   heading.innerHTML = `<h1>Welcome To Zeddys</h1>
               <p>
                 Ontario, prepare your taste buds for a new burger experience! Zeddys is thrilled to announce our grand opening. We're bringing the best, juiciest burgers, with every patty grilled to perfection. Celebrate with us. Don't miss out!
               </p>`;
   hours.innerHTML = `<h1>Hours</h1>
<p>Sunday: 8am - 8pm</p>
<p>Monday: 6am - 6pm</p>
<p>Tuesday: 6am - 6pm</p>
<p>Wednesday: 6am - 6pm</p>
<p>Thursday: 6am - 10pm</p>
<p>Friday: 6am - 10pm</p>
<p>Saturday: 8am - 10pm</p>`;
   const myRestaurantImage = document.createElement("img");
   myRestaurantImage.src = RestaurantImage;

   content.appendChild(heading);
   heading.appendChild(myRestaurantImage);
   content.appendChild(hours);
}

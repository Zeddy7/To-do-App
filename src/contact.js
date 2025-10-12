import locationImage from "./images/location.png";

export function addContactContent() {
   const content = document.querySelector("#content");

   content.textContent = "";
   const heading = document.createElement("h2");
   const secondDiv = document.createElement("div");
   const hours = document.createElement("div");

   secondDiv.classList.add("contact");
   hours.classList.add("hours");

   heading.textContent = "Contact Us"
   secondDiv.innerHTML = ` <h3>📞 123 456 789</h3>
            <h3>📩 zeddyseats@gmail.com</h3>
            <h3>🏠 Niagara Falls 42, Ontario, Canada.</h3>`;

   const myLocationImage = document.createElement("img");
   myLocationImage.src = locationImage;

   secondDiv.appendChild(myLocationImage);
   content.appendChild(heading);
   content.appendChild(secondDiv);
}

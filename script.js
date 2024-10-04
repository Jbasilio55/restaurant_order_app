import { menuArray } from "/data.js";
const menuCards = document.querySelector(".menu-cards");

function renderCards() {
  const cards = menuArray
    .map((card) => {
      const { name, ingredients, id, price, emoji } = card;

      return `
        <div class="card">
            <h2 class="emoji">${emoji}</h2>
            <div class="details">
                <h2>${name}</h2>
                <p>${ingredients.join(", ")}</p>
                <h3 data-set="${id}">$${price}</h3>
            </div>
            <button class="btn">+</button>
        </div>
        `;
    })
    .join("");

  menuCards.innerHTML = cards;
}

renderCards();

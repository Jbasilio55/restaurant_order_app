import { menuArray } from "/data.js";
const menuCards = document.querySelector(".menu-cards");

let cart = [];

const cards = menuArray

  .map((card) => {
    const { name, ingredients, id, price, emoji } = card;

    return `
        <div class="card" data-set="${id}">
            <div class="details-container">
                <h2 class="emoji">${emoji}</h2>
                <div class="details">
                    <h2>${name}</h2>
                    <p>${ingredients.join(", ")}</p>
                    <h3 data-price="${id}">$${price}</h3>
                </div>
            </div>
            <button class="btn" id="btn-${id}">+</button>
        </div>
        `;
  })
  .join("");

menuCards.innerHTML = cards;

const btn = document.querySelector(".btn");
const order = document.querySelector(".order");
const total = document.querySelector(".total");
const container = document.querySelector(".container");
const itemContainer = document.querySelector(".items");

menuCards.addEventListener("click", (e) => {
  let target = e.target;
  let parentTarget = target.parentElement;
  let id = Number(parentTarget.dataset.set);

  for (let item of menuArray) {
    if (item.id === id) {
      addItem(item);
    }
  }

  console.log(cart);

  if (cart.length > 0) {
    order.style.display = "block";
    container.style.overflow = "scroll";
  }

  const orderItem = cart.map((item) => {
    return `
      <div class="order-items">
      <div class="order-items-container">
        <h3>${item.name} x( ${item.quantity} )</h3>
        <a href="#">remove</a>
      </div>
        <p>$${item.price * item.quantity}</p>
      </div>`;
  });

  itemContainer.innerHTML = orderItem.join("");
});

function addItem(item) {
  if (!cart.includes(item)) {
    item.quantity = 1;
    cart.push(item);
  } else {
    item.quantity++;
  }
}

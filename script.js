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

const order = document.querySelector(".order");
const total = document.querySelector(".total");
const container = document.querySelector(".container");
const itemContainer = document.querySelector(".items");
const submitBtn = document.querySelector(".submit-btn");
const modalContainer = document.querySelector(".modal-container");
const form = document.querySelector(".form");
const completeContainer = document.querySelector(".order-completion");
const complete = document.querySelector(".complete");

menuCards.addEventListener("click", (e) => {
  completeContainer.style.display = "none";
  complete.textContent = "";

  let target = e.target;
  let parentTarget = target.parentElement;
  let id = Number(parentTarget.dataset.set);

  for (let item of menuArray) {
    if (item.id === id) {
      addItem(item);
    }
  }

  if (cart.length > 0) {
    order.style.display = "block";
  }

  updateOrder();
});

const remove = document.querySelector(".remove");

order.addEventListener("click", (e) => {
  let id = Number(e.target.dataset.item);

  for (let item of cart) {
    if (item.id === id) {
      removeItem(item);
    }
  }

  if (cart.length < 1) {
    order.style.display = "none";
    container.style.overflow = "hidden";
  }

  updateOrder();
});

submitBtn.addEventListener("click", () => {
  modalContainer.style.display = "block";
});

form.addEventListener("submit", (e) => {
  const nameInput = document.getElementById("name");
  const cardNumber = document.getElementById("cardNumber");
  const cvv = document.getElementById("cvv");

  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  console.log(formData);

  modalContainer.style.display = "none";
  cart = [];
  updateOrder();
  order.style.display = "none";
  completeContainer.style.display = "flex";
  complete.textContent = `Thanks, ${name}! your order is on its way!`;

  nameInput.value = "";
  cardNumber.value = "";
  cvv.value = "";
});

function addItem(item) {
  if (!cart.includes(item)) {
    item.quantity = 1;
    cart.push(item);
  } else {
    item.quantity++;
  }
}

function removeItem(item) {
  let index = cart.findIndex((i) => i === item);

  if (item.quantity < 2) {
    cart.splice(index, 1);
  } else {
    item.quantity--;
  }
}

function updateOrder() {
  let orderItem = cart.map((item) => {
    return `
          <div class="order-items">
          <div class="order-items-container">
            <h3>${item.name} x( ${item.quantity} )</h3>
            <a href="#" class="remove" data-item="${item.id}">remove</a>
          </div>
            <p>$${item.price * item.quantity}</p>
          </div>`;
  });

  itemContainer.innerHTML = orderItem.join("");

  let totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  total.innerHTML = `<div class="total-price">
                        <h2>Total Price:</h2>
                        <h3>$${totalPrice}</h3>
                    </div>`;
}

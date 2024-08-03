//========================================================================================================================================================
function mobileNav() {
  const navBtn = document.querySelector(".mobile-nav-btn");
  const nav = document.querySelector(".mobile-nav");
  const menuIcon = document.querySelector(".nav-icon");
  const header = document.querySelector(".header");

  // Відстеження, чи користувач проскролив сторінку
  let userScrolled = false;

  window.onscroll = function () {
    if (window.scrollY > 10) {
      header.classList.add("scroll");
      userScrolled = true;
    } else {
      header.classList.remove("scroll");
      userScrolled = false;
    }
  };

  navBtn.onclick = function () {
    nav.classList.toggle("mobile-nav--open");
    menuIcon.classList.toggle("nav-icon--active");
    document.body.classList.toggle("no-scroll");

    if (!userScrolled) {
      if (nav.classList.contains("mobile-nav--open")) {
        header.classList.add("scroll");
      } else {
        header.classList.remove("scroll");
      }
    }
  };
}

document.addEventListener("DOMContentLoaded", mobileNav);

//========================================================================================================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Check if Swiper is defined
  if (typeof Swiper !== "undefined") {
    const swiper = new Swiper(".swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerView: 6.2,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-prev",
        prevEl: ".swiper-button-next"
      },
      scrollbar: {
        el: ".swiper-scrollbar"
      },
      breakpoints: {
        // when window width is >= 0px and < 760px
        0: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        // when window width is >= 760px and < 967px
        760: {
          slidesPerView: 3.2,
          spaceBetween: 20
        },
        // when window width is >= 967px
        967: {
          slidesPerView: 6.2,
          spaceBetween: 20
        }
      }
    });
  }
});
//========================================================================================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const sortOptions = document.querySelectorAll(".sort-option");
  const foodContainer = document.getElementById("foodContainer");
  const foodItems = Array.from(document.querySelectorAll(".popular__content-dish"));

  if (dropdownButton && dropdownMenu) {
    dropdownButton.addEventListener("click", function () {
      this.classList.toggle("active");
      dropdownMenu.classList.toggle("active");
    });
  }

  if (
    sortOptions.length > 0 &&
    dropdownButton &&
    dropdownMenu &&
    foodContainer &&
    foodItems.length > 0
  ) {
    sortOptions.forEach((option) => {
      option.addEventListener("click", function () {
        dropdownButton.textContent = this.textContent;
        dropdownButton.classList.remove("active");
        dropdownMenu.classList.remove("active");
        handleSortChange(this.getAttribute("data-value"));
      });
    });

    function handleSortChange(value) {
      let sortedItems;
      if (value === "high-price") {
        sortedItems = foodItems.sort(
          (a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price)
        );
      } else if (value === "low-price") {
        sortedItems = foodItems.sort(
          (a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price)
        );
      } else if (value === "low-weight") {
        sortedItems = foodItems.sort(
          (a, b) => parseFloat(a.dataset.weight) - parseFloat(b.dataset.weight)
        );
      } else if (value === "high-weight") {
        sortedItems = foodItems.sort(
          (a, b) => parseFloat(b.dataset.weight) - parseFloat(a.dataset.weight)
        );
      }
      foodContainer.innerHTML = "";
      sortedItems.forEach((item) => foodContainer.appendChild(item));
    }
  }
});
//========================================================================================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".order-box-counter");

  counters.forEach((counterElement) => {
    const decreaseButton = counterElement.querySelector(".box__counter-btn.decrease");
    const increaseButton = counterElement.querySelector(".box__counter-btn.increase");
    const counterNumber = counterElement.querySelector(".box__counter-number");

    decreaseButton.addEventListener("click", () => {
      let currentCount = parseInt(counterNumber.textContent);
      if (currentCount > 1) {
        currentCount -= 1;
        counterNumber.textContent = `${currentCount} шт`;
      }
    });

    increaseButton.addEventListener("click", () => {
      let currentCount = parseInt(counterNumber.textContent);
      if (currentCount < 9) {
        currentCount += 1;
        counterNumber.textContent = `${currentCount} шт`;
      }
    });
  });
});
//========================================================================================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".order__add");
  const shoppingCartNumber = document.getElementById("cart-counter");
  const popup = document.querySelector(".popup");
  const emptyCart = document.querySelector(".empty");

  const showPopup = () => {
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  };

  const updateCartNumber = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    shoppingCartNumber.textContent = totalItems;
    shoppingCartNumber.style.display = totalItems > 0 ? "block" : "none";
    toggleEmptyCartText();
  };

  const toggleEmptyCartText = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (emptyCart) {
      emptyCart.style.display = cart.length === 0 ? "block" : "none";
    }
  };

  const handleAddToCart = (name, price, img, weight, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((item) => item.name === name);
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ name, price, img, weight, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartNumber();
    showPopup();
  };

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const isOrderBox = button.closest(".card__order-box");
      let name, price, img, weight, quantity;

      if (isOrderBox) {
        // Обробка для блоків з вибором кількості
        const orderBox = isOrderBox;
        name = orderBox.dataset.name;
        price = parseFloat(orderBox.querySelector(".dish-card__price").textContent);
        img = orderBox.dataset.img;
        weight = orderBox.dataset.weight;
        quantity = parseInt(orderBox.querySelector(".box__counter-number").textContent);
      } else {
        // Обробка для основних блоків
        name = button.dataset.name;
        price = parseFloat(button.dataset.price);
        img = button.dataset.img;
        weight = button.dataset.weight;
        quantity = 1; // Задаємо кількість як 1 для основного блоку
      }

      handleAddToCart(name, price, img, weight, quantity);
    });
  });

  toggleEmptyCartText();
  updateCartNumber();
});
//========================================================================================================================================================
//policy
const policyText = document.querySelector(".policy-popup");
const policyUserText = document.querySelector(".policy-popup-user");
const policyBtn = document.querySelector(".footer__policy-policy");
const policyUserBtn = document.querySelector(".footer__policy-user");
const closeBtns = document.querySelectorAll(".policy-popup__close-btn");
policyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  policyText.classList.add("show");
  document.body.classList.add("no-scroll");
});

policyUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  policyUserText.classList.add("show");
  document.body.classList.add("no-scroll");
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".policy-popup").classList.remove("show");
    document.body.classList.remove("no-scroll");
  });
});
//========================================================================================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const deliveryHome = document.querySelector(".delivery-box__home");
  const deliveryAlley = document.querySelector(".delivery-box__alley");
  const deliveryForm = document.querySelector(".delivery-box__form");

  if (deliveryHome && deliveryAlley && deliveryForm) {
    function toggleActiveClass(event) {
      deliveryHome.classList.remove("active");
      deliveryAlley.classList.remove("active");

      event.currentTarget.classList.add("active");

      if (event.currentTarget === deliveryAlley) {
        deliveryForm.style.display = "none";
      } else {
        deliveryForm.style.display = "block";
      }
    }

    deliveryHome.addEventListener("click", toggleActiveClass);
    deliveryAlley.addEventListener("click", toggleActiveClass);
  }
});
//========================================================================================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const placeOrderButton = document.querySelector(".palce__order");

  if (placeOrderButton) {
    placeOrderButton.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length > 0) {
        localStorage.setItem("orderCart", JSON.stringify(cart));
        window.location.href = "place-order.html";
      } else {
        alert("Ваш кошик порожній.");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const finalOrderContainer = document.querySelector(".final__order");

  if (finalOrderContainer) {
    const orderCart = JSON.parse(localStorage.getItem("orderCart")) || [];

    if (orderCart.length === 0) {
      finalOrderContainer.innerHTML = "<p>Ваш кошик порожній.</p>";
      return;
    }

    let totalAmount = 0;

    orderCart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("order-item");

      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;

      itemElement.innerHTML = `
        <div class="order-item__inner">
          <img src="${item.img}" class="order-item__img" alt="${item.name}" />
          <div class="order-item__details">
            <p class="order-item__name">${item.name}</p>
            <div class="order-item__result">
              <p class="order-item__quantity">${item.quantity} шт</p>
              <p class="order-item__total">${item.price * item.quantity} ₴</p>
            </div>
          </div>
        </div>
      `;

      finalOrderContainer.appendChild(itemElement);
    });

    // Додаємо фінальну суму
    const totalAmountElement = document.createElement("div");
    totalAmountElement.classList.add("order-total");

    totalAmountElement.innerHTML = `
      <p class="final__sum">Фінальна сума: <strong>${totalAmount} ₴</strong></p>
    `;

    finalOrderContainer.appendChild(totalAmountElement);
  }
});
//========================================================================================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const paymentBoxes = document.querySelectorAll(".payment-box__kuryer");

  function handleClick(event) {
    paymentBoxes.forEach((box) => {
      const sircleRatio = box.querySelector(".sircle-ratio");
      box.classList.remove("active");
      sircleRatio.classList.remove("active");
    });

    const clickedBox = event.currentTarget;
    const clickedSircleRatio = clickedBox.querySelector(".sircle-ratio");

    clickedBox.classList.add("active");
    clickedSircleRatio.classList.add("active");
  }

  paymentBoxes.forEach((box) => {
    box.addEventListener("click", handleClick);
  });
});
//========================================================================================================================================================
//place order show product list
document.addEventListener("DOMContentLoaded", function () {
  const finalOrderMobile = document.querySelector(".final__order.mobile");
  const finalOrderArrow = document.querySelector(".final__order-arrow");
  const finalOrderInner = document.querySelector(".final__order-inner");
  const changeText = document.querySelector(".order-text-change");
  finalOrderMobile.addEventListener("click", function () {
    finalOrderMobile.classList.toggle("active");
    finalOrderArrow.classList.toggle("active");
    finalOrderInner.classList.toggle("active");
    if (finalOrderMobile.classList.contains("active")) {
      changeText.textContent = "Закрити замовлення";
    } else {
      changeText.textContent = "Відкрити замовлення";
    }
  });
});

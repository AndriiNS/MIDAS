window.onscroll = function () {
  const header = document.querySelector(".header");

  if (window.scrollY > 10) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
};
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
    if (popup) {
      popup.classList.add("show");
      setTimeout(() => {
        popup.classList.remove("show");
      }, 3000);
    }
  };

  const updateCartNumber = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (shoppingCartNumber) {
      shoppingCartNumber.textContent = totalItems;
      shoppingCartNumber.style.display = totalItems > 0 ? "block" : "none";
    }
    toggleEmptyCartText();
  };

  const toggleEmptyCartText = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (emptyCart) {
      emptyCart.style.display = cart.length === 0 ? "block" : "none";
    }
  };

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const name = event.target.dataset.name;
      const price = event.target.dataset.price;
      const img = event.target.dataset.img;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const product = {
        name,
        price,
        img,
        quantity: 1
      };

      const existingProductIndex = cart.findIndex((item) => item.name === name);
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartNumber();
      showPopup();
    });
  });

  updateCartNumber();
});

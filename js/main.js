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
});
//========================================================================================================================================================
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const sortOptions = document.querySelectorAll(".sort-option");

  dropdownButton.addEventListener("click", function () {
    this.classList.toggle("active");
    dropdownMenu.classList.toggle("active");
  });

  sortOptions.forEach((option) => {
    option.addEventListener("click", function () {
      dropdownButton.textContent = this.textContent;
      dropdownButton.classList.remove("active");
      dropdownMenu.classList.remove("active");
      handleSortChange(this.getAttribute("data-value"));
    });
  });

  function handleSortChange(value) {
    if (value === "high-price") {
      console.log("Сортування по зростанню ціни");
    } else if (value === "low-price") {
      console.log("Сортування по спаду ціни");
    } else if (value === "low-weight") {
      console.log("Сортування по спаду грамовки");
    } else if (value === "high-weight") {
      console.log("Сортування по росту грамовки");
    }
  }
});

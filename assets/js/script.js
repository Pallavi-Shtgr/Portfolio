'use strict';

// Toggle element visibility
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
};

// Sidebar toggle functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
});

// Custom select functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { 
  elementToggleFunc(this); 
});

// Handle select item clicks for filtering
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Filtering function
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Filter buttons
let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Toggle skills list visibility
function toggleSkills(categoryId) {
  const skillsDetail = document.getElementById(categoryId);
  skillsDetail.style.display = skillsDetail.style.display === "block" ? "none" : "block";
}

// Page navigation functionality
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
navigationLinks.forEach((navLink, index) => {
  navLink.addEventListener("click", function () {
    pages.forEach((page, j) => {
      if (navLink.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    });
  });
});

// Typewriter effect
const roles = ["software engineer", "student", "developer", "artist", "photographer"];
let index = 0;
let charIndex = 0;
const typingSpeed = 100;
const pauseTime = 1500;
const typingElement = document.querySelector(".typing-text");

function type() {
  if (charIndex < roles[index].length) {
    typingElement.textContent += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, pauseTime);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = roles[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, typingSpeed / 2);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", type);
const form = document.querySelector('[data-form]');
const formInputs = form.querySelectorAll('[data-form-input]');
const submitButton = form.querySelector('[data-form-btn]');

submitButton.disabled = true; // Initially disable the button

formInputs.forEach(input => {
    input.addEventListener('input', () => {
        let allFilled = Array.from(formInputs).every(field => field.value.trim() !== '');
        submitButton.disabled = !allFilled; // Enable or disable the button
    });
});


document.addEventListener("DOMContentLoaded", function () {
  // Select all filter buttons and project items
  const filterButtons = document.querySelectorAll(".filter-item button");
  const projectItems = document.querySelectorAll(".project-item");

  // Add event listener to each filter button
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove the 'active' class from all buttons and add it to the clicked button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Get the selected filter category from the button's text
      const filterCategory = button.textContent.toLowerCase();

      // Show or hide project items based on the filter category
      projectItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category").toLowerCase();

        // If "All" is selected, show all items; otherwise, show only matching items
        if (filterCategory === "all" || itemCategory.includes(filterCategory)) {
          item.classList.add("active");
          item.style.display = "block";
        } else {
          item.classList.remove("active");
          item.style.display = "none";
        }
      });
    });
  });
});

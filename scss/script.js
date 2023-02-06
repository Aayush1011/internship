import {
  createHeader,
  createButton,
  createSlides,
  addButtonClick,
} from "../exports.js";

function main() {
  let container = document.querySelector(".container");
  let currentSlide = 0;
  let assignments = ["Top Destinations", "Features", "Styleguide"];
  let links = [
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/scss/",
      Demo: "https://aayush1011.github.io/internship/scss/html/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/scss/",
      Demo: "https://aayush1011.github.io/internship/scss/html/features/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/scss/",
      Demo: "https://aayush1011.github.io/internship/scss/html/styleguide",
    },
  ];
  createHeader(container, "SCSS Assignments");
  createButton(container);
  createSlides(container, assignments, links);
  addButtonClick(currentSlide, assignments);
}

main();

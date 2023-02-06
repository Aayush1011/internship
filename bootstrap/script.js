import {
  createHeader,
  createButton,
  createSlides,
  addButtonClick,
} from "../exports.js";

function main() {
  let container = document.querySelector(".container");
  let currentSlide = 0;
  let assignments = ["Assignment No-1"];
  let links = [
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/bootstrap",
      Demo: "https://aayush1011.github.io/internship/bootstrap/html",
    },
  ];
  createHeader(container, "Bootstrap Assignments");
  createButton(container);
  createSlides(container, assignments, links);
  addButtonClick(currentSlide, assignments);
}

main();

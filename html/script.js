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
      "Code Link":
        "https://github.com/Aayush1011/internship/tree/main/html/assignment-no-1",
      "Demo Link(for html-learning page)":
        "https://aayush1011.github.io/internship/html/assignment-no-1/html-learning",
      "Demo Link(for html-forms page)":
        "https://aayush1011.github.io/internship/html/assignment-no-1/html-forms",
      "Demo Link(for playing-html-table page)":
        "https://aayush1011.github.io/internship/html/assignment-no-1/playing-html-table",
    },
  ];
  createHeader(container, "HTML Assignments");
  createButton(container);
  createSlides(container, assignments, links);
  addButtonClick(currentSlide, assignments);
}

main();

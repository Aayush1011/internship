import {
  createHeader,
  createButton,
  createSlides,
  addButtonClick,
} from "../exports.js";

function main() {
  let container = document.querySelector(".container");
  let currentSlide = 0;
  let assignments = [
    "Assignment No-1-1",
    "Assignment No-1-2",
    "Assignment No-2-1",
    "Assignment No-2-2",
    "Assignment No-3",
    "Assignment No-4-1",
    "Assignment No-4-2",
    "Assignment No-5",
    "Assignment No-6",
  ];
  let links = [
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/javascript/assignment-no-1-1",
      Demo: "https://aayush1011.github.io/internship/javascript/assignment-no-1-1",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/javascript/assignment-no-1-2",
      Demo: "https://aayush1011.github.io/internship/javascript/assignment-no-1-2",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/javascript/assignment-no-2-1",
      Demo: "https://aayush1011.github.io/internship/javascript/assignment-no-2-1",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/javascript/assignment-no-2-2",
      Demo: "https://aayush1011.github.io/internship/javascript/assignment-no-2-2",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/javascript/assignment-no-3",
      Demo: "https://aayush1011.github.io/internship/javascript/assignment-no-3",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/javascript/assignment-no-4-1",
      Demo: "https://aayush1011.github.io/internship/javascript/assignment-no-4-1",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/javascript/assignment-no-4-2",
      Demo: "https://aayush1011.github.io/internship/javascript/assignment-no-4-2",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/javascript/assignment-no-5",
      Demo: "https://aayush1011.github.io/internship/javascript/assignment-no-5",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/javascript/assignment-no-6",
      Demo: "https://aayush1011.github.io/internship/javascript/assignment-no-6",
    },
  ];
  createHeader(container, "Javascript Assignments");
  createButton(container);
  createSlides(container, assignments, links);
  addButtonClick(currentSlide, assignments);
}

main();

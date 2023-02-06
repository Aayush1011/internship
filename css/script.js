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
    "Assignment No-1",
    "Assignment No-2",
    "Assignment No-3",
    "Assignment No-4",
    "Assignment No-5",
    "Assignment No-6",
    "Assignment No-7",
    "Assignment No-8",
    "Assignment No-9",
    "Assignment No-10",
    "Assignment No-11",
    "Assignment No-12",
    "Assignment No-13",
    "Assignment No-14",
    "Assignment No-15",
    "Assignment No-16",
  ];
  let links = [
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-1",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-1/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-2",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-2/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-3",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-3/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-4",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-4/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-5",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-5/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-6",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-6/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-7",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-7/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-8",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-8/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-9",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-9/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-10",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-10/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-11",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-11/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-12",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-12/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-13",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-13/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-14",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-14/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-15",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-15/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/css/assignment-no-16",
      Demo: "https://aayush1011.github.io/internship/css/assignment-no-16/",
    },
  ];
  createHeader(container, "CSS Assignments");
  createButton(container);
  createSlides(container, assignments, links);
  addButtonClick(currentSlide, assignments);
}

main();

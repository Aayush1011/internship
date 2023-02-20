import {
  createHeader,
  createButton,
  createSlides,
  addButtonClick,
} from "./exports.js";

function main() {
  let container = document.querySelector(".container");
  let currentSlide = 0;
  let assignments = [
    "Figma",
    "HTML",
    "CSS",
    "SCSS",
    "Bootstrap",
    "Frontend Final Project",
    "Javascript",
    "React",
  ];
  let links = [
    { Link: "http://aayush1011.github.io/internship/figma/" },
    { Link: "http://aayush1011.github.io/internship/html/" },
    { Link: "http://aayush1011.github.io/internship/css/" },
    { Link: "http://aayush1011.github.io/internship/scss/" },
    { Link: "http://aayush1011.github.io/internship/bootstrap/" },
    { Link: "http://aayush1011.github.io/internship/frontend-final-project/" },
    { Link: "http://aayush1011.github.io/internship/javascript/" },
    { Link: "http://aayush1011.github.io/internship/react/" },
  ];
  createHeader(container, "Assignments");
  createButton(container);
  createSlides(container, assignments, links);
  addButtonClick(currentSlide, assignments);
}

main();

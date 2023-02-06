import {
    createHeader,
    createButton,
    createSlides,
    addButtonClick,
  } from "../exports.js";
  
  function main() {
    let container = document.querySelector(".container");
    let currentSlide = 0;
    let assignments = ["Frontend Final Project"];
    let links = [
      {
        Code: "https://github.com/Aayush1011/internship/tree/main/frontend-final-project/",
        Demo: "https://aayush1011.github.io/internship/frontend-final-project/dist/",
      },
    ];
    createHeader(container, "Frontend Final Project");
    createButton(container);
    createSlides(container, assignments, links);
    addButtonClick(currentSlide, assignments);
  }
  
  main();
  
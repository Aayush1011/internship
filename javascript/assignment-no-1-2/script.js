let container = document.querySelector(".container");
let assignments = [
  "Figma",
  "HTML",
  "CSS",
  "SCSS",
  "Bootstrap",
  "Frontend Final Project",
];
let links = [
  { Link: "http://aayush1011.github.io/internship/figma/" },
  { Link: "http://aayush1011.github.io/internship/html/" },
  { Link: "http://aayush1011.github.io/internship/css/" },
  { Link: "http://aayush1011.github.io/internship/scss/" },
  { Link: "http://aayush1011.github.io/internship/bootstrap/" },
  { Link: "http://aayush1011.github.io/internship/frontend-final-project/" },
];

let header = document.createElement("div");
header.classList.add("assignment-title");
let title = document.createElement("h1");
title.innerText = "Assignments";
header.appendChild(title);
container.appendChild(header);

let leftButton = document.createElement("button");
leftButton.innerText = '\u003C';
leftButton.classList.add("arrow");
leftButton.classList.add("left-arrow");
let rightButton = document.createElement("button");
rightButton.innerText = "\u003E";
rightButton.classList.add("arrow");
rightButton.classList.add("right-arrow");
container.appendChild(leftButton);
container.appendChild(rightButton);

let slides = document.createElement("div");
slides.classList.add("slides");
for (let i = 0; i < assignments.length; i++) {
  let slide = document.createElement("div");
  slide.classList.add("slide");
  let title = document.createElement("h2");
  title.innerText = assignments[i];
  slide.appendChild(title);
  let keys = Object.keys(links[i]);
  let values = Object.values(links[i]);
  for (let j = 0; j < keys.length; j++) {
    let btn = document.createElement("a");
    btn.innerText = keys[j];
    btn.setAttribute("href", values[j]);
    btn.classList.add("button");
    slide.appendChild(btn);
  }
  slides.append(slide);
}
container.appendChild(slides);

let slide = document.querySelector(".slide");
rightButton.addEventListener("click", () => {
  const slideWidth = slide.offsetWidth;
  slides.scrollLeft += slideWidth;
});

leftButton.addEventListener("click", () => {
  const slideWidth = slide.offsetWidth;
  slides.scrollLeft -= slideWidth;
});

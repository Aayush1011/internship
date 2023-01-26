let container = document.querySelector(".container");
let skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "ReactJs",
  "NodeJs",
  "Python",
  "Machine Learning",
];
let aboutMe = [
  "Aspiring Full Stack Web Developer",
  "Chronic nature lover",
  "Avid music listener",
  "Occasionally dabble in music playing",
  "Also a weeb",
];

let header = document.createElement("div");
header.classList.add("profile-title");
let title = document.createElement("h1");
title.innerText = "Hi! it's Aayush Adhikari!!";
header.appendChild(title);
container.appendChild(header);

let figure = document.createElement("figure");
figure.classList.add("profile-pic");
let image = document.createElement("img");
image.setAttribute("src", "./images/profile-pic.jpg");
image.setAttribute("alt", "profile-pic");
figure.appendChild(image);
container.appendChild(figure);

let rightSection = document.createElement("section");
rightSection.classList.add("right-section");
let rightDiv = document.createElement("div");
let rightSectionTitle = document.createElement("h2");
rightSectionTitle.innerText = "Skills";
rightDiv.appendChild(rightSectionTitle);
let list = document.createElement("ul");
for (let i = 0; i < skills.length; i++) {
  let listItem = document.createElement("li");
  listItem.innerText = skills[i];
  list.appendChild(listItem);
}
rightDiv.appendChild(list);
rightSection.appendChild(rightDiv);
container.appendChild(rightSection);

let bottomSection = document.createElement("section");
bottomSection.classList.add("bottom-section");
let bottomDiv = document.createElement("div");
let bottomSectionTitle = document.createElement("h2");
bottomSectionTitle.innerText = "About Me";
bottomDiv.appendChild(bottomSectionTitle);
let anotherList = document.createElement("ul");
for (let i = 0; i < aboutMe.length; i++) {
  let listItem = document.createElement("li");
  listItem.innerText = aboutMe[i];
  anotherList.appendChild(listItem);
}
bottomDiv.appendChild(anotherList);
bottomSection.appendChild(bottomDiv);
container.appendChild(bottomSection);

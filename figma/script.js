import {
  createHeader,
  createButton,
  createSlides,
  addButtonClick,
} from "../exports.js";

function main() {
  let container = document.querySelector(".container");
  let currentSlide = 0;
  let assignments = ["Top Destinations", "Testimonials", "Features"];
  let links = [
    {
      Design:
        "https://www.figma.com/file/KMqnAE5IkQwcNjDj5kvvk1/Destination-Site?node-id=11%3A62&t=aIDdb5ZqlEWoVYyO-1",
      Prototype:
        "https://www.figma.com/proto/KMqnAE5IkQwcNjDj5kvvk1/Destination-Site?node-id=1%3A2&scaling=min-zoom&page-id=11%3A62&starting-point-node-id=17%3A578",
    },
    {
      Design:
        "https://www.figma.com/file/KMqnAE5IkQwcNjDj5kvvk1/Destination-Site?node-id=11%3A62&t=aIDdb5ZqlEWoVYyO-1",
      Prototype:
        "https://www.figma.com/proto/KMqnAE5IkQwcNjDj5kvvk1/Destination-Site?node-id=17%3A578&scaling=min-zoom&page-id=11%3A62&starting-point-node-id=17%3A578",
    },
    {
      Design:
        "https://www.figma.com/file/KMqnAE5IkQwcNjDj5kvvk1/Destination-Site?node-id=11%3A62&t=aIDdb5ZqlEWoVYyO-1",
      Prototype:
        "https://www.figma.com/proto/KMqnAE5IkQwcNjDj5kvvk1/Destination-Site?node-id=17%3A578&scaling=min-zoom&page-id=11%3A62&starting-point-node-id=17%3A578",
    },
  ];
  createHeader(container, "Figma Assignments");
  createButton(container);
  createSlides(container, assignments, links);
  addButtonClick(currentSlide, assignments);
}

main();

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
    "Session-1",
    "Session-2",
    "Session-3-dashboard",
    "Session-3-login_signup",
    "Session-4",
    "Session-4-cursor-follower",
    "Session-5",
    "Session-6",
  ];
  let links = [
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/react/session-1",
      Demo: "https://thriving-meerkat-76ce66.netlify.app/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/react/session-2",
      Demo: "https://cheery-jalebi-b7d626.netlify.app/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/react/session-3-dashboard",
      Demo: "https://vocal-torrone-020396.netlify.app/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/react/session-3-login_signup",
      Demo: "https://sparkling-eclair-e57475.netlify.app/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/react/session-4",
      Demo: "https://imaginative-cupcake-9b09e4.netlify.app/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/react/session-4-cursor-follower",
      Demo: "https://peaceful-muffin-d676e5.netlify.app/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/react/session-5",
      Demo: "https://hilarious-kitten-864e0c.netlify.app/",
    },
    {
      Code: "https://github.com/Aayush1011/internship/tree/main/react/session-6",
      Demo: "https://eloquent-licorice-37babd.netlify.app/",
    },
  ];
  createHeader(container, "React Assignments");
  createButton(container);
  createSlides(container, assignments, links);
  addButtonClick(currentSlide, assignments);
}

main();

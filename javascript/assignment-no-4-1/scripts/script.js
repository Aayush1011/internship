//setting constants
const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 500;
const CONTAINER_BACKGROUND = "#15A0EA";
const NUMBER_OF_BOXES = 4;
const BOX_WIDTH = 50;
const BOX_HEIGHT = 50;
const BOX_BACKGROUND = "#EA5F15";
const ANIMATION_STEP = 10;
const ANIMATION_INTERVAL = 100;

/**
 * Sets style of provided container element
 *
 * @param {Element} container
 */
function setContainerStyle(container) {
  container.style.width = CONTAINER_WIDTH + "px"
  container.style.height = CONTAINER_HEIGHT + "px"
  container.style.background = CONTAINER_BACKGROUND;
  container.style.position = "relative";
}

/**
 * Change the box position of provided box
 *
 * @param {Element} box
 * @param {String} boxName
 * @param {Object} boxPosition
 */
function changeBoxPosition(box, boxName, boxPosition) {
  boxPosition[boxName].xPosition +=
    ANIMATION_STEP * boxPosition[boxName].xDirection;
  boxPosition[boxName].yPosition +=
    ANIMATION_STEP * boxPosition[boxName].yDirection;
  box.style.left = boxPosition[boxName].xPosition + "px";
  box.style.top = boxPosition[boxName].yPosition + "px";
}

/**
 * Initializes boxes inside provided parent element
 *
 * @param {Element} parent
 * @returns Object
 */
function initializeBoxes(parent) {
  let boxPosition = {};
  let direction = [1, -1];
  let xPositions = [];
  let yPositions = [];
  let xPosition = 0;
  let yPosition = 0;
  for (let i = 0; i < NUMBER_OF_BOXES; i++) {
    let box = document.createElement("div");
    box.classList.add("box", `box${i}`);
    box.style.width = BOX_WIDTH + "px";
    box.style.height = BOX_HEIGHT + "px";
    box.style.left = "0px";
    box.style.top = "0px";
    box.style.position = "absolute";
    box.style.background = BOX_BACKGROUND;
    parent.appendChild(box);

    //checking so that each starting position of each box is unique
    do {
      xPosition =
        Math.abs(
          Math.floor(
            Math.random() * (CONTAINER_WIDTH - BOX_WIDTH)
          ) * CONTAINER_WIDTH
        ) / CONTAINER_WIDTH;
      yPosition =
        Math.abs(
          Math.floor(
            Math.random() * (CONTAINER_HEIGHT - BOX_HEIGHT)
          ) * CONTAINER_HEIGHT
        ) / CONTAINER_HEIGHT;
    } while (xPosition in xPositions && yPosition in yPositions);
    xPositions.push(xPosition);
    yPositions.push(yPosition);

    //object containing unique positions and individual directions for each box
    boxPosition[`box${i}`] = {
      xPosition,
      yPosition,
      xDirection: direction[Math.floor(Math.random() * 2)],
      yDirection: direction[Math.floor(Math.random() * 2)],
    };
  }
  return boxPosition;
}

/**
 * Animates boxes while checking for collision
 *
 * @param {Element} parent
 * @param {NodesListOf<Element>} boxes
 * @param {Object} boxPosition
 */
function animateBoxes(parent, boxes, boxPosition) {
  let box = "";
  let remainingBoxes = [];
  setInterval(() => {
    for (let i = 0; i < NUMBER_OF_BOXES; i++) {
      box = document.querySelector(`.box${i}`);
      remainingBoxes = Array.from(boxes).filter(
        (remainingBox) => remainingBox != box
      );
      changeBoxPosition(box, `box${i}`, boxPosition);

      //checking for collision with container walls
      if (
        parseInt(box.style.left, 10) >=
          CONTAINER_WIDTH - BOX_WIDTH  ||
        parseInt(box.style.left, 10) <= 0
      ) {
        boxPosition[`box${i}`].xDirection *= -1;
      }
      if (
        parseInt(box.style.top, 10) >=
          CONTAINER_HEIGHT - BOX_HEIGHT ||
        parseInt(box.style.top, 10) <= 0
      ) {
        boxPosition[`box${i}`].yDirection *= -1;
      }

      //checking for collision with other boxes
      for (let remainingBox of remainingBoxes) {
        let remainingBoxName = remainingBox.classList[1];
        if (
          !(
            parseInt(box.style.left, 10) + BOX_WIDTH <
              parseInt(remainingBox.style.left, 10) ||
            parseInt(box.style.left, 10) >
              parseInt(remainingBox.style.left, 10) +
                BOX_WIDTH ||
            parseInt(box.style.top, 10) + BOX_HEIGHT <
              parseInt(remainingBox.style.top, 10) ||
            parseInt(box.style.top, 10) >
              parseInt(remainingBox.style.top, 10) +
                BOX_HEIGHT
          )
        ) {
          debugger
          boxPosition[`box${i}`].yDirection *= -1;
          boxPosition[`box${i}`].xDirection *= -1;
          boxPosition[remainingBoxName].yDirection *= -1;
          boxPosition[remainingBoxName].xDirection *= -1;
        }
      }
    }
  }, ANIMATION_INTERVAL);
}

function main() {
  const container = document.querySelector(".container");
  setContainerStyle(container);
  const positionOfBoxes = initializeBoxes(container);
  const allBoxes = document.querySelectorAll(".box");
  animateBoxes(container, allBoxes, positionOfBoxes);
}

main();

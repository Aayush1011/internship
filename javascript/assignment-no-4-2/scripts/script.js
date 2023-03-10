//setting constants
const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 500;
const CONTAINER_BACKGROUND = "#15A0EA";
const NUMBER_OF_BOXES = 4;
const BOX_WIDTH = 50;
const BOX_HEIGHT = 50;
const BOX_BACKGROUND = "#EA5F15";
const ANIMATION_STEP = 2;
const ANIMATION_INTERVAL = 100;
let boxPosition = [];
let emptyPositions = 0;
let image;
/**
 * Sets style of provided container element
 *
 * @param {Element} canvas
 */
function setContainerStyle(canvas) {
  canvas.width = CONTAINER_WIDTH;
  canvas.height = CONTAINER_HEIGHT;
  canvas.style.background = CONTAINER_BACKGROUND;
}

class Box {
  constructor(boxNumber, xPosition, yPosition, xDirection, yDirection) {
    this.boxNumber = boxNumber;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.xDirection = xDirection;
    this.yDirection = yDirection;
    this.deleteBox(this);
  }

  changeBoxPosition(ctx) {
    ctx.drawImage(image, this.xPosition, this.yPosition, BOX_WIDTH, BOX_HEIGHT);
  }

  checkCollision() {
    this.xPosition += ANIMATION_STEP * this.xDirection;
    this.yPosition += ANIMATION_STEP * this.yDirection;
    if (this.xPosition >= CONTAINER_WIDTH - BOX_WIDTH || this.xPosition <= 0) {
      this.xDirection *= -1;
    }
    if (
      this.yPosition >= CONTAINER_HEIGHT - BOX_HEIGHT ||
      this.yPosition <= 0
    ) {
      this.yDirection *= -1;
    }
    for (let i = 0; i < NUMBER_OF_BOXES; i++) {
      if (boxPosition[i] === this || typeof boxPosition[i] === "undefined")
        continue;
      if (
        boxPosition[i].xPosition + BOX_WIDTH >= this.xPosition &&
        boxPosition[i].xPosition <= this.xPosition + BOX_WIDTH &&
        boxPosition[i].yPosition + BOX_HEIGHT >= this.yPosition &&
        boxPosition[i].yPosition <= this.yPosition + BOX_HEIGHT
      ) {
        this.xDirection *= -1;
        this.yDirection *= -1;
      }
    }
  }

  deleteBox() {
    const canvas = document.querySelector(".canvas");
    canvas.addEventListener("click", (Event) => {
      if (
        this.xPosition <= Event.clientX &&
        Event.clientX <= this.xPosition + BOX_WIDTH &&
        this.yPosition <= Event.clientY &&
        Event.clientY <= this.yPosition + BOX_HEIGHT
      ) {
        delete boxPosition[this.boxNumber];
      }
    });
  }
}

function getRandomPosition(maximum, minimum) {
  return Math.abs(Math.floor(Math.random() * (maximum - minimum)) + minimum);
}

function initializeBoxes(ctx) {
  let direction = [1, -1];
  let xPosition = 0;
  let yPosition = 0;
  let getNextPosition = null;
  for (let i = 0; i < NUMBER_OF_BOXES; i++) {
    //checking so that each starting position of each box is unique
    do {
      xPosition = getRandomPosition(CONTAINER_WIDTH - BOX_WIDTH, 0);
      yPosition = getRandomPosition(CONTAINER_HEIGHT - BOX_HEIGHT, 0);
      if (boxPosition.length > 0) {
        getNextPosition = boxPosition.every(
          (box) =>
            xPosition > box.xPosition + BOX_WIDTH ||
            xPosition + BOX_WIDTH < box.xPosition ||
            yPosition > box.yPosition + BOX_HEIGHT ||
            yPosition + BOX_HEIGHT < box.yPosition
        );
      } else {
        getNextPosition = true;
      }
    } while (!getNextPosition);
    image = new Image();
    image.onload = () => {
      ctx.drawImage(image, xPosition, yPosition, BOX_WIDTH, BOX_HEIGHT);
    };
    image.src = "assets/ant.png";
    const box = new Box(
      i,
      xPosition,
      yPosition,
      direction[Math.floor(Math.random() * 2)],
      direction[Math.floor(Math.random() * 2)]
    );

    boxPosition.push(box);
  }
}

/**
 * Animates boxes while checking for collision
 *
 * @param {Element} parent
 * @param {NodesListOf<Element>} boxes
 * @param {Object} boxPosition
 */
const animateBoxes = () => {
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, CONTAINER_WIDTH, CONTAINER_HEIGHT);
  requestAnimationFrame(animateBoxes);
  for (let i = 0; i < NUMBER_OF_BOXES; i++) {
    let box = boxPosition[i];
    if (typeof box !== "undefined") {
      box.checkCollision(boxPosition);
      box.changeBoxPosition(ctx);
    } else if (boxPosition.filter(String).length == 0) {
      boxPosition = [];
      initializeBoxes(ctx);
    }
  }
};

function main() {
  const canvas = document.querySelector(".canvas");
  setContainerStyle(canvas);
  const ctx = canvas.getContext("2d");
  initializeBoxes(ctx);
  animateBoxes();
}

main();

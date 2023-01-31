// Global Variables
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
let screenHeight = 700;
let screenWidth = 300;
let obstacles = {};
let obstacleIndex = 0;
let score = 0;
let highScore = localStorage.getItem("highScore")
  ? localStorage.getItem("highScore")
  : 0;
document.querySelector(".highScore").innerText = highScore;
let fallSpeed = 3;
let obstacleGenerateSpeed = 1000;
let obstacleSet = [10, 110, 210];
let gotImages = [];

canvas.width = screenWidth;
canvas.height = screenHeight;
canvas.style.background = "grey";

document.onkeydown = function (e) {
  if (e.key === "ArrowLeft") {
    if (0 <= car.Position.X) {
      car.Velocity.X = -5;
    }
  }
  if (e.key == "ArrowRight") {
    if (car.Position.X < screenWidth - car.Width) {
      car.Velocity.X = 5;
    }
  }
};
document.onkeyup = function () {
  car.Velocity.X = 0;
};

let assetsToLoad = ["cartcycle", "ambulance", "foodtruck", "truck"];
const assetsLoaded = assetsToLoad.map((assetName) => {
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = () => reject(`${assetName} failed to load`);
    img.onload = () => {
      gotImages.push(img);
      resolve(img);
    };
    img.src = `assets/${assetName}.png`;
  });
});

class Obstacle {
  constructor(image, posX, width, height) {
    this.Image = image;
    this.Width = width;
    this.Height = height;
    this.Color = "#fff";
    this.Position = {
      X: posX,
      Y: -this.Height,
    };
    this.Velocity = Math.random() * fallSpeed + 5;
    this.Index = obstacleIndex;

    obstacles[obstacleIndex] = this;
    obstacleIndex++;
  }

  checkCollisions() {
    if (this.Position.Y >= screenHeight) {
      delete obstacles[this.Index];
      score++;
      document.querySelector(".score").innerText = score;
    }
  }
  updatePosition() {
    this.Position.Y += this.Velocity;
  }
  draw() {
    ctx.drawImage(
      this.Image,
      this.Position.X,
      this.Position.Y,
      this.Width,
      this.Height
    );
  }
  update() {
    this.checkCollisions();
    this.updatePosition();
    this.draw();
  }
}
class Car {
  constructor(posX, width, height) {
    this.Width = width;
    this.Height = height;
    this.Color = "green";
    this.Position = { X: posX, Y: screenHeight - this.Height - 10 };
    this.Velocity = { X: 0, Y: 0 };
  }

  checkCollisions() {
    function collision(a, b) {
      if (
        a.Position.X <= b.Position.X + b.Width &&
        a.Position.X + a.Width >= b.Position.X &&
        a.Position.Y + a.Height >= b.Position.Y &&
        a.Position.Y <= b.Position.Y + b.Height
      ) {
        return true;
      }
    }
    for (let i in obstacles) {
      if (collision(this, obstacles[i])) {
        newGame();
      }
    }
  }
  updatePosition() {
    this.Position.X += this.Velocity.X;
  }
  draw() {
    ctx.drawImage(
      gotImages[0],
      this.Position.X,
      this.Position.Y,
      this.Width,
      this.Height
    );
  }
  update() {
    this.checkCollisions();
    this.updatePosition();
    this.draw();
  }
}

let car = new Car(130, 40, 60);

function newGame() {
  car = new Car(130, 40, 60);
  obstacles = {};
  console.log(score, Number(highScore));
  if (score > Number(highScore)) {
    localStorage.setItem("highScore", score);
    highScore = score;
    document.querySelector(".highScore").innerText = score;
  }
  score = 0;
  document.querySelector(".score").innerText = score;
}
function obstacleGenerate() {
  const randomObstacle = Math.floor(Math.random() * 3 + 1);
  console.log(gotImages[randomObstacle]);
  new Obstacle(
    gotImages[randomObstacle],
    obstacleSet[Math.floor(Math.random() * 3)],
    80,
    160
  );
}

function Updater() {
  ctx.clearRect(0, 0, screenWidth, screenHeight);
  for (i in obstacles) {
    obstacles[i].update();
  }
  car.update();
}
Promise.all(assetsLoaded).then(() => {
  setInterval(Updater, 10);
  setInterval(obstacleGenerate, obstacleGenerateSpeed);
});

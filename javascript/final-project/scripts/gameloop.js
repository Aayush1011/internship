class Gameloop {
  constructor(assets) {
    this.assets = assets;
    this.canvas = null;
    this.ctx = null;
    this.background = null;
    this.updateLoop = null;
    this.numberOfTurns = 5;
    this.playerRed = null;
    this.playerBlue = null;
    this.overlay = null;
    this.collisionRed = false;
    this.collisionBlue = false;
    this.turnCount = 0;
    this.players = [];
    this.pathsSelected = [];
    this.currentPath = 0;
    this.firstEnteredScreen = false;
    this.outsideScreen = true;
    this.currentPlayer = null;
    this.gameStarted = false;
    this.gameInitialized = false;
    this.difficulty = null;
    this.diffcultyIndex = null;
    this.paused = false;
  }

  init() {
    this.playerRed = new Player(
      this.canvas.width / 2 - 288,
      this.canvas.height - 275,
      this.canvas.width / 2 - 288,
      this.canvas.height - 128,
      this.assets["catapult"],
      this.assets["base"],
      "red",
      "#ff313f",
      "#e65a64",
      this.canvas.canvas
    );
    this.playerBlue = new Player(
      this.canvas.width / 2 + 150,
      this.canvas.height - 275,
      this.canvas.width / 2 + 150,
      this.canvas.height - 128,
      this.assets["catapult"],
      this.assets["base"],
      "blue",
      "#3f31ff",
      "#645ae6",
      this.canvas.canvas
    );
    this.playerRed.init();
    this.playerBlue.init();
    this.currentPath = this.getRandomNumber(0, 5);
    this.pathsSelected.push(this.currentPath);
    this.diffcultyIndex =
      this.difficulty === "Easy" ? 0 : this.difficulty === "Medium" ? 1 : 2;
    const speed =
      this.difficulty === "Easy" ? 3 : this.difficulty === "Medium" ? 4 : 5;
    this.bird = new Bird(
      paths[this.diffcultyIndex][this.currentPath][1].x - 100,
      paths[this.diffcultyIndex][this.currentPath][1].y - 100,
      92,
      69,
      [20, 277],
      15,
      this.assets["pigeon-transparent"],
      this.assets["pigeon-reverse"],
      paths[this.diffcultyIndex][this.currentPath],
      speed
    );
  }

  getRandomNumber(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue) + minValue);
  }

  newGame() {
    this.turnCount = 0;
    this.players = [];
    this.pathsSelected = [];
    this.currentPath = 0;
    this.init();
    this.players[0] = Math.random() < 0.5 ? this.playerRed : this.playerBlue;
    this.players[1] =
      this.players[0] === this.playerRed ? this.playerBlue : this.playerRed;
    this.players[1].disabled = true;
    this.players[0].score = 0;
    this.players[1].score = 0;
  }

  gameEnd() {
    this.overlay.gameStarted = false;
    this.overlay.endScreen = true;
    this.gameStarted = false;
    this.gameInitialized = false;
  }

  turn() {
    this.turnCount++;
    if (this.turnCount === 10) {
      this.gameEnd();
      return;
    }
    if (this.turnCount % 2 === 0) {
      this.players[0].slingshot.totalMarbles = 3;
      this.players[0].marble.scoreUpdated = false;
      this.players[0].disabled = false;
      this.players[1].disabled = true;
      do {
        this.currentPath = this.getRandomNumber(0, 5);
      } while (this.pathsSelected.includes(this.currentPath));
      this.pathsSelected.push(this.currentPath);
      this.bird.path = paths[this.diffcultyIndex][this.currentPath];
    } else {
      this.players[1].slingshot.totalMarbles = 3;
      this.players[1].marble.scoreUpdated = false;
      this.players[0].disabled = true;
      this.players[1].disabled = false;
    }
    this.bird.position.x =
      paths[this.diffcultyIndex][this.currentPath][1].x - 100;
    this.bird.position.y =
      paths[this.diffcultyIndex][this.currentPath][1].y - 100;
    this.bird.pathIndex = 1;
  }

  checkInsideScreen() {
    if (
      this.bird.position.x + this.bird.width > 0 &&
      this.bird.position.x < this.canvas.width &&
      this.bird.position.y + this.bird.height > 0 &&
      this.bird.position.y < this.canvas.height
    ) {
      this.firstEnteredScreen = true;
      this.outsideScreen = false;
    } else {
      this.outsideScreen = true;
    }
  }

  checkOutsideScreen() {
    if (this.firstEnteredScreen && this.outsideScreen) {
      this.firstEnteredScreen = false;
      this.outsideScreen = true;
      this.turn();
    }
  }

  checkMarblesRemaining() {
    this.currentPlayer = this.players[this.turnCount % 2];
    if (this.currentPlayer.slingshot.totalMarbles === 0) {
      this.currentPlayer.disabled = true;
      this.currentPlayer.slingshot.totalMarbles = 3;
    }
  }

  startScreen() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.background = new Background(
      this.canvas.width,
      this.canvas.height,
      this.assets["background"]
    );
    this.overlay = new Overlay(this.canvas.width, this.canvas.height);
    this.overlay.addClickHandler(this.canvas.canvas);
    this.update();
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.update(this.ctx);
    if (!this.gameStarted && !this.paused) {
      this.gameInitialized = false;
    }
    if (this.gameStarted && !this.gameInitialized) {
      this.gameInitialized = true;
      this.newGame();
    }
    if (this.gameStarted) {
      this.collisionRed = this.playerRed.update(this.ctx, this.bird);
      this.collisionBlue = this.playerBlue.update(this.ctx, this.bird);
      this.bird.update(this.ctx, this.collisionRed, this.collisionBlue);
      this.checkInsideScreen();
      this.checkOutsideScreen();
      this.checkMarblesRemaining();
      this.bird.paused =
        this.playerRed.slingshot.paused =
        this.playerBlue.slingshot.paused =
          this.paused;
    }
    [this.gameStarted, this.difficulty, this.paused] = this.overlay.update(
      this.ctx,
      this.gameInitialized,
      this.assets["pigeon-transparent"],
      this.turnCount,
      this.players,
      this.currentPlayer
    );
    this.updateLoop = window.requestAnimationFrame(this.update.bind(this));
  }
}

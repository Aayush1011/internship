class Gameloop {
  constructor(assets) {
    this.assets = assets;
    this.canvas = null;
    this.ctx = null;
    this.background = null;
    this.base = null;
    this.bird = null;
    this.inputHandler = null;
    this.currentPipes = [];
    this.gameStarted = false;
    this.pipeLoop = null;
    this.collision = false;
    this.updateLoop = null;
    this.gameEnded = false;
    this.overlay = null;
  }

  init() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.background = new Background(
      this.canvas.width,
      this.canvas.height,
      this.assets["background-day"],
      this.assets["background-night"]
    );
    this.background.render(this.ctx);
    this.base = new Base(
      this.canvas.width,
      this.canvas.height,
      this.assets["base"]
    );
    this.base.render(this.ctx);
    this.pipeLoop = setInterval(this.initPipes.bind(this), 2500);
    this.bird = new Bird(
      60,
      50,
      this.canvas.width / 2 - 80,
      this.canvas.height / 2 - 20,
      this.assets["yellowbird-midflap"]
    );
    this.inputHandler = new InputHandler(this, this.bird, 60);
    this.bird.render(this.ctx);
    this.overlay = new Overlay(this.bird, this.assets, this.canvas);
  }

  initPipes() {
    const minTopPipeHeight = this.canvas.height / 5.5;
    const maxTopPipeHeight = 3 * (this.canvas.height / 7);
    const gapBetnPipes = this.canvas.height / 4;
    const width = this.canvas.width / 5.5;
    const pipeTopHeight =
      Math.floor(Math.random() * (maxTopPipeHeight - minTopPipeHeight)) +
      minTopPipeHeight;
    const getBottomPipeY = pipeTopHeight + gapBetnPipes;
    const pipeBottomHeight =
      this.canvas.height - getBottomPipeY - this.base.height;
    this.currentPipes.push(
      new Pipe(
        width,
        this.canvas.width + 10,
        pipeTopHeight,
        getBottomPipeY,
        pipeBottomHeight,
        this.assets["pipe-green"],
        this.assets["pipe-green-top"]
      )
    );
  }

  newGame() {
    this.currentPipes = [];
    this.gameEnded = false;
    this.gameStarted = false;
    this.init();
    this.updateLoop = setInterval(this.update.bind(this), 20);
  }

  endGame() {
    clearInterval(this.updateLoop);
    clearInterval(this.pipeLoop);
    this.gameStarted = false;
    this.gameEnded = true;
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.update(this.ctx);
    this.base.update(this.ctx);
    if (this.gameStarted) {
      this.currentPipes.map((pipe, i) => {
        if (pipe.update(this.ctx)) {
          delete this.currentPipes[i];
        }
      });
      this.collision = this.bird.update(
        this.ctx,
        this.base.pos.y,
        this.currentPipes
      );
      if (this.collision) {
        this.endGame();
      }
    } else {
      this.currentPipes = [];
      this.bird.render(this.ctx);
    }
    this.overlay.update(this.gameStarted, this.gameEnded, this.currentPipes);
  }
}

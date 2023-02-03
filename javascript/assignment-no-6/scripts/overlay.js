class Overlay {
  constructor(bird, assets, canvas) {
    this.bird = bird;
    this.score = 0;
    this.canvas = canvas;
    this.ctx = canvas.ctx;
    this.assets = assets;
    this.highScore = localStorage.getItem("highScore")
      ? localStorage.getItem("highScore")
      : 0;
  }

  scoreUpdater(gameStarted, gameEnded, pipes) {
    if (gameEnded) {
      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem("highScore", this.highScore);
      }
    } else if (gameStarted && pipes.length > 0) {
      pipes.forEach((pipe) => {
        if (
          !pipe.passed &&
          this.bird.pos.x + this.bird.width >=
            pipe.positionPipeBottom.x + pipe.width
        ) {
          this.score++;
          pipe.passed = true;
        }
      });
    }
  }

  render(gameStarted, gameEnded) {
    function showScore(ctx, assets, score, x, y) {
      let width = 0;
      if (score >= 10) {
        width = -20;
      } else if (score >= 100) {
        width = -40;
      }
      for (let digit of Array.from(`${score}`)) {
        ctx.drawImage(assets[digit], x + width, y, 40, 40);
        width += 40;
      }
    }
    if (gameStarted) {
      const x = this.canvas.width / 2 - 20;
      const y = this.canvas.height / 5;
      showScore(this.ctx, this.assets, this.score, x, y);
    } else if (gameEnded) {
      const gameOverHeight = this.canvas.height / 2 - 250;
      this.ctx.drawImage(
        this.assets["gameover"],
        this.canvas.width / 2 - 150,
        gameOverHeight,
        300,
        100
      );
      this.ctx.font = "900 40px Verdana";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "orange";
      this.ctx.fillText("SCORE", this.canvas.width / 2, gameOverHeight + 150);
      showScore(
        this.ctx,
        this.assets,
        this.score,
        this.canvas.width / 2 - 20,
        gameOverHeight + 180
      );
      this.ctx.fillText("BEST", this.canvas.width / 2, gameOverHeight + 300);
      showScore(
        this.ctx,
        this.assets,
        this.highScore,
        this.canvas.width / 2 - 20,
        gameOverHeight + 330
      );
    }
  }

  update(gameStarted, gameEnded, pipes) {
    this.scoreUpdater(gameStarted, gameEnded, pipes);
    this.render(gameStarted, gameEnded);
  }
}

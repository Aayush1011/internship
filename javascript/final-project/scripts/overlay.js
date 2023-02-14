class Overlay {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.nextScreen = false;
    this.gameStarted = false;
    this.difficultySelected = false;
    this.diffculty = "";
    this.paused = false;
  }

  addClickHandler(canvas) {
    canvas.addEventListener("click", (e) => {
      const mouseX = parseInt(e.clientX);
      const mouseY = parseInt(e.clientY);
      if (
        !this.nextScreen &&
        mouseX <= (5 / 8) * this.canvasWidth &&
        mouseX >= this.canvasWidth / 4 &&
        mouseY <= (13 / 20) * this.canvasHeight &&
        mouseY >= (11 / 20) * this.canvasHeight
      ) {
        this.nextScreen = true;
      }
      if (
        this.nextScreen &&
        mouseX <= (23 / 64) * this.canvasWidth &&
        mouseX >= (11 / 64) * this.canvasWidth &&
        mouseY <= (23 / 40) * this.canvasHeight &&
        mouseY >= (17 / 40) * this.canvasHeight
      ) {
        if (this.difficultySelected && this.diffculty === "Easy") {
          this.difficultySelected = false;
          this.diffculty = "";
        } else {
          this.difficultySelected = true;
          this.diffculty = "Easy";
        }
      }
      if (
        this.nextScreen &&
        mouseX <= 0.5939 * this.canvasWidth &&
        mouseX >= 0.4064 * this.canvasWidth &&
        mouseY <= (23 / 40) * this.canvasHeight &&
        mouseY >= (17 / 40) * this.canvasHeight
      ) {
        if (this.difficultySelected && this.diffculty === "Medium") {
          this.difficultySelected = false;
          this.diffculty = "";
        } else {
          this.difficultySelected = true;
          this.diffculty = "Medium";
        }
      }
      if (
        this.nextScreen &&
        mouseX <= 0.8251 * this.canvasWidth &&
        mouseX >= 0.6376 * this.canvasWidth &&
        mouseY <= (23 / 40) * this.canvasHeight &&
        mouseY >= (17 / 40) * this.canvasHeight
      ) {
        if (this.difficultySelected && this.diffculty === "Hard") {
          this.difficultySelected = false;
          this.diffculty = "";
        } else {
          this.difficultySelected = true;
          this.diffculty = "Hard";
        }
      }
      if (
        mouseX <= (5 / 8) * this.canvasWidth &&
        mouseX >= (3 / 8) * this.canvasWidth &&
        mouseY <= 0.8107 * this.canvasHeight &&
        mouseY >= 0.6607 * this.canvasHeight
      ) {
        if (this.nextScreen && this.difficultySelected) {
          this.nextScreen = false;
          this.gameStarted = true;
        } else if (this.endScreen) {
          this.nextScreen = true;
          this.gameStarted = false;
          this.endScreen = false;
        }
      }
      if (
        this.gameStarted &&
        mouseX <= 79.52 &&
        mouseX >= 20 &&
        mouseY <= 0.6314 * this.canvasHeight &&
        mouseY >= 0.5516 * this.canvasHeight
      ) {
        this.paused = true;
      }
      if (this.paused) {
        if (
          mouseX <= (5 / 8) * this.canvasWidth &&
          mouseX >= (3 / 8) * this.canvasWidth &&
          mouseY <= 0.5375 * this.canvasHeight &&
          mouseY >= 0.4375 * this.canvasHeight
        ) {
          this.paused = false;
        } else if (
          mouseX <= (5 / 8) * this.canvasWidth &&
          mouseX >= (3 / 8) * this.canvasWidth &&
          mouseY <= 0.6833 * this.canvasHeight &&
          mouseY >= 0.5833 * this.canvasHeight
        ) {
          this.difficultySelected = false;
          this.diffculty = "";
          this.nextScreen = false;
          this.paused = false;
          this.gameStarted = false;
        }
      }
    });
  }

  drawOuterBox(ctx, pigeon, size) {
    const boxWidth = this.canvasWidth * size;
    const boxHeight = this.canvasHeight * size;
    const boxX = this.canvasWidth / 2 - boxWidth / 2;
    const boxY = this.canvasHeight / 2 - boxHeight / 2;
    if (pigeon) {
      ctx.save();
      ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2);
      ctx.rotate((-30 * Math.PI) / 180);
      ctx.translate(-this.canvasWidth / 2, -this.canvasHeight / 2);
      ctx.drawImage(
        pigeon,
        274,
        50,
        98,
        49,
        200,
        -150,
        this.canvasWidth / 5,
        this.canvasHeight / 5
      );
      ctx.restore();
    }
    ctx.fillStyle = "#7969df";
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.restore();
    return [boxWidth, boxHeight, boxX, boxY];
  }

  drawDifficultyBox(
    ctx,
    leftPosition,
    leftPositionText,
    boxY,
    boxWidth,
    boxHeight,
    text
  ) {
    ctx.fillStyle = "#df7169";
    ctx.fillRect(
      leftPosition,
      boxY + boxHeight / 2 - boxHeight / 10,
      boxWidth / 4,
      boxHeight / 5
    );
    ctx.font = "30px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText(text, leftPositionText, boxY + boxHeight / 2);
  }

  renderStartScreen(ctx, pigeon) {
    const [boxWidth, boxHeight, boxX, boxY] = this.drawOuterBox(
      ctx,
      pigeon,
      1 / 2
    );
    ctx.font = "50px Verdana";
    ctx.alignText = "center";
    ctx.fillStyle = "black";
    ctx.fillText(
      "Slingshot Sharpshooter",
      boxX + boxWidth / 10,
      boxY + boxHeight / 3
    );
    ctx.fillStyle = "#df7169";
    ctx.fillRect(
      boxWidth - boxWidth / 4,
      boxHeight + boxHeight / 10,
      boxWidth / 2,
      boxHeight / 5
    );
    ctx.font = "30px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("Play Now", boxWidth - 70, boxHeight + boxHeight / 4.5);
  }

  renderLevelSelect(ctx, pigeon) {
    const [boxWidth, boxHeight, boxX, boxY] = this.drawOuterBox(
      ctx,
      pigeon,
      3 / 4
    );
    ctx.font = "50px Verdana";
    ctx.alignText = "center";
    ctx.fillStyle = "black";
    ctx.fillText(
      "Select Difficulty Level",
      boxX + boxWidth / 4,
      boxY + boxHeight / 5
    );
    this.drawDifficultyBox(
      ctx,
      boxX + boxWidth / 16,
      boxX + boxWidth / 16 + boxWidth / 8 - 35,
      boxY,
      boxWidth,
      boxHeight,
      "Easy"
    );
    this.drawDifficultyBox(
      ctx,
      boxX + boxWidth / 4 + boxWidth / 16 + 70,
      boxX + boxWidth / 4 + boxWidth / 16 + boxWidth / 8 + 10,
      boxY,
      boxWidth,
      boxHeight,
      "Medium"
    );
    this.drawDifficultyBox(
      ctx,
      boxX + boxWidth / 2 + boxWidth / 16 + 135,
      boxX + boxWidth / 2 + boxWidth / 16 + boxWidth / 8 + 100,
      boxY,
      boxWidth,
      boxHeight,
      "Hard"
    );
    ctx.fillStyle = this.difficultySelected ? "#df7169" : "#d1d1d1";
    ctx.fillRect(
      boxX + boxWidth / 2 - boxWidth / 6,
      boxY + boxHeight - boxHeight / 3.5,
      boxWidth / 3,
      boxHeight / 5
    );
    const text = this.difficultySelected
      ? `Start | Difficulty: ${this.diffculty}`
      : "No Difficulty Selected";
    ctx.font = "23px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText(
      text,
      boxX + boxWidth / 2 - boxWidth / 8 + 10,
      boxY + boxHeight - boxHeight / 5.5
    );
  }

  renderPauseButton(ctx) {
    ctx.fillStyle = "#df7169";
    ctx.fillRect(
      20,
      this.canvasHeight - 275 - this.canvasWidth / 25,
      this.canvasWidth / 25,
      this.canvasWidth / 25
    );
    ctx.beginPath();
    ctx.moveTo(40, this.canvasHeight - 255 - this.canvasWidth / 25);
    ctx.lineTo(40, this.canvasHeight - 235 - this.canvasWidth / 25);
    ctx.moveTo(60, this.canvasHeight - 255 - this.canvasWidth / 25);
    ctx.lineTo(60, this.canvasHeight - 235 - this.canvasWidth / 25);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  renderPauseMenu(ctx) {
    const [boxWidth, boxHeight, boxX, boxY] = this.drawOuterBox(
      ctx,
      null,
      1 / 2
    );
    ctx.font = "50px Verdana";
    ctx.alignText = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Paused", boxX + boxWidth / 2.5, boxY + boxHeight / 3.5);
    ctx.fillStyle = "#df7169";
    ctx.fillRect(
      boxWidth - boxWidth / 4,
      boxY + boxHeight / 2 - boxHeight / 8,
      boxWidth / 2,
      boxHeight / 5
    );
    ctx.font = "30px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText(
      "Resume",
      boxWidth - 70,
      boxY + boxHeight / 2 - boxHeight / 8 + 50
    );
    ctx.fillStyle = "#df7169";
    ctx.fillRect(
      boxWidth - boxWidth / 4,
      boxY + boxHeight / 2 + boxHeight / 6,
      boxWidth / 2,
      boxHeight / 5
    );
    ctx.font = "30px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText(
      "Go To Home Screen",
      boxWidth - 140,
      boxY + boxHeight / 2 + boxHeight / 6 + 50
    );
  }

  renderRound(ctx, turnCount) {
    ctx.font = "20px Verdana";
    ctx.fillStyle = "black";
    ctx.alignText = "center";
    ctx.fillText(
      `Round ${Math.ceil((turnCount + 1) / 2)}`,
      this.canvasWidth - 420,
      this.canvasHeight - 50
    );
  }

  renderScore(ctx, players) {
    ctx.font = "20px Verdana";
    const xPosition =
      players[0].name === "red"
        ? [20, this.canvasWidth - 125]
        : [this.canvasWidth - 125, 20];
    ctx.alignText = players[0].name === "red" ? "left" : "right";
    ctx.fillText(
      `Score: ${players[0].marble.score}`,
      xPosition[0],
      this.canvasHeight - 50
    );
    ctx.alignText = players[0].name === "blue" ? "right" : "left";
    ctx.fillText(
      `Score: ${players[1].marble.score}`,
      xPosition[1],
      this.canvasHeight - 50
    );
  }

  renderMarblesRemaining(ctx, currentPlayer) {
    ctx.font = "20px Verdana";
    const xPosition =
      currentPlayer.name === "red" ? 20 : this.canvasWidth - 260;
    ctx.alignText = currentPlayer.name === "red" ? "left" : "right";
    ctx.fillText(
      `Marbles Remaining: ${currentPlayer.slingshot.totalMarbles}`,
      xPosition,
      this.canvasHeight - 100
    );
  }

  renderGameEnd(ctx, players, pigeon) {
    const [boxWidth, boxHeight, boxX, boxY] = this.drawOuterBox(
      ctx,
      pigeon,
      3 / 4
    );
    ctx.font = "50px Verdana";
    ctx.alignText = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Game Over", boxX + boxWidth / 2 - 140, boxY + boxHeight / 5);
    ctx.fillStyle = "red";
    ctx.fillRect(
      boxX + boxWidth / 2 - boxWidth / 8 - 20,
      boxY + (1.75 / 5) * boxHeight,
      boxWidth / 8,
      boxWidth / 8
    );
    ctx.font = "60px Verdana";
    ctx.alignText = "center";
    ctx.fillStyle = "black";
    ctx.fillText(
      `${
        players[0].name === "red"
          ? players[0].marble.score
          : players[1].marble.score
      }`,
      boxX + boxWidth / 2 - 110,
      boxY + boxHeight / 2
    );
    ctx.fillStyle = "blue";
    ctx.fillRect(
      boxX + boxWidth / 2 + 20,
      boxY + (1.75 / 5) * boxHeight,
      boxWidth / 8,
      boxWidth / 8
    );
    ctx.font = "60px Verdana";
    ctx.alignText = "center";
    ctx.fillStyle = "black";
    ctx.fillText(
      `${
        players[0].name === "blue"
          ? players[0].marble.score
          : players[1].marble.score
      }`,
      boxX + boxWidth / 2 + 60,
      boxY + boxHeight / 2
    );
    ctx.fillStyle = "#df7169";
    ctx.fillRect(
      boxX + boxWidth / 2 - boxWidth / 6,
      boxY + boxHeight - boxHeight / 3.5,
      boxWidth / 3,
      boxHeight / 5
    );
    ctx.font = "23px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText(
      "New Game",
      boxX + boxWidth / 2 - 60,
      boxY + boxHeight - boxHeight / 5.5
    );
  }

  update(ctx, gameInitialized, pigeon, turnCount, players, currentPlayer) {
    if (!this.gameStarted && !this.nextScreen && !this.endScreen) {
      this.renderStartScreen(ctx, pigeon);
    } else if (!this.gameStarted && this.nextScreen) {
      this.renderLevelSelect(ctx, pigeon);
    } else if (this.endScreen) {
      this.renderGameEnd(ctx, players, pigeon);
    } else if (gameInitialized) {
      this.renderPauseButton(ctx);
      this.renderRound(ctx, turnCount);
      this.renderScore(ctx, players);
      this.renderMarblesRemaining(ctx, currentPlayer);
    }
    if (this.paused) {
      this.renderPauseMenu(ctx);
    }

    return [this.gameStarted, this.diffculty, this.paused];
  }
}

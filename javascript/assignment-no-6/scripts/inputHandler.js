class InputHandler {
  constructor(gameloop, bird, gravity) {
    document.onkeydown = function (e) {
      if (e.key === " ") {
        if (!gameloop.gameStarted) {
          gameloop.gameStarted = true;
        }
        if (gameloop.gameEnded) {
          gameloop.newGame();
        }
        bird.pos.y -= gravity;
      }
    };
  }
}

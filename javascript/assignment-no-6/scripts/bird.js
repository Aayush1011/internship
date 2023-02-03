class Bird {
  constructor(width, height, x, y, image) {
    this.width = width;
    this.height = height;
    this.pos = { x: x, y: y };
    this.image = image;
    this.gravity = 4;
    this.collision = false;
  }

  render(ctx) {
    ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
  }

  fly() {
    this.pos.y += this.gravity;
  }

  checkCollisions(baseY, pipes) {
    function collision(a, b) {
      if (
        (a.pos.x <= b.positionPipeBottom.x + b.width &&
          a.pos.x + a.width >= b.positionPipeBottom.x &&
          a.pos.y + a.height >= b.positionPipeBottom.y &&
          a.pos.y <= b.positionPipeBottom.y + b.pipeBottomHeight) ||
        (a.pos.x <= b.positionPipeTop.x + b.width &&
          a.pos.x + a.width >= b.positionPipeTop.x &&
          a.pos.y + a.height >= b.positionPipeTop.y &&
          a.pos.y <= b.positionPipeTop.y + b.pipeTopHeight)
      ) {
        return true;
      }
    }
    function collisionWithBase(a, b) {
      if (a.pos.y + a.height >= b) {
        return true;
      }
    }
    for (let i in pipes) {
      if (collision(this, pipes[i]) || collisionWithBase(this, baseY)) {
        this.collision = true;
      }
    }
  }

  update(ctx, baseY, pipes) {
    this.checkCollisions(baseY, pipes);
    this.fly();
    this.render(ctx);
    return this.collision;
  }
}

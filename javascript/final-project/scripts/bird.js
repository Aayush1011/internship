class Bird {
  constructor(
    x,
    y,
    width,
    height,
    startingX,
    startingY,
    image,
    imageReverse,
    path,
    speed
  ) {
    this.width = width;
    this.height = height;
    this.position = { x: x, y: y };
    this.velocity = { x: 0, y: 0 };
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.starting = { x: startingX, y: startingY };
    this.image = image;
    this.imageReverse = imageReverse;
    this.pathIndex = 1;
    this.currentFrame = 0;
    this.collisionRed = false;
    this.collisionBlue = false;
    this.path = path;
    this.speed = speed;
    this.reverse = false;
    this.paused = false;
  }

  render(ctx) {
    ctx.drawImage(
      this.reverse ? this.imageReverse : this.image,
      this.reverse ? this.starting.x[1] : this.starting.x[0],
      this.starting.y,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  changePosition() {
    if (!this.collisionRed && !this.collisionBlue) {
      const path = this.path[this.pathIndex];
      const yDistance = path.y - this.center.y;
      const xDistance = path.x - this.center.x;
      const angle = Math.atan2(yDistance, xDistance);

      if (xDistance < 0) {
        this.reverse = true;
      } else {
        this.reverse = false;
      }

      this.velocity.x = Math.cos(angle) * this.speed;
      this.velocity.y = Math.sin(angle) * this.speed;

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      this.center = {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2,
      };

      if (
        Math.abs(Math.round(this.center.x) - Math.round(path.x)) <
          Math.abs(this.velocity.x) &&
        Math.abs(Math.round(this.center.y) - Math.round(path.y)) <
          Math.abs(this.velocity.y) &&
        this.pathIndex < this.path.length - 1
      ) {
        this.pathIndex++;
      }
    } else {
      this.velocity.y += 0.5;
      this.position.y += this.velocity.y;
    }
  }

  update(ctx, collisionRed, collisionBlue) {
    this.collisionRed = collisionRed;
    this.collisionBlue = collisionBlue;
    if (!this.paused) {
      this.changePosition();
    }
    this.render(ctx);
    return this.nextTurn;
  }
}

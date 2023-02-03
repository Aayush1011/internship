class Pipe {
  constructor(
    width,
    x,
    pipeTopHeight,
    bottomPipeY,
    pipeBottomHeight,
    imageBottom,
    imageTop
  ) {
    this.width = width;
    this.pipeTopHeight = pipeTopHeight;
    this.positionPipeTop = { x: x, y: 0 };
    this.positionPipeBottom = { x: x, y: bottomPipeY };
    this.pipeBottomHeight = pipeBottomHeight;
    this.imageBottom = imageBottom;
    this.imageTop = imageTop;
    this.scrollVal = 2;
    this.passed = false;
  }

  render(ctx) {
    ctx.drawImage(
      this.imageBottom,
      this.positionPipeBottom.x,
      this.positionPipeBottom.y,
      this.width,
      this.pipeBottomHeight
    );
    ctx.drawImage(
      this.imageTop,
      this.positionPipeTop.x,
      this.positionPipeTop.y,
      this.width,
      this.pipeTopHeight
    );
  }

  scroll() {
    this.positionPipeBottom.x -= this.scrollVal;
    this.positionPipeTop.x -= this.scrollVal;
  }

  checkPipe() {
    return (
      this.positionPipeBottom.x + this.width < 0 &&
      this.positionPipeTop.x + this.width < 0
    );
  }

  update(ctx) {
    this.scroll();
    this.render(ctx);
    return this.checkPipe();
  }
}

class Base {
  constructor(width, height, image) {
    this.width = width;
    this.height = height / 7;
    this.pos = { x: 0, y: height - height / 7 };
    this.image = image;
    this.scrollVal = 2;
  }

  render(ctx) {
    ctx.drawImage(this.image, -this.pos.x, this.pos.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.width - this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }

  scroll() {
    if (this.pos.x >= this.width) {
      this.pos.x = 0;
    }
    this.pos.x += this.scrollVal;
  }

  update(ctx) {
    this.scroll();
    this.render(ctx);
  }
}

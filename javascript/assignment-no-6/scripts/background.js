class Background {
  constructor(width, height, assetsBgDay, assetsBgNight) {
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.image = Math.random() > 0.5 ? assetsBgDay : assetsBgNight;
  }

  render(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update(ctx) {
    this.render(ctx);
  }
}

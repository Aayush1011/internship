class Canvas {
  constructor() {
    this.canvas = document.querySelector(".canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
    this.canvas.width = 1488;
    this.canvas.height = 746;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
}

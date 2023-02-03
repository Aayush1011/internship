class Canvas {
  constructor() {
    this.canvas = document.querySelector(".canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 480;
    this.canvas.height = 640;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
}

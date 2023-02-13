class Player {
  constructor(
    slingshotX,
    slingshotY,
    baseX,
    baseY,
    slingshotImage,
    baseImage,
    color,
    marbleColor1,
    marbleColor2,
    canvas
  ) {
    this.slingshotX = slingshotX;
    this.slingshotY = slingshotY;
    this.baseX = baseX;
    this.baseY = baseY;
    this.baseImage = baseImage;
    this.slingshotImage = slingshotImage;
    this.name = color;
    this.marbleColor1 = marbleColor1;
    this.marbleColor2 = marbleColor2;
    this.canvas = canvas;
    this.base = null;
    this.slingshot = null;
    this.marble = null;
    this.slingShotState = null;
    this.collision = false;
    this.disabled = false;
  }

  init() {
    this.base = new Base(this.baseX, this.baseY, 128, 128, this.baseImage);
    this.slingshot = new Slingshot(
      this.slingshotX,
      this.slingshotY,
      100,
      150,
      this.slingshotImage,
      this.name
    );
    this.slingshot.pullSlingshot(this.canvas);
    this.marble = new Marble(
      this.slingshot.position.x + this.slingshot.width / 2,
      this.slingshot.position.y - 25,
      15,
      this.marbleColor1,
      this.marbleColor2
    );
  }

  update(ctx, bird) {
    this.base.update(ctx, this.disabled);
    this.slingShotState = this.slingshot.update(ctx, this.disabled);
    this.collision = this.marble.update(
      ctx,
      this.slingShotState,
      bird,
      this.disabled
    );
    return this.collision;
  }
}

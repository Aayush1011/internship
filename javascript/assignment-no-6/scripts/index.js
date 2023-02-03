function main() {
  let assets = {};
  const assetsToLoad = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "background-day",
    "background-night",
    "base",
    "gameover",
    "message",
    "yellowbird-downflap",
    "yellowbird-midflap",
    "yellowbird-upflap",
    "pipe-green",
    "pipe-green-top",
  ];

  let loadAssets = assetsToLoad.map((assetName) => {
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onerror = () => reject(`${assetName} couldn't be loaded`);
      img.onload = () => {
        resolve(img);
      };
      img.src = `assets/sprites/${assetName}.png`;
      assets[assetName] = img;
    });
  });

  Promise.all(loadAssets).then(() => {
    const gameloop = new Gameloop(assets);
    gameloop.newGame();
  });
}

main();

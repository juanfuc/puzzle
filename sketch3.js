let tileWidth = 200;
let tileHeight = 150;
let frame = 10;
let padding = 10;

let img;

let scaleFactor = 1;

function preload() {
  img = loadImage("./imgs/38.png");
}

function setup() {
  // Create the canvas and set the background color
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Resize the image to fit the canvas
  img.resize(0, windowHeight);

  // If the resized image is too wide, resize it to fit within the width of the left half of the canvas
  if (img.width > windowWidth / 2) {
    img.resize(windowWidth / 2, 0);
  }

  // Calculate the x and y position to center the image on the left side of the canvas
  let x = (windowWidth / 2 - img.width) / 2;
  let y = (windowHeight - img.height) / 2;

  // Display the full image in the left half of the canvas
  image(img, x, y, img.width, img.height);

  // Calculate the number of tiles that fit in the right half of the canvas
  let tilesAcross = floor((windowWidth / 2 - frame * 2) / (tileWidth + padding));
  let tilesDown = floor(windowHeight / (tileHeight + padding));
  let extraWidth = round((windowWidth / 2 - tilesAcross * (tileWidth + padding)) / 2);
  let extraHeight = round((windowHeight - tilesDown * (tileHeight + padding) + frame * 2 - padding) / 2);

  // Generate the mosaic in the right half of the canvas
  for (i = 0; i < tilesAcross; i++) {
    for (j = 0; j < tilesDown; j++) {
      let tile = img.get(
        floor(random(img.width - tileWidth)),
        floor(random(img.height - tileHeight)),
        tileWidth,
        tileHeight
      );
      let x = i * (tileWidth + padding) + frame + extraWidth + windowWidth / 2;
      let y = j * (tileHeight + padding) + frame + extraHeight;

      // Create a p5.js element for the tile
      let tileElement = createElement("div");

      // Set the position and size of the element to match the tile
      tileElement.position(x, y);
      tileElement.size(tileWidth, tileHeight);

      // Attach the mouseOverTile and mouseOutTile functions to the element
      tileElement.mouseOver(mouseOverTile);
      tileElement.mouseOut(mouseOutTile);

      // Set the scale factor for the tile to 1 (no zoom)
      let scaleFactor = 1;

      // Display the tile
      image(tile, x, y, tileWidth, tileHeight);
    }
  }
}

// When the mouse is over a tile, increase the scale factor
function mouseOverTile() {
  scaleFactor *= 2;
  tileWidth *= 2;
  tileHeight *= 2;
  image(tile, x, y, tileWidth, tileHeight);
}

function mouseOutTile(){
    clear(x, y, tileWidth, tileHeight);
    image(tile, x, y, tileWidth, tileHeight);
    image(tile, x, y);
    tileWidth = defaultTileWidth;
    tileHeight = defaultTileHeight;
}

  
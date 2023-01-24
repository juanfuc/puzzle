let tileWidth =150;
let tileHeight = 100;
let frame = 10;
let padding = 10;
let tilesAcross;
let tilesDown;
let extraWidth;
let extraHeight;


let img;

function preload() {
  img = loadImage("./imgs/50.png")
    
}

function setup() {
    // Create the canvas and set the background color
    createCanvas(windowWidth, windowHeight);
    background(0);
  
    // Resize the image to fit the canvas
    // let windowRatio = windowWidth/windowHeight;
    // let imageRatio = img.width/img.height;
    // if (windowRatio > imageRatio) {
    //   img.resize(0, windowHeight);
    // } else {
    //   img.resize(windowWidth, 0);
    // }



    // Resize the image to fit the width of the left half of the canvas
    //img.resize(windowWidth / 2, 0);


    
    // Calculate the x and y position to center the image on the left side of the canvas
    // let x = (windowWidth / 2 - img.width) / 2;
    // let y = 0;

    // Resize the image to fit within the height of the left half of the canvas
  img.resize(0, windowHeight);

  // If the resized image is too wide, resize it to fit within the width of the left half of the canvas
  if (img.width > windowWidth / 2) {
    img.resize(windowWidth / 2, 0);
  }

  // Calculate the x and y position to center the image on the left side of the canvas
  let x = (windowWidth / 2 - img.width) / 2;
  let y = (windowHeight - img.height) / 2;


    // Display the full image in the left half of the canvas

    //image(img, 0, 0, windowWidth / 2, windowHeight);
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

      // Set the scale factor for the tile to 1 (no zoom)
      let scaleFactor = 1;

      // When the mouse is over a tile, increase the scale factor
      tileElement.mouseOver(function() {
        scaleFactor *= 2;
      });

      // When the mouse is moved out of a tile, return the scale factor to 1
      tileElement.mouseOut(function() {
        scaleFactor = 1;
      });

      // Display the tile
      image(tile, x, y, tileWidth * scaleFactor, tileHeight * scaleFactor);

      }
    }
  }

  function draw() {
    for (i = 0; i < tilesAcross; i++) {
      for (j = 0; j < tilesDown; j++) {
        let x = i * (tileWidth + padding) + frame + extraWidth + windowWidth / 2;
        let y = j * (tileHeight + padding) + frame + extraHeight;
  
        // Update the scale factor for the tile
        let scaleFactor = 1;
        if (mouseIsOverTile) {
          scaleFactor *= 2;
        }
  
        // Redraw the tile with the updated scale factor
        image(tile, x, y, tileWidth * scaleFactor, tileHeight * scaleFactor);
      }
    }
  }
  
  function keyTyped() {
    if (key === "s") {
      save("myCanvas.png");
    }
  }
  
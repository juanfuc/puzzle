//Thanks to Steve's Makerspace
//Danniel Shifman
//Jeff Thompson

let tileWidth =300;
let tileHeight = 150;
let frame = 10;
let padding = 20;

let img;

function preload() {
  img = loadImage("./imgs/70.jpg")
    
}

function setup() {
//createCanvas(400,400);
  
  let windowRatio = windowWidth/windowHeight;
  
  let imageRatio = img.width/img.height;
  
  if (windowRatio > imageRatio) {
    img.resize(0,windowHeight-20)
  } else {img.resize(windowWidth-20,0)}
  
  
  
  //img.resize(windowWidth,0)
  createCanvas (windowWidth-20, windowHeight-20);
  background(0);

  //image(img,0,0);
  
  //let tile = img.get(100,70,50,50);
  //image(tile,50,50);
  
  let tilesAcross = floor ((width - frame * 2) / (tileWidth + padding));
  let tilesDown = floor((height - frame * 2) / (tileHeight + padding));
  let extraWidth = round((width-tilesAcross * (tileWidth + padding))/2);
  let extraHeight = round((height-(tilesDown * (tileHeight + padding) + frame * 2 - padding))/2);
  
  for (i=0; i < tilesAcross; i++) {
    for(j=0; j < tilesDown; j++) {
      let tile = img.get( floor(random(img.width - tileWidth)),
        floor(random(img.height - tileHeight)),
        tileWidth,
        tileHeight);
      let x = i * (tileWidth + padding) + frame + extraWidth;
      let y = j * (tileHeight + padding) + frame + extraHeight;
      image(tile, x, y);
    }
  }
}

function keyTyped() {
  if (key === "s") {
    save("myCanvas.jpg");
  }
}

//mouseOver para agrandar cada tile
//dividir pantalla y poner la imagen entera a la izquierda
//hacer una interfaz para que el usuario suba la imagen y cambie parametros
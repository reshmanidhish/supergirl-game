const canvas = document.getElementById("canvas");
// canvas.style.display = "none";
const ctx    = canvas.getContext("2d");
ctx.fillStyle = 'white';
ctx.font = '18px serif';

class Girl {
  constructor() {
    this.x = 25;
    this.y = 25;
    
    // Load the image
    const img = new Image();
    
    img.addEventListener('load', () => {
      // Once image loaded => draw
      this.img = img;
      this.draw();
    });
    img.src = "/images/supergirl.jpg"
  }
  moveUp() {
    this.y -= 25;
  }
  moveDown() {
    this.y += 25;
  }
  moveLeft() {
    this.x -= 25;
  }
  moveRight() {
    this.x += 25;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, 50, 50);
  }
}

const girl = new Girl();

document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 38: girl.moveUp();    console.log('up',    girl); break;
    case 40: girl.moveDown();  console.log('down',  girl); break;
    case 37: girl.moveLeft();  console.log('left',  girl); break;
    case 39: girl.moveRight(); console.log('right', girl); break;
  }
  updateCanvas();
})

function updateCanvas() {
  ctx.clearRect(0,0,1500,1700);
  ctx.fillText("girl_x: " + girl.x, 580,40);
  ctx.fillText("girl_y: " + girl.y, 580,60);
  
  girl.draw()
}

updateCanvas()
const myObstacles = [];

const myGameArea = {
  startCanvas: document.createElement("canvas"),
  canvas: document.createElement("canvas"),
  frames: 0,
  start: function () {
    //landing page canvas
    this.startCanvas.width = 1000;
    this.startCanvas.height = 600;
    this.startContext = this.startCanvas.getContext("2d");
    this.startCanvas.style.display = "block";
    document.body.insertBefore(this.startCanvas, document.body.childNodes[0]);

    // landing page background image setting 
    const backgroundImage = new Image();
    backgroundImage.src = "/images/background city landing page.png";
    backgroundImage.onload = () => {
      // Draw the image on the starting canvas
      this.startContext.drawImage(
        backgroundImage,
        0,
        0,
        this.startCanvas.width,
        this.startCanvas.height
      );
      // to draw the supergirl image
      const supergirlImage = new Image();
  supergirlImage.src = "/images/supergirl.png";
  supergirlImage.onload = () => {
    // Draw Supergirl's image on the canvas
    const supergirlWidth = 150;
    const supergirlHeight = 150;
    const supergirlX = 0;
    const supergirlY = (this.startCanvas.height - supergirlHeight) / 2;
    this.startContext.drawImage(supergirlImage, supergirlX, supergirlY, supergirlWidth, supergirlHeight);
  };

      this.startContext.fillStyle = "black";
      this.startContext.font = "30px Arial";
      this.startContext.fillText(
        "Click to start",
        this.startCanvas.width / 2 - 90,
        this.startCanvas.height / 2 - 30
      );
      this.startContext.font = "30px Arial";
      this.startContext.fillText(
        "Supergirl's Heroic Quest",
        this.startCanvas.width / 2 - 90,
        50
      );
      this.startContext.font = "16px Arial";
      this.startContext.fillText(
        "The game is about a Supergirl which fly through the city using arrow keys,but be careful not to hit the buildings or else ",
        this.startCanvas.width / 20,
        80
      );
      this.startContext.fillText(
        "the city will take damage.Also watch out for kryptonite meteors ,which will decrease your health by 50% if you touch them.",
        this.startCanvas.width / 20,
        120
      );
      this.startContext.fillText(
        "If you hit three buidings or your health goes to 0%,it's game over.Help Supergirl protect the city and emerge as a true hero.",
        this.startCanvas.width / 20,
        160
      );
      this.startCanvas.addEventListener("click", () => {
        // to hide canvas
        this.startCanvas.style.display = "none";
        this.canvas.style.display = "block";

       
       
       
        //gameCanvas
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGameArea, 1);
      });
    };
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
  score: function () {
    const points = Math.floor(this.frames / 5);
    this.context.font = "18px serif";
    this.context.fillStyle = "black";
    this.context.fillText(`Score: ${points}`, 350, 50);
  },
};

class Component {
  constructor(width, height, imageUrl, x, y) {
    this.width = width;
    this.height = height;
    this.imageUrl = imageUrl;
    this.x = x;
    this.y = y;
    // new speed properties
    this.speedX = 0;
    this.speedY = 0;
    this.img = new Image();
    this.damage = 0;
  }

  update() {
    let ctx = myGameArea.context;
    this.img.src = this.imageUrl;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    // damage icon to draw
    for (let i = 0; i < this.damage; i++) {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x + 10 + i * 20, this.y - 20, 10, 10);
    }
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  restartPos() {
    this.speedX = 0;
    this.speedY = 0;
    this.x = 0;
    this.y = 110;
    this.x += this.speedX;
    this.y += this.speedY;
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }

  crashWith(obstacle) {
    const crashed = !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
    if (crashed) {
      this.damage++;
      if (this.damage >= 3) {
        return true;
      } else {
        this.restartPos()
      }
    }
    return false;
  }
}

const player = new Component(50, 50, "/images/supergirl.png", 0, 110);
class Meteor extends Component {
    constructor(width, height, imageUrl, x, y) {
      super(width, height, imageUrl, x, y);
      this.y = Math.floor(Math.random() * (myGameArea.canvas.height - this.height));
      this.speedX = 2;
      this.img.src = "/images/main meteor.png";
    }
  }
  
  const meteors = [];
  
  function updateMeteors() {
    for (let i = 0; i < meteors.length; i++) {
      meteors[i].x -= meteors[i].speedX;
      meteors[i].update();
      if (player.crashWith(meteors[i])) {
        player.damage += 1;
        if (player.damage >= 3) {
          myGameArea.stop();
        } else {
          player.restartPos();
        }
        meteors.splice(i, 1);
        i--;
      } else if (meteors[i].x + meteors[i].width < 0) {
        meteors.splice(i, 1);
        i--;
      }
    }
  
    if (myGameArea.frames % 120 === 0) {
      meteors.push(new Meteor(50, 50, "/images/main meteor.png", myGameArea.canvas.width, 0));
    }
  }

function updateGameArea() {
  myGameArea.clear();
  // update the player's position before drawing
  player.newPos();
  player.update();
  // update the obstacles array
  updateObstacles();
  // check if the game should stop
  checkGameOver();
  // update and draw the score
  myGameArea.score();
  myGameArea.context.font = "18px serif";
  myGameArea.context.fillStyle = "black";
  myGameArea.context.fillText(`Damage: ${player.damage}`, 20, 50);
  updateMeteors()
}

myGameArea.start(); // Starting of the game

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38: // up arrow
      player.speedY -= 1;
      break;
    case 40: // down arrow
      player.speedY += 1;
      break;
    case 37: // left arrow
      player.speedX -= 1;
      break;
    case 39: // right arrow
      player.speedX += 1;
      break;
  }
};

document.onkeyup = function (e) {
  player.speedX = 0;
  player.speedY = 0;
};

function updateObstacles() {
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }

  myGameArea.frames += 1;
  if (myGameArea.frames % 120 === 0) {
    let x = myGameArea.canvas.width;
    let minHeight = 50;
    let maxHeight = 100;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    let minGap = 500;
    let maxGap = 100;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

    myObstacles.push(
      new Component(
        200,
        x - height - gap,
        "/images/Apartment.png",
        x,
        height + gap
      )
    );
  }
}

function checkGameOver() {
  const crashed = myObstacles.some(function (obstacle) {
    return player.crashWith(obstacle);
  });

  if (crashed) {
    myGameArea.stop();
  }
}

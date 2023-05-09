const myObstacles = [];
let music;

const myGameArea = {
  startCanvas: document.createElement("canvas"),
  gameCanvas: document.createElement("canvas"),
  buttonCanvas: document.createElement("canvas"),
  gameOverCanvas: document.createElement("canvas"),

  frames: 0,

  start: function () {
    
    //landing page canvas
    this.startCanvas.width = 1000;
    this.startCanvas.height = 580;
    this.startCanvas.style.border = "2px solid grey";
    this.startContext = this.startCanvas.getContext("2d");
    this.buttonCtx = this.buttonCanvas.getContext("2d");
    this.startCanvas.style.display = "block";
    document.body.insertBefore(this.startCanvas, document.body.childNodes[0]);

    // landing page background image setting
    const backgroundImage = new Image();
    backgroundImage.src = "images/background.png";
    backgroundImage.onload = () => {
      // Draw the image on the starting canvas
      this.startContext.drawImage(backgroundImage, 0, 0, this.startCanvas.width, this.startCanvas.height);
      // to draw the supergirl image
      const supergirlImage = new Image();
      supergirlImage.src = "images/supergirl.png";
      supergirlImage.onload = () => {
        // Draw Supergirl's image on the startcanvas
        const supergirlWidth = 150;
        const supergirlHeight = 110;
        const supergirlX = 45;
        const supergirlY = (this.startCanvas.height - supergirlHeight) / 2.4; 
        this.startContext.drawImage(supergirlImage, supergirlX, supergirlY, supergirlWidth, supergirlHeight);
      };

      this.startContext.fillStyle = "black";
      this.startContext.font = "30px Arial";

      // Create the button in a new canvas
      this.buttonCanvas.width = 120;
      this.buttonCanvas.height = 40;

      // Draw the button
      this.buttonCtx.fillStyle = "#106cb0";
      this.buttonCtx.fillRect(0,0, this.buttonCanvas.width,this.buttonCanvas.height);

      this.buttonCtx.fillStyle = "white";
      this.buttonCtx.font = "20px Arial";
      this.buttonCtx.fillText("Start", 37, 27);
      this.startContext.drawImage(
        this.buttonCanvas,
        this.startCanvas.width / 2 - 70,
        this.startCanvas.height / 2 - 110
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
        this.gameCanvas.style.display = "block";

        //gameCanvas
        this.gameCanvas.width = 800;
        this.gameCanvas.height = 600;
        this.gameCanvas.style.border = "2px solid black";
        this.context = this.gameCanvas.getContext("2d");
        document.body.insertBefore(this.gameCanvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGameArea, 1);

        //background music
        music = new sound("sound/game-music.mp3");
        music.play();      
      });
    };
  },

  clear: function () {
    this.context.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
    music.stop();
    let gameOverMusic;
    gameOverMusic = new sound("sound/game-over.wav");
    gameOverMusic.play();

    myGameArea.clear();    

    //gameover page
    this.gameOverCanvas.width = 1000;
    this.gameOverCanvas.height = 580;
    this.gameOverCanvas.style.border = "2px solid grey";
    this.gameOverContext = this.gameOverCanvas.getContext("2d");
    this.gameOverCanvas.style.display = "block";
    document.body.insertBefore(this.gameOverCanvas, document.body.childNodes[0]);

    // landing page background image setting
    const bgGameOver = new Image();
    bgGameOver.src = "images/background.png";
    bgGameOver.onload = () => {
      // Draw the image on the starting canvas
      this.gameOverContext.drawImage(
        bgGameOver,
        0,
        0,
        this.gameOverCanvas.width,
        this.gameOverCanvas.height
      )

      this.gameOverContext.font = "30px Arial";
      this.gameOverContext.fillStyle = "black";
      this.gameOverContext.fillText(
        "GAME OVER",
        this.gameOverCanvas.width / 2 - 90,
        50
      );
    
    }

      

      

  },
  score: function () {
    const points = Math.floor(this.frames / 5);
    this.context.font = "18px serif";
    this.context.fillStyle = "black";
    this.context.fillText(`Score: ${points}`, 350, 50);
  },
};



// Component class is a common class used for creating supergirl, building and meteor
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
    const crashed = ! (
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
        this.restartPos();
      }
    }
    return false;
  }
}

const player = new Component(70, 60, "images/supergirl.png", 0, 110); // Supergirl

class Meteor extends Component {
constructor(width, height, imageUrl, x, y) {
    super(width, height, imageUrl, x, y);
    
    this.y = Math.floor(
      Math.random() * (myGameArea.gameCanvas.height - this.height)
    );

    this.speedX = 1.2;
    this.img.src = imageUrl;
  }
}

const meteors = [];

function updateMeteors() { // calls every 1 seconds
  for (let i = 0; i < meteors.length; i++) {
    meteors[i].x -= meteors[i].speedX; // initially the speed of the player is 2 and x axis is 800. Here we are decrementing the x axis by 2
    meteors[i].update();

    
    if (player.crashWith(meteors[i])) { // Checking if player got crashed with Meteros 
      player.damage += 1;
      if (player.damage >= 3) { // Checking if player got crashed with Meteros more than 3
        myGameArea.stop();
      } else {
        player.restartPos();
      }
     meteors.splice(i, 1); // removing the crashed meteors with the player
     i--;
    } else if (meteors[i].x + meteors[i].width < 0) { //Deleting the meteors from meteors array which are out of the frame
      meteors.splice(i, 1);
      i--;
    }
    console.log(meteors)
  }

  if (myGameArea.frames % 150 === 0) {
    meteors.push(
      new Meteor(50, 50, "images/meteor.png", myGameArea.gameCanvas.width, 0)
    );
  }
}

// create the background canvas
let backgroundImage = new Image();
backgroundImage.src = "images/game-background.jpg";
backgroundImage.width = 1200; // set the width of the background image
backgroundImage.x = 0; // initialize the x position


// let background = new Image();
// background.src = "images/game-background.jpg";
// let backgroundX = 0;
// let backgroundSpeed = 1;

function updateGameArea() {
  myGameArea.clear();
  
//   // Move the background to the left
//  backgroundX -= backgroundSpeed;
  
//   // Wrap the background to create a continuous scrolling effect
//   if (backgroundX <= -myGameArea.gameCanvas.width) { //-800
//     backgroundX = 0;
//   }
   // draw the moving background image
   backgroundImage.x -= 1;
   myGameArea.context.drawImage(
     backgroundImage,
     backgroundImage.x,
     0,
     backgroundImage.width,
     myGameArea.gameCanvas.height
   );
   myGameArea.context.drawImage(
     backgroundImage,
     backgroundImage.x + backgroundImage.width,
     0,
     backgroundImage.width,
     myGameArea.gameCanvas.height
   );
   if (backgroundImage.x <= -backgroundImage.width) {
     backgroundImage.x = 0;
   }
  // Draw the background image
 // myGameArea.context.drawImage(background, backgroundX, 0, myGameArea.gameCanvas.width, myGameArea.gameCanvas.height);
  


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
  updateMeteors();
}
 


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
    let x = myGameArea.gameCanvas.width;
    let minHeight = 50;
    let maxHeight = 100;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    let minGap = 500;
    let maxGap = 100;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

    const building = new Component(200, x - height - gap, "/images/apartment.png", x, height + gap)
    myObstacles.push(building);
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

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

myGameArea.start(); // Starting of the game


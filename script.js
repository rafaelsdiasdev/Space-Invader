let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

window.onload = function () {
  document.getElementById("game-board").style.display = 'none';
  document.getElementById("start-button").onclick = function () {
    document.getElementById("intro").style.display = 'none';
    document.getElementById('game-board').style.display = 'inline';
    document.getElementById('start-button').style.display = 'none';
    start();
  };
}

ctx.fillStyle = 'white';
// ctx.font = '18px serif';

let arrShoot = []

let enemy = []

let enemyImg = new Image()
enemyImg.src = "./images/enemy.png"

let nave = {
  x: 350,
  y: 440,
  moveLeft: function () {
    this.x -= 5
  },
  moveRight: function () {
    this.x += 5
  },
}

class Enemy {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  drawEnemy() {
    ctx.drawImage(enemyImg, this.x, this.y, 40, 30)
  }
}

class Shoot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  drawShoot() {
    ctx.fillRect(this.x, this.y - 10, 3, 10);

  }
}


function shooting(bullet) {
  arrShoot.push(new Shoot(nave.x + 24, nave.y))
}


function clearCanvas() {
  ctx.clearRect(0, 0, 700, 500);
}

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      nave.moveLeft();
      // console.log('left', nave);
      break;
    case 39:
      nave.moveRight();
      // console.log('right', nave);
      break;
    case 65:
      shooting();
      break;
  }
  updateNave();
}

let img = new Image();
img.src = "./images/nave.png";



function draw(rocket) {
  ctx.drawImage(img, rocket.x, rocket.y, 50, 50);
}

function updateNave() {
  ctx.clearRect(0, 0, 1500, 1700);
  if (nave.posX > 0 && nave.posX < 700) {
    nave.x += this.x;
  }
  if (nave.x <= 0) {
    nave.x = 1;
  } else if (nave.x >= 650) {
    nave.x = 650
  }
  // draw(nave)
}

function updateShoot() {
  arrShoot.forEach(bullet => {
    bullet.y -= 3;
    bullet.drawShoot()
  })

  // window.requestAnimationFrame(updateShoot);
}

let frame = 0;

function createEnemy() {
  if (frame % 120 === 0) {
    let randomX = Math.random() * canvas.width;
    enemy.push(new Enemy(randomX, -50));
  }
}

function updateEnemy() {
  enemy.forEach(elem => {
    elem.y += 1;
    elem.drawEnemy()
  })
}

let score = 0

function checkShooted() {
  for (let i = 0; i < arrShoot.length; i += 1) {
    for (let w = 0; w < enemy.length; w += 1) {
      if (arrShoot[i].y === enemy[w].y + 30 && arrShoot[i].x >= enemy[w].x && arrShoot[i].x <= enemy[w].x + 40) {
        enemy.splice(w, 1)
        score += 100
      }
    }
  }
}

let count = 0;
let flag = true;

function gameover() {
  enemy.forEach((elem, indice) => {
    if (elem.y > 500) {
      count += 1;
      enemy.splice(indice,1)
    }
  })
  if(count === 3){
    flag = false;
  }
}


const start = () => {
  if(flag){
    frame += 1;
    clearCanvas();
    draw(nave);
    updateShoot();
    updateEnemy()
    createEnemy()
    checkShooted()
    ctx.fillText(`SCORE: ${score} `, 580, 40);
    window.requestAnimationFrame(start);
    gameover();
  } else {
    cancelAnimationFrame(start)
  }
}

// start();
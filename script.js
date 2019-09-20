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

let arrShoot = []

let arrEnemy = []

let enemyImg = new Image()
enemyImg.src = "./images/enemy2.png"

let nave = {
  x: 325,
  y: 440,
  moveLeft: function () {
    this.x -= 10
  },
  moveRight: function () {
    this.x += 10
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
    ctx.fillRect(this.x, this.y - 10, 1, 10);

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
      break;
    case 39:
      nave.moveRight();
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
}

function updateShoot() {
  arrShoot.forEach(bullet => {
    bullet.y -= 3;
    bullet.drawShoot()
  })
}

let frame = 0;

function createEnemy() {
  if (frame % 160 === 0) {
    let randomX = Math.random() * 650;
    arrEnemy.push(new Enemy(randomX, -50));
  }
}

function updateEnemy() {
  arrEnemy.forEach(elem => {
    elem.y += 1;
    elem.drawEnemy()
  })
}

let score = 0

function checkShooted() {
  for (let i = 0; i < arrShoot.length; i += 1) {
    for (let w = 0; w < arrEnemy.length; w += 1) {
      if (arrShoot[i].y === arrEnemy[w].y + 30 && arrShoot[i].x >= arrEnemy[w].x && arrShoot[i].x + 1 <= arrEnemy[w].x + 40) {
        arrEnemy.splice(w, 1)
        score += 100
      }
    }
  }
}

let count = 3;
let flag = true;

function gameover() {
  arrEnemy.forEach((elem, indice) => {
    if (elem.y > 500) {
      count -= 1;
      arrEnemy.splice(indice,1)
    }
  })
  if(count === 0){
    flag = false;
    ctx.font = "60px Turret Road";
    ctx.fillStyle = "#fff";
    ctx.fillText(`GAMEOVER`, 200, 220);
    sound.pause()
  }
}

let sound = new Audio('./music/music2.mp3')

const start = () => {
  if(flag){
    frame += 1;
    sound.play()
    clearCanvas();
    ctx.font = "20px Turret Road";
    ctx.fillText(`HP: ${count} `, 20, 40);
    ctx.fillText(`SCORE: ${score} `, 565, 40);
    draw(nave);
    updateShoot();
    updateEnemy()
    createEnemy()
    checkShooted()
    window.requestAnimationFrame(start);
    gameover();
  } else {
    ctx.font = "20px Turret Road";
    ctx.fillText(`HP: ${count} `, 20, 40);
    cancelAnimationFrame(start)
  }
}

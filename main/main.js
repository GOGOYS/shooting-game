// 캔버스 세팅
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d")

canvas.width = 400;
canvas.height =700;
document.body.appendChild(canvas);


//이미지 불러오기
let backgroundImage, spaceShipImage, bulletImage, enemyImage;
let spaceshipX = canvas.width/2 - 32;
let spaceshipY = canvas.height - 64;
const loadImage = ()=>{
    backgroundImage = new Image();
    backgroundImage.src = "images/background.jpg";

    spaceShipImage = new Image();
    spaceShipImage.src= "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png"

};

const render = ()=>{
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceShipImage, spaceshipX, spaceshipY);
}

const main = ()=>{
    render();
    requestAnimationFrame(main);
}

loadImage();
main();
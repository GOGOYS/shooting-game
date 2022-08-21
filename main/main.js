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

let bulletList = []
function Bullet(){
    this.x = 0
    this.y = 0
    this.init =  function(){
        this.x = spaceshipX
        this.y = spaceshipY

        bulletList.push(this);
    }

    this.update = function(){
        this.y -= 7;
    };
}

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

let keysDown = {};
const setKeyboard = ()=>{
    document.addEventListener("keydown", (event)=>{
        keysDown[event.keyCode] = true;
        console.log(keysDown)
    });

    document.addEventListener("keyup", (event)=>{
        delete keysDown[event.keyCode]
        console.log(keysDown)

        if(event.keyCode == 32){
            createBullet() //총알 생성
        }
    });
}

const createBullet= ()=>{
    console.log("총알 생성")
    let bull = new Bullet();
    bull.init();
    console.log("총알 리스트", bulletList)
}

const xyupdate = ()=>{
    //버튼 방향키 방향
    if(39  in keysDown ){ //오른쪽 버튼
        spaceshipX += 7; //우주선 속도
    }
    if(37 in keysDown){ //왼쪽
        spaceshipX -= 7;
    }
    if(40 in keysDown){ //위
        spaceshipY += 7;
    }
    if(38 in keysDown){//아래
        spaceshipY -= 7;
    }

    //이동제한 넓이
    if(spaceshipX <= 0){
        spaceshipX = 0;
    }
    if(spaceshipX >= (canvas.width -64)){
        spaceshipX = canvas.width -64
    }
    if(spaceshipY <= 0){
        spaceshipY = 0;
    }
    if(spaceshipY >= (canvas.height -64)){
        spaceshipY = canvas.height -64
    }

    for(let i =0; i < bulletList.length; i++){
        bulletList[i].update();
    }
}

//화면에 렌더링하기
const render = ()=>{
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceShipImage, spaceshipX, spaceshipY);
    
    for(let i =0; i < bulletList.length; i++){
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y)
    }
}

const main = ()=>{
    xyupdate(); //좌표값 업데이트
    render(); //화면 그리기
    requestAnimationFrame(main); //main 반복
}

loadImage();
setKeyboard();
main();


//총알만들기
//1 스페이스바를 누르면 총알 발사
//2 총알이 발사 = 총알의 y값이 --, 총알의 x값은? 스페이스 누른 순간의 우주선의 x좌표
//3 발사된 총알들은 총알 배열에 저장한다
//4 총알들은 x,y 좌표값이 있어야한다
//5 총알 배열을 가지고 그려준다
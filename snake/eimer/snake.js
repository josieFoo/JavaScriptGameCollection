// 캔버스 요소 생성
const canvas0 = document.getElementById("gameCanvas0");
const ctx0 = canvas0.getContext("2d");


// 캔버스 크기와 색상 설정
canvas0.width = 960;
canvas0.height = 540;
ctx0.fillStyle = "black";
ctx0.fillRect(0, 0, canvas0.width, canvas0.height);

let snake0 = {
    x: 10,
    y: 10,
    size: 10,
    speed: 1,
    color: "green",
    body: []
};

// 음식 객체 생성
let food0 = {
    x: 0,
    y: 0,
    size: 10,
    color: "red"
};

// 음식 위치 랜덤으로 생성하는 함수
function generatefood0() {
    food0.x = Math.floor(Math.random() * (canvas0.width / food0.size)) * food0.size;
    food0.y = Math.floor(Math.random() * (canvas0.height / food0.size)) * food0.size;
};

// 방향 변수
let dx = 0;
let dy = 0;

// 뱀 그리기 함수
function drawsnake0() {
    ctx0.fillStyle = snake0.color;
    for (let i = 0; i < snake0.body.length; i++) {
      ctx0.fillRect(snake0.body[i].x, snake0.body[i].y, snake0.size, snake0.size);
    }
};

// 음식 그리기 함수
function drawfood0() {
    ctx0.fillStyle = food0.color;
    ctx0.fillRect(food0.x, food0.y, food0.size, food0.size);
};

// 게임 루프
function gameLoop() {
    // 화면 지우기
    ctx0.clearRect(0, 0, canvas0.width, canvas0.height);
  
    // 뱀 이동
    snake0.x += snake0.speed;
    snake0.body.unshift({ x: snake0.x, y: snake0.y });
    snake0.body.pop();
  
    // 뱀 그리기
    drawsnake0();
  
    // 음식 그리기
    drawfood0();
  
    // 게임 루프 재귀 호출
    requestAnimationFrame(gameLoop);
  }
  
  // 게임 시작
  generatefood0();
  gameLoop();
  
// 캔버스 크기 설정
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// 스네이크 초기화
let snake = [{x: 10, y: 10}];
let color = [{white:"white", 
              red:"red", 
              brown:"brown",
              green:"green",
              blue: "blue"
}];
let speed = 1;
let direction = "right";

// 먹이 생성
let food = generateRandomPosition();

// 먹은 먹이 개수
let score = 0;

// 게임 루프
function gameLoop() {
  // 스네이크 이동
  const head = {x: snake[0].x, y: snake[0].y};
  if (direction === "right") head.x++;
  else if (direction === "left") head.x--;
  else if (direction === "up") head.y--;
  else if (direction === "down") head.y++;
  snake.unshift(head);

  // 먹이 먹기
  if (head.x === food.x && head.y === food.y) {
    food = generateRandomPosition();
    score++;
    speed=speed*1.05;
  } else {
    snake.pop();
  }

  // 스네이크 충돌 검사
  if (head.x < 0 || head.x > canvasWidth/10 || head.y < 0 || head.y > canvasHeight/10){
    alert("Game over!");
    location.reload();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      alert("Game over!");
      location.reload();
    }
  };

  // 캔버스 그리기
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // 뱀 속성;
  const snakeColor={color: color[0].brown};
  ctx.fillStyle = snakeColor.color;
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
  }
  // 먹이 속성
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10);

  // 먹은 먹이 개수 표시
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);

  // 다음 프레임 실행
  setTimeout(gameLoop, 110*(1/speed));
}

// 먹이 위치 랜덤 생성
function generateRandomPosition() {
  return {x: Math.floor(Math.random() * canvasWidth / 10), y: Math.floor(Math.random() * canvasHeight / 10)};
}

// 키 입력 이벤트 처리
//document.addEventListener("keydown", event => {
//  if (event.keyCode === 37 && direction !== "right") direction = "left";
//  else if (event.keyCode === 38 && direction !== "down") direction = "up";
//  else if (event.keyCode === 39 && direction !== "left") direction = "right";
//  else if (event.keyCode === 40 && direction !== "up") direction = "down";
//});
document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
    else if (event.key === "ArrowUp" && direction !== "down") direction = "up";
    else if (event.key === "ArrowRight" && direction !== "left") direction = "right";
    else if (event.key === "ArrowDown" && direction !== "up") direction = "down";
});

// 게임 시작
gameLoop();

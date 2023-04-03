// 캔버스 요소 생성
const canvas2 = document.createElement("gameCanvas2");
const ctx2 = canvas2.getContext("2d");
document.body.appendChild(canvas2);

// 캔버스 크기와 색상 설정
canvas2.width = 960;
canvas2.height = 540;
ctx2.fillStyle = "black";
ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

// 뱀 객체 생성
let snake2 = {
  x: 50,
  y: 50,
  size: 10,
  speed: 2,
  color: "green",
  tail: [] //새로 추가한 뱀 꼬리 배열
};

// 음식 객체 생성
let food2 = {
  x: 0,
  y: 0,
  size: 10,
  color: "red"
};

// 음식 위치 랜덤으로 생성하는 함수
function generatefood2() {
  food2.x = Math.floor(Math.random() * (canvas2.width / food2.size)) * food2.size;
  food2.y = Math.floor(Math.random() * (canvas2.height / food2.size)) * food2.size;
}

//function generatefood2() {
//  let food2X = Math.floor(Math.random() * (canvas.width / food2.size)) * food2.size;
//  let food2Y = Math.floor(Math.random() * (canvas.height / food2.size)) * food2.size;
//  
//  // 뱀이 음식을 포함하는 경우, 다시 위치를 생성합니다.
//  if (food2X === snake2.x && food2Y === snake2.y) {
//  generatefood2();
//  } else {
//  food2.x = food2X;
//  food2.y = food2Y;
//  }
//};

// 방향 변수
let dx = 0;
let dy = 0;

//// 뱀 이동 함수
//function movesnake2() {
//  snake2.x += dx * snake2.speed;
//  snake2.y += dy * snake2.speed;
//
//  // 뱀이 음식을 먹으면
//  if (snake2.x === food2.x && snake2.y === food2.y) {
//    // 먹이를 다시 생성하고 뱀 길이를 늘린다
//    generatefood2();
//    snake2.size += 10;
//  }
//}
// 뱀 이동 함수
function movesnake2() {
  // 뱀 꼬리 추가
  snake2.tail.unshift({ x: snake2.x, y: snake2.y });
  snake2.x += dx * snake2.speed;
  snake2.y += dy * snake2.speed;
  
  // 뱀이 음식을 먹으면
  if (snake2.x === food2.x && snake2.y === food2.y) {
  // 먹이를 다시 생성하고 뱀 길이를 늘린다
  generatefood2();
  snake2.size += 10;
  } 
};

// 캔버스 그리기 함수
function draw() {
  // 캔버스 지우기
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  //// 뱀 그리기
  //ctx2.fillStyle = snake2.color;
  //ctx2.fillRect(snake2.x, snake2.y, snake2.size, snake2.size);

  // 뱀 꼬리 그리기
  ctx2.fillStyle = snake2.color;
  snake2.tail.forEach(function(tailPart) {
    ctx2.fillRect(tailPart.x, tailPart.y, snake2.size, snake2.size);
  });
  // 뱀 머리 그리기
  ctx2.fillRect(snake2.x, snake2.y, snake2.size, snake2.size);

  // 음식 그리기
  ctx2.fillStyle = food2.color;
  ctx2.fillRect(food2.x, food2.y, food2.size, food2.size);
}

// 게임 루프
function gameLoop() {
  // 뱀 이동
  movesnake2();

  // 캔버스 그리기
  draw();

  // 게임 루프 재귀 호출
  requestAnimationFrame(gameLoop);
}

// 키보드 이벤트 핸들러 등록
document.addEventListener("keydown", function(event) {
  switch(event.keyCode) {
    case 37: // left arrow
      dx = -1;
      dy = 0;
      break;
    case 38: // up arrow
      dx = 0;
      dy = -1;
      break;
    case 39: // right arrow
      dx = 1;
      dy = 0;
      break;
    case 40: // down arrow
      dx = 0;
      dy = 1;
      break;
  }
});

// 게임 시작 시 음식 생성
generatefood2();

// 게임 루프 시작
gameLoop();

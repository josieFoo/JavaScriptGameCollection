// 필요한 타입과 상수들을 정의합니다.
type Direction = 'Up' | 'Down' | 'Left' | 'Right';
type Position = { x: number, y: number };
type Snake = Position[];
type Food = Position;

const CANVAS_SIZE: number = 500;
const CELL_SIZE: number = 20;
const MAX_CELLS: number = CANVAS_SIZE / CELL_SIZE;
const INITIAL_SNAKE_LENGTH: number = 3;

// 캔버스 요소와 컨텍스트를 가져옵니다.
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// 초기화
let direction: Direction = 'Right';
let snake: Snake = [];
let food: Food;

// 스네이크 초기 위치를 생성합니다.
for (let i = INITIAL_SNAKE_LENGTH - 1; i >= 0; i--) {
  snake.push({ x: i, y: 0 });
}

// 새로운 음식을 생성합니다.
function createFood(): void {
  food = {
    x: Math.floor(Math.random() * MAX_CELLS),
    y: Math.floor(Math.random() * MAX_CELLS)
  };
  // 스네이크와 음식이 겹치지 않도록 처리합니다.
  if (snake.some(cell => cell.x === food.x && cell.y === food.y)) {
    createFood();
  }
}

// 게임 루프를 생성합니다.
function gameLoop(): void {
  // 스네이크의 머리 위치를 기반으로 다음 위치를 계산합니다.
  const head = { x: snake[0].x + (direction === 'Left' ? -1 : direction === 'Right' ? 1 : 0), y: snake[0].y + (direction === 'Up' ? -1 : direction === 'Down' ? 1 : 0) };
  // 게임이 종료되는 조건을 처리합니다.
  if (head.x < 0 || head.x >= MAX_CELLS || head.y < 0 || head.y >= MAX_CELLS || snake.some(cell => cell.x === head.x && cell.y === head.y)) {
    alert('Game Over!');
    return;
  }
  // 스네이크의 머리를 추가하고 꼬리를 제거합니다.
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    // 음식을 먹으면 스네이크 길이를 증가시킵니다.
    createFood();
  } else {
    snake.pop();
  }
  // 벽을 그립니다.
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, CANVAS_SIZE, CELL_SIZE);
  ctx.fillRect(0, CANVAS_SIZE - CELL_SIZE, CANVAS_SIZE, CELL_SIZE);
  ctx.fillRect(0, 0, CELL_SIZE, CANVAS_SIZE);
  ctx.fillRect(CANVAS_SIZE - CELL_SIZE, 0, CELL_SIZE, CANVAS_SIZE);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // 캔버스를 지우고 스네이크와 음식을 그립니다.
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  ctx.fillStyle = 'black';
  snake.forEach(cell => ctx.fillRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE));
  // 스네이크를 그립니다.
  ctx.fillStyle = 'green';
  snake.forEach(cell => {
    ctx.fillRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  });

  // 게임 루프를 호출합니다.
  requestAnimationFrame(gameLoop);
}

setInterval(() => {
    gameLoop();
  }, 270000);  

// 초기 음식 생성
createFood();
// 게임 루프 시작
gameLoop();
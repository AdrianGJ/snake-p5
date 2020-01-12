let canvasP5 = new p5(p => {
  const TILE_SIZE = 15;
  const width = 40;
  const height = 40;

  let snakeColor;
  let appleColor;

  let snake;
  let inputBuffer;

  let apple;
  let direction; // clockwise

  p.setup = () => {
    canvas = p.createCanvas(width * TILE_SIZE, height * TILE_SIZE);
    p.frameRate(15);
    p.colorMode(p.RGB);
    snakeColor = p.color(0, 0, 0);
    appleColor = p.color(255, 0, 0);
    p.noStroke();
    initGame();
  };

  p.draw = () => {
    p.clear();
    calculateSnakeMovement();
    drawBuffer();
    drawApple();
  };

  p.keyPressed = () => {
    if (p.keyCode === p.UP_ARROW && direction !== 2) inputBuffer.push(0);
    if (p.keyCode === p.RIGHT_ARROW && direction !== 3) inputBuffer.push(1);
    if (p.keyCode === p.DOWN_ARROW && direction !== 0) inputBuffer.push(2);
    if (p.keyCode === p.LEFT_ARROW && direction !== 1) inputBuffer.push(3);
  };

  const initGame = () => {
    snake = [
      [0, 0],
      [1, 0],
      [2, 0]
    ];
    inputBuffer=[];
    direction = 1;
    createApple();
  };

  const drawBuffer = () => {
    p.fill(snakeColor);
    snake.forEach(drawSquare);
  };

  const createApple = () => {
    do {
      apple = [randomNumber(width), randomNumber(height)];
    } while (positionOccupied(apple));
  };

  const drawApple = () => {
    p.fill(appleColor);
    drawSquare(apple);
  };

  const drawSquare = ([x, y]) => {
    p.square(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE);
  };

  const calculateSnakeMovement = () => {
    const newHead = getNewHead();

    if (positionOccupied(newHead) || outOfBoundaries(newHead)) {
      initGame();
      return;
    }

    snake.push(newHead);
    if (equals(newHead, apple)) {
      createApple();
    } else {
      snake.shift();
    }
  };

  const getNewHead = () => {
    const head = snake[snake.length - 1];
    const input = inputBuffer.shift();
    direction = input === undefined ? direction : input;
    if (direction === 0) return [head[0], head[1] - 1];
    if (direction === 1) return [head[0] + 1, head[1]];
    if (direction === 2) return [head[0], head[1] + 1];
    if (direction === 3) return [head[0] - 1, head[1]];
  };

  const positionOccupied = position => {
    return snake.find(p => equals(p, position));
  };

  const outOfBoundaries = position => {
    return (
      position[0] < 0 ||
      position[0] >= width ||
      position[1] < 0 ||
      position[1] >= height
    );
  };

  const equals = (p1, p2) => {
    return p1[0] === p2[0] && p1[1] === p2[1];
  };

  const randomNumber = max => {
    return Math.floor(Math.random() * max);
  };
}, "p5-canvas");

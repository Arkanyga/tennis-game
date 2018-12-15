
const PADDLE_HEIGHT = 100,
  PADDLE_THICKNESS = 10,
  WINNING_SCORE = 2,
  canvas = document.getElementById('gameCanvas'),
  canvasContext = canvas.getContext('2d');


let ballX = canvas.width / 2,
  ballY = canvas.height / 2,
  speedX = 5,
  ballSpeedX = speedX,
  ballSpeedY = 0,
  paddle1Y = 250,
  paddle2Y = 250,
  computerSpeed = 4,
  ballRadius = 10,
  isWin = false,
  rightPlayerScore = 0,
  leftPlayerScore = 0;


window.onload = function () {
  canvas.addEventListener('mousemove', function (e) {
    let mousePos = calculateMousePos(e);
    paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
  })
  canvas.addEventListener('click', function () {
    if (!isWin) {
      return;
    }
    isWin = false;
    rightPlayerScore = 0;
    leftPlayerScore = 0;
    ballSpeedX = speedX;
  });
  let framesPerSecond = 60;
  setInterval(function () {
    moveEverething();
    drawEverething();

  }, 1000 / framesPerSecond);

}

function drawEverething() {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  for (let i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, 'white')
  }
  //circle
  colorCircle(ballX, ballY, ballRadius, 'white');
  //left paddle
  colorRect(0, paddle1Y, PADDLE_THICKNESS, 100, 'white');
  //right paddle
  colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, 100, 'white');
  if (isWin) {
    canvasContext.fillStyle = 'white';
    if (leftPlayerScore === WINNING_SCORE) {
      canvasContext.fillText('You Won!', 100, 100);
    } else if (rightPlayerScore === WINNING_SCORE) {
      canvasContext.fillText('Computer Won!', canvas.width - 200, 200);
    }
    canvasContext.fillText('click to continue', 300, 410);
    return
  }
  drawScore();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}


function moveEverething() {
  moveComputerPaddle();
  if (ballX > canvas.width - ballRadius) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX *= -1;
      let deltaY = ballY - (paddle2Y + (PADDLE_HEIGHT / 2));
      ballSpeedY = deltaY * 0.2;
    } else {
      leftPlayerScore++;
      if (leftPlayerScore === WINNING_SCORE) {
        startPosition();
      }
      ballReset();
    }
  }

  if (ballX < ballRadius) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX *= -1;
      let deltaY = ballY - (paddle1Y + (PADDLE_HEIGHT / 2));
      ballSpeedY = deltaY * 0.2;
    } else {
      rightPlayerScore++;
      if (rightPlayerScore === WINNING_SCORE) {
        startPosition()
      }
      ballReset();

    }
  }
  if (ballY > canvas.height - ballRadius || ballY < ballRadius) {
    ballSpeedY *= -1;
  }
  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

function calculateMousePos(e) {
  let rect = canvas.getBoundingClientRect(), root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  }
}

function ballReset() {
  let newSpeed = ballSpeedX;
  ballCenter()
  setTimeout(function () {
    ballSpeedX = -1 * newSpeed;
  }, 700)
}

function drawScore() {
  canvasContext.font = "20px Arial";
  canvasContext.fillStyle = "#0095DD";
  canvasContext.fillText("Score: " + leftPlayerScore, 100, 100);
  canvasContext.fillText("Score: " + rightPlayerScore, canvas.width - 200, 100);
}

function moveComputerPaddle() {
  if (ballY > (paddle2Y + PADDLE_HEIGHT / 2) + 30) {
    paddle2Y += computerSpeed;
  }
  if (ballY < (paddle2Y + PADDLE_HEIGHT / 2) - 30) {
    paddle2Y -= computerSpeed;
  }
}

function startPosition() {
  isWin = true;
  ballCenter()
  paddle1Y = 250;
  paddle2Y = 250;
}

function ballCenter() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 0;
  ballSpeedY = 0;
}


const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const ball = document.getElementById("ball");
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("start-button");

const gameContainer = document.querySelector(".game-container");
const containerWidth = gameContainer.clientWidth;
const containerHeight = gameContainer.clientHeight;

let player1Y = containerHeight / 2 - 50;
let player2Y = containerHeight / 2 - 50;
let ballX = containerWidth / 2 - 10;
let ballY = containerHeight / 2 - 10;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Score = 0;
let player2Score = 0;
let gameActive = false;

function updateGame() {
    player1.style.top = player1Y + "px";
    player2.style.top = player2Y + "px";
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    if (gameActive) {
        // Ball movement
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Ball collision with top and bottom walls
        if (ballY <= 0 || ballY + 20 >= containerHeight) {
            ballSpeedY = -ballSpeedY;
        }

        // Ball collision with paddles
        if (
            (ballX <= 20 && ballY + 20 >= player1Y && ballY <= player1Y + 100) ||
            (ballX + 20 >= containerWidth - 20 &&
                ballY + 20 >= player2Y &&
                ballY <= player2Y + 100)
        ) {
            ballSpeedX = -ballSpeedX;
        }

        // Ball out of bounds
        if (ballX < 0) {
            player2Score++;
            resetBall();
        } else if (ballX + 20 > containerWidth) {
            player1Score++;
            resetBall();
        }

        // Update the score
        scoreElement.textContent = `Player 1: ${player1Score} | Player 2: ${player2Score}`;
    }

    // Game loop
    requestAnimationFrame(updateGame);
}

function resetBall() {
    ballX = containerWidth / 2 - 10;
    ballY = containerHeight / 2 - 10;
    ballSpeedX = 5;
    ballSpeedY = 5;
    gameActive = false;
}

function startGame() {
    player1Score = 0;
    player2Score = 0;
    scoreElement.textContent = `Player 1: 0 | Player 2: 0`;
    resetBall();
    gameActive = true;
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && player2Y > 0) {
        player2Y -= 10;
    } else if (event.key === "ArrowDown" && player2Y + 100 < containerHeight) {
        player2Y += 10;
    } else if (event.key === "w" && player1Y > 0) {
        player1Y -= 10;
    } else if (event.key === "s" && player1Y + 100 < containerHeight) {
        player1Y += 10;
    }
});

startButton.addEventListener("click", startGame);

updateGame();

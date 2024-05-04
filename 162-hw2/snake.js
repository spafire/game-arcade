// Create the board/cell for the game and the scoring variables
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY; //food position/location
let snakeX = 25, snakeY = 15; //spawn point
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0; //score corresponds to number of food eaten

// Get high score from local storage
let highScore = 0 || localStorage.getItem("high-score");
highScoreElement.innerText = `High Score: ${highScore}`;

// Pass a random between 1 and 50 as food position
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 50) + 1; //x coordinate
    foodY = Math.floor(Math.random() * 30) + 1; //y coordinate
}

// Clears interval when game is over
const handleGameOver = () => {
    clearInterval(setIntervalId);
    if (gameOver) {
        document.querySelector(".gameOverText").innerHTML = "<h2>Game over!</h2>";
    }
}

// Change velocity value based on key press
const changeDirection = event => {
    if (event.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (event.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (event.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (event.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Change Direction on each key click
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));


//Check for collisions: snake hits wall or its own body
function checkForCollision() {
    // Check snake body is out of wall or no
    if (snakeX <= 0 || snakeX > 50 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // Check snake head hit body or no
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
}

// Initialize game
const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // When snake eats food (ie when the snake and food share the same position)
    if (snakeX === foodX && snakeY === foodY) {
        // Put another food on the screen
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); //Add food to snake body array
        score++;
        highScore = score >= highScore ? score : highScore; // if score > high score => high score = score

        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    // Update Snake Head
    snakeX += velocityX;
    snakeY += velocityY;

    checkForCollision()

    // Add div for each part of snake body
    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }

    // Shifthing forward values of elements in snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];


    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
// Change the direction of the snake correspondingly to the keyboard input
document.addEventListener("keyup", changeDirection);
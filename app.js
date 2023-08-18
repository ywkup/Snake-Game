const canvas = document.getElementById("myCanvas");
const shop1 = document.getElementById("shop1");
const shop2 = document.getElementById("shop2");
const shop3 = document.getElementById("shop3");
const totalPoint = document.getElementById("totalPoint");
const totalApple = document.getElementById("totalApple");
const tryAgain = document.getElementById("tryAgain");
const ctx = canvas.getContext("2d");

let blockSize = 15;
let rows = 35;
let columns = 35;
let direction = "down"; 
let snakeBody = [{ x: 5, y: 5 }]; 
let appPoint = 0;
let gameCurent = true;
let appScore = 0;

let price1 = 2000;
let price2 = 2000;
let price3 = 30;

let entities = [
    { x: 5, y: 5, height: 1, width: 1, color: "green" },
    { x: 10, y: 10, height: 1, width: 1, color: "red" }
];

const snake = entities[0];
let apple = entities[1]; 

document.addEventListener("keydown", handleKeyPress);

function drawSnake() {
    ctx.fillStyle = snake.color;

    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i].x * blockSize, snakeBody[i].y * blockSize, blockSize, blockSize);
    }
}

function drawApple() {
    ctx.fillStyle = apple.color;
    ctx.fillRect(apple.x * blockSize, apple.y * blockSize, apple.width * blockSize, apple.height * blockSize);
}

function drawMap() {
    canvas.height = rows * blockSize;
    canvas.width = columns * blockSize;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function randomApple() {
    apple.x = Math.floor(Math.random() * columns);
    apple.y = Math.floor(Math.random() * rows);
}

function handleKeyPress(event) {
    if (event.key === "ArrowUp" && direction !== "down" && gameCurent === true) {
        direction = "up";
        gameCurent = true;
    } else if (event.key === "ArrowDown" && direction !== "up" && gameCurent === true){
        direction = "down";
        gameCurent = true;
    } else if (event.key === "ArrowLeft" && direction !== "right" && gameCurent === true){
        direction = "left";
        gameCurent = true;
    } else if (event.key === "ArrowRight" && direction !== "left" && gameCurent === true){
        direction = "right";
        gameCurent = true;
    }
}

function movePlayer() {
    let newX = snakeBody[0].x;
    let newY = snakeBody[0].y;

    if (direction === "up") {
        newY -= 1; 
    } else if (direction === "down") {
        newY += 1;
    } else if (direction === "left") {
        newX -= 1;
    } else if (direction === "right") {
        newX += 1;
    }

    if (newX < 0 || newX >= columns || newY < 0 || newY >= rows) {
        gameCurent = false;
        tryAgain.style.display = "block";
    } else {
        snakeBody.pop();
        snakeBody.unshift({ x: newX, y: newY });
        checkSelfCollision();
    }

    eatApple();
}

function eatApple() {
    if (snakeBody[0].x === apple.x && snakeBody[0].y === apple.y) {
        snakeBody.push({ x: apple.x, y: apple.y });
        appPoint += 1;
        totalApple.innerHTML = appPoint;
        randomApple();
    }
}

function getScore(){
    if(gameCurent){
        appScore += 25;
        totalPoint.innerHTML = appScore;
    }
}

function checkCollision() {
    const headX = snakeBody[0].x;
    const headY = snakeBody[0].y;

    if (headX < 0 || headX >= columns || headY < 0 || headY >= rows) {
        gameCurent = false;
    }
}

function resetGame(){
    tryAgain.style.display = "none";

    direction = "down"; 
    snakeBody = [{ x: 5, y: 5 }]; 
    gameCurent = true;

    snake.x = 5;
    snake.y = 5;
    apple.x = 10;
    apple.y = 10;
}

shop1.addEventListener("click", (event) => {
    if (appScore >= price1) {
        let newApp = appScore - price1;
        const randomColor = randomHex();
        totalPoint.innerHTML = newApp;
        snake.color = randomColor;
        appScore = newApp; 
    }
});
shop2.addEventListener("click", (event) => {
    if (appScore >= price2) {
        let newApp = appScore - price2;
        const randomColor = randomHex();
        totalPoint.innerHTML = newApp;
        apple.color = randomColor;
        appScore = newApp;
    }
});
shop3.addEventListener("click", (event) => {
    if (appPoint >= price3){
        let newApp = appPoint - price3;
        totalApple.innerHTML = newApp;
        appPoint = newApp;
        alert("Follow Me On Instagram - Insta : yakupiee");
    }
});


function randomHex(){
    const characters = "0123456789ABCDEF";
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        hexColor += characters[randomIndex];
    }

    return hexColor;
}

function checkSelfCollision() {
    const headX = snakeBody[0].x;
    const headY = snakeBody[0].y;

    for (let i = 1; i < snakeBody.length; i++) {
        if (headX === snakeBody[i].x && headY === snakeBody[i].y) {
            gameCurent = false;
            tryAgain.style.display = "block";
            return;
        }
    }
}



tryAgain.addEventListener("click", (event) => {
    resetGame();
});

function gameLoop() {
    drawMap();
    drawSnake();
    drawApple();
    movePlayer();
    eatApple();
    checkCollision();
    startGame();
}

randomApple();
setInterval(gameLoop, 100);
setInterval(getScore, 500); 
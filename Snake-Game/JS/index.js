// Setting up constants for the game which will stay same throughout and cannot be changed
let inputDir = { x: 0, y: 0 };

const board = document.getElementById('board');

//Defining the required game sounds
// Eating food
let foodSound = new Audio('food.mp3');

// Gameover Sound
let GameOverSound = new Audio('gameover.mp3');

// Moving Sound of the snake
let movesound = new Audio('move.mp3');

//Background music of the game
let musicSound = new Audio('music.mp3');

// Declaring speed variable to render to every 0.5 seconds
let speed = 9;

// Displaying the score
let score = 0;

// Declaring variable for lastPaintTime
let lastPaintTime = 0;

// Defining the Snake Array
let snakeArr = [
    { x: 13, y: 15 }
]

// Creating food
let food = { x: 6, y: 7 };

// Gameloop function is used to paint the screen multiple times while playing 

// Game Functions
// Function representing current time(ctime)
function main(ctime) {
    window.requestAnimationFrame(main);
    // Limiting frames to improve rendering (time in ms)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    // Updating lastPaintTime for ctime 
    lastPaintTime = ctime;
    gameEngine();

    // Printing ctime in console
    // console.log(ctime);
}

// Function to determine the colliding of snake
function isCollide(sarr) {
    // Snake collided with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }

    // Snake collides with the wall
    if (sarr[0].x <= 0 || sarr[0].x >= 18 || sarr[0].y <= 0 || sarr[0].y >= 18) {
        return true;
    }

    return false;
}

// Function created in two parts
function gameEngine() {
    // Part 1 : Updating the snake array
    if (isCollide(snakeArr)) {
        GameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over, Press any key to play again !");
        // Reset the head value of snake
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food then increment the score and regenerate the food 
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hiscore : " + hiscoreval;
        }

        scoreBox.innerHTML = "Score : " + score;
        // unshift adds elements to the start of array 
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

        let a = 2;
        let b = 16;

        // Generating food randomly 
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // Shifting the snake using array
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2 : Rendering / Displaying the snake and food
    // Displaying the Snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        // Adding css of snake using JS
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        // adding the food class to snake
        // snakeElement.classList.add('snake');

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        // Adding snake to board element
        board.appendChild(snakeElement);
    });

    // Displaying the food 
    let foodElement = document.createElement('div');
    // Adding css of food using JS
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    // adding the food class to snake
    foodElement.classList.add('food');

    // Adding food to board element
    board.appendChild(foodElement);
}


// Main logic starts here(Preffered method of request animation frame)
let hiscore = localStorage.getItem("hiscore");

// Setting the initial high score value to 0
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hiscore : " + hiscore;
}

window.requestAnimationFrame(main);
musicSound.play();

window.addEventListener('keydown', e => {
    // Start the game 
    inputDir = { x: 0, y: 1 };
    movesound.play();

    // Switch case for determining the direction using the arrow key
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});
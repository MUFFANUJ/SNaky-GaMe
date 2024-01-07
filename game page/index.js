// Game varibles and constants
let inputDir = {x:0 , y:0};
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3')
var choice = document.getElementById('selection');
let speed = 7;

let score = 0;
let lastPainTime = 0;
let snakeArr = [
  {x:13 , y:15},
];
let food = {x:6,y:7};

// Game functons 
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPainTime)/1000 < 1/speed ){
    return;
  }
  lastPainTime = ctime;
  gameEngine();
}


function isCollide(snake){
  // if bumping into ourself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
      return true;
  }
  // if buming to wall
  if (snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <= 0){
    return true;
  }
}

function gameEngine(){
  // updating the snake array & food
  if (isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = {x:0,y:0};
    alert('GAME OVER , PRESS OK/ENTER TO PLAY AGAIN');
    snakeArr = [{x:13,y:15}];
    scoreBox.innerHTML = 'SCORE :0'
    musicSound.play();
    score = 0;
  }

  // if you have eaten the food , increment the score and regenrate the food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y){
    foodSound.play()
    score += 1;
    if (score> highscorevalue){
      highscorevalue = score;
      localStorage.setItem('highscore',JSON.stringify(highscorevalue));
      highScoreBox.innerHTML = 'HIGHSCORE :' + highscorevalue;
    }
    scoreBox.innerHTML = `SCORE : `+ score
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)*Math.random()), y:Math.round(a + (b-a)*Math.random())}
  }

  // moving the snake 
  for (let i = snakeArr.length-2; i >= 0; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
    
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Display the snake 
  board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('button');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

// Main Game Logic 

let highscore = localStorage.getItem('highscore');
if (highscore === null){
  highscorevalue = 0;
  localStorage.setItem('highscore', JSON.stringify(highscorevalue));
} else{
  highscorevalue = JSON.parse(highscore);
  highScoreBox.innerHTML = 'HIGHSCORE :' + highscorevalue;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown' , event => {
  inputDir = {x:0,y:1}; // starts the game and the snakes moves downwards
  moveSound.play();
  musicSound.play();
  switch (event.key) {
    case "ArrowUp":
      console.log('ArrowUp');
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log('ArrowDown');
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log('ArrowLeft');
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log('ArrowRight');
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
})
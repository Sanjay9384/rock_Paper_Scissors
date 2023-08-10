let result = ``;
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};

updateScoreElement();

function resetScore() {
  score.wins = 0;
  score.lose = 0;
  score.ties = 0;
  localStorage.removeItem("score");
}

function pickComputerMove() {
  let computerMove = ``;

  randomNumber = Math.random();
  if ((randomNumber >= 0) & (randomNumber <= 1 / 3)) {
    computerMove = `rock`;
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = `paper`;
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = `Scissors`;
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;


document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame(`rock`);
})

document.querySelector('.js-paper-button').addEventListener('click', () =>{
  playGame(`paper`);
});

document.querySelector('.js-scissors-button').addEventListener('click', () =>{
  playGame('Scissors');
})

document.querySelector('.move-button-rest').addEventListener('click', () =>{
  resetScore();
  updateScoreElement();
})

document.querySelector('.auto-play-button').addEventListener('click', () =>{
  autoPlay();
})

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval( () => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('Scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  if (playerMove == "Scissors") {
    if (computerMove === `Scissors`) {
      result = `tie`;
    } else if (computerMove === `rock`) {
      result = `you lose`;
    } else {
      result = `you win`;
    }
  } else if (playerMove == `rock`) {
    if (computerMove === `rock`) {
      result = `tie`;
    } else if (computerMove === `paper`) {
      result = `you lose`;
    } else {
      result = `you win`;
    }
  } else {
    if (computerMove === `paper`) {
      result = `tie`;
    } else if (computerMove === `Scissors`) {
      result = `you lose`;
    } else {
      result = `you win`;
    }
  }

  if (result === `you win`) {
    score.wins += 1;
  } else if (result === `you lose`) {
    score.lose += 1;
  } else if (result === `tie`) {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = `Result  ${result}`;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="./images/${playerMove}-emoji.png" class="move-icon">
 <img src="./images/${computerMove}-emoji.png"
 class="move-icon">
 Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins: ${score.wins}, Loses: ${score.lose}, Ties: ${score.ties}`;
}

function finalResult() {}

(function(){
    const rockBtn = document.querySelector('.rock-btn');
    const paperBtn = document.querySelector('.paper-btn');
    const scissorBtn = document.querySelector('.scissor-btn');

    paperBtn.addEventListener('click', function() {
      let compMove = getCompMove();
      playRound('paper', compMove);
    });

    rockBtn.addEventListener('click', function() {
      let compMove = getCompMove();
      playRound('rock', compMove);
    });

    scissorBtn.addEventListener('click', function() {
      let compMove = getCompMove();
      playRound('scissors', compMove);
    });
})();

const Scoreboard = {
  player: 0,
  computer: 0
};

const Moves = {
    displayRock: function(mover) {
        mover.src = "images/rock.png";
    },

    displayPaper: function(mover) {
        mover.src = "images/paper.png";
    },

    displayScissors: function(mover) {
        mover.src = "images/scissors.png";
    }
}


function getCompMove () {
    const moves = ['rock', 'paper', 'scissors'];
    let randomNumber = Math.floor(Math.random() * 3 + 1 - 1);
    return moves[randomNumber];
}


function playRound(playerMove, compMove) {
    animate();
    let player = document.querySelector('.player-image');
    let computer = document.querySelector('.comp-image');
    /* setTimeout used to time the image change(rock/paper/scissors) immediately
    after pre-move animation completes */
    setTimeout(function() {
        switch(playerMove) {
            case 'rock':
                Moves.displayRock(player);
                break;
            case 'paper':
                Moves.displayPaper(player);
                break;
            case 'scissors':
                Moves.displayScissors(player);
                break;
        }

        switch(compMove) {
            case 'rock':
                Moves.displayRock(computer);
                break;
            case 'paper':
                Moves.displayPaper(computer);
                break;
            case 'scissors':
                Moves.displayScissors(computer);
                break;
        }
        checkWinner(playerMove, compMove);
    },800)
}


function animate() {
    let playerMove = document.querySelector('.player-image');
    let compMove = document.querySelector('.comp-image');
    // reset images to rock for pre-move animation
    playerMove.src = 'images/rock.png';
    compMove.src = 'images/rock.png';

    let degrees;
    let miliseconds = 0;

    function rotate() {
        if (!degrees) {
          degrees = 15;
        } else if (degrees === 15) {
          degrees = 0;
        } else if (degrees === 0) {
          degrees = 15;
        }

        playerMove.style.transform = 'rotate(' + degrees + 'deg)';
        compMove.style.transform = 'rotate(' + degrees + 'deg)';
    }

    for (let i = 0; i < 6; i++) {
        setTimeout(function() {
          rotate();
        }, miliseconds);
        // makes sure each rotate happens in sequence
        miliseconds += 150;
    }
}

function playerWins() {
    const playerScoreboard = document.querySelector('.player-score');
    const statusText = document.querySelector('.status-text');
    statusText.textContent = "You won the round!";
    Scoreboard.player += 1;
    playerScoreboard.textContent = Scoreboard.player;
}

function computerWins() {
    const compScoreboard = document.querySelector('.comp-score');
    const statusText = document.querySelector('.status-text');
    statusText.textContent = "Computer wins the round";
    Scoreboard.computer += 1;
    compScoreboard.textContent = Scoreboard.computer;
}

function handleDraw() {
    const statusText = document.querySelector('.status-text');
    statusText.textContent = "It's a draw!";
}

function checkWinner(playerMove, compMove) {
    if (playerMove === 'rock') {
        switch(compMove) {
            case 'rock':
                handleDraw();
                break;
            case 'paper':
                computerWins();
                break;
            case 'scissors':
                playerWins();
                break;
        }
    } else if (playerMove === 'paper') {
        switch(compMove) {
            case 'rock':
                playerWins();
                break;
            case 'paper':
                handleDraw();
                break;
            case 'scissors':
                computerWins();
                break;
        }
    } else if (playerMove === 'scissors') {
        switch(compMove) {
            case 'rock':
                computerWins();
                break;
            case 'paper':
                playerWins();
                break;
            case 'scissors':
                handleDraw();
                break;
        }
    }
    // check for match completion
    matchStatus();
}


function matchStatus () {
  if (Scoreboard.player === 5 || Scoreboard.computer === 5) {
    getWinner(Scoreboard.player, Scoreboard.computer);
    resetGame();
  }
}


function getWinner(playerScore, compScore) {
    const statusText = document.querySelector('.status-text');

    if (playerScore > compScore) {
      statusText.textContent =  'You won the match!';
    } else {
      statusText.textContent =  'Computer wins the match';
    }
}

function resetGame() {
    const compScoreboard = document.querySelector('.comp-score');
    const playerScoreboard = document.querySelector('.player-score');

    Scoreboard.player = 0;
    Scoreboard.computer = 0;
    playerScoreboard.textContent = 0;
    compScoreboard.textContent = 0;
}

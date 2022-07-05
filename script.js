const fields = document.querySelectorAll('.board > div');
const resultText = document.createElement('div');
const infoText = document.querySelector('.game-info');
const playerTurn = document.querySelector('.player-turn');
const playAgain = document.createElement('button');
playAgain.innerText = 'Restart';
playAgain.classList.add('play-again-btn');
infoText.append(playAgain);

let board = [[], [], []];
let emptyFields = 9;
let gameOver = false;
let player = 'x';

fields.forEach(field => {
    field.addEventListener('click', e => {
        if (!gameOver) {
            if (field.innerText) {
                alert('Not allowed!');
            } else {
                emptyFields--;
                let i = field.className.split('-')[0];
                let j = field.className.split('-')[1];
                board[i][j] = player;
                field.innerText = player;
                if (checkWinner(player, board, emptyFields) === player) {
                    resultText.innerText = `Player ${player.toUpperCase()} won the game!`;
                    infoText.append(resultText);
                    gameOver = true;
                    infoText.append(playAgain);
                    playAgain.innerText = 'Play again';
                    playerTurn.innerText = '';
                } else if (checkWinner(player, board, emptyFields) === 'tie') {
                    resultText.innerText = `It's a tie!`;
                    infoText.append(resultText);
                    gameOver = true;
                    infoText.append(playAgain);
                    playAgain.innerText = 'Play again';
                    playerTurn.innerText = '';
                }
                if (!gameOver) {
                    playerTurn.innerText = player === 'x' ? 'Player O\'s turn' : 'Player X\'s turn';
                    player = changePlayer(player);
                } else {
                    playerTurn.innerText = '';
                }
            }
        } else {
            return;
        }
    })
});

function changePlayer(player) {
    return player === 'x' ? 'o' : 'x';
}

function checkWinner(player, board, emptyFields) {
    if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] === player) {
        return player;
    } else if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] === player) {
        return player;
    } else if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] === player) {
        return player;
    } else if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] === player) {
        return player;
    } else if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] === player) {
        return player;
    } else if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] === player) {
        return player;
    } else if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] === player) {
        return player;
    } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] === player) {
        return player;
    } else if (emptyFields === 0) {
        return 'tie';
    }
}

playAgain.addEventListener('click', e => {
    board = [[], [], []];
    emptyFields = 9;
    gameOver = false;
    player = 'x';
    resultText.remove();
    fields.forEach(field => {
        field.innerText = '';
    })
    playerTurn.innerText = 'Player X\'s turn';
    playAgain.innerText = 'Restart';
});

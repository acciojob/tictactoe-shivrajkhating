//your JS code here. If required.
const submitBtn = document.getElementById('submit');
const boardDiv = document.getElementById('board');
const playerForm = document.getElementById('player-form');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

submitBtn.addEventListener('click', () => {
    player1 = document.getElementById('player-1').value.trim();
    player2 = document.getElementById('player-2').value.trim();
    if(player1 && player2) {
        currentPlayer = player1;
        playerForm.style.display = 'none';
        boardDiv.style.display = 'block';
        messageDiv.textContent = `${currentPlayer}, you're up!`;
    } else {
        alert('Please enter both player names.');
    }
});

function checkWinner() {
    for(let combination of winningCombinations) {
        const [a, b, c] = combination;
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            messageDiv.textContent = `${currentPlayer} congratulations, you won!`;
            gameActive = false;
            return;
        }
    }
    if(!board.includes('')) {
        messageDiv.textContent = "It's a tie!";
        gameActive = false;
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.id - 1;
        if(board[index] === '' && gameActive) {
            board[index] = currentPlayer === player1 ? 'X' : 'O';
            cell.textContent = board[index];
            checkWinner();
            if(gameActive) {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                messageDiv.textContent = `${currentPlayer}, you're up!`;
            }
        }
    });
});

resetBtn.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = player1;
    gameActive = true;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
});

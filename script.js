const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const setupDiv = document.getElementById('setup-view');
const gameDiv = document.getElementById('game-view');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1, player2, currentPlayer;
let turn = 1; // 1 for Player 1, 2 for Player 2
let gameActive = true;

// 1. Setup Game
submitBtn.addEventListener('click', () => {
    player1 = player1Input.value || "Player 1";
    player2 = player2Input.value || "Player 2";
    
    currentPlayer = player1;
    setupDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    messageDiv.innerText = `${currentPlayer}, you're up`;
});

// 2. Game Play Logic
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.innerText !== "" || !gameActive) return;

        if (turn === 1) {
            cell.innerText = "x";
            if (checkWin("x")) {
                messageDiv.innerText = `${player1} congratulations you won!`;
                gameActive = false;
            } else {
                currentPlayer = player2;
                turn = 2;
                messageDiv.innerText = `${currentPlayer}, you're up`;
            }
        } else {
            cell.innerText = "o";
            if (checkWin("o")) {
                messageDiv.innerText = `${player2} congratulations you won!`;
                gameActive = false;
            } else {
                currentPlayer = player1;
                turn = 1;
                messageDiv.innerText = `${currentPlayer}, you're up`;
            }
        }
    });
});

// 3. Win Condition Check
function checkWin(symbol) {
    const winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Horizontal
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Vertical
        [1, 5, 9], [3, 5, 7]             // Diagonal
    ];

    return winPatterns.some(pattern => {
        return pattern.every(id => {
            return document.getElementById(id.toString()).innerText === symbol;
        });
    });
}
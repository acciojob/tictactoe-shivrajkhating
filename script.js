// script.js — stable, fixed version

document.addEventListener("DOMContentLoaded", () => {
  const p1Input = document.getElementById("player-1");
  const p2Input = document.getElementById("player-2");
  const submitBtn = document.getElementById("submit");

  const inputSection = document.querySelector(".input-section");
  const gameSection = document.querySelector(".game-section");
  const message = document.querySelector(".message");
  const cells = Array.from(document.querySelectorAll(".cell"));

  let player1 = "";
  let player2 = "";
  let currentPlayer = "X";
  let currentName = "";
  let gameOver = false;

  const winPatterns = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ];

  // helper: reset board UI and state
  function resetBoardState() {
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("winner");
    });
    currentPlayer = "X";
    gameOver = false;
  }

  // start game when submit clicked
  submitBtn.addEventListener("click", () => {
    player1 = p1Input.value.trim();
    player2 = p2Input.value.trim();

    if (!player1 || !player2) {
      alert("Please enter both player names!");
      return;
    }

    // show/hide sections
    inputSection.classList.add("hidden");
    gameSection.classList.remove("hidden");

    // reset any previous game
    resetBoardState();

    // set initial player and message
    currentName = player1;
    message.innerText = `${currentName}, you're up`;
  });

  // attach click listeners to cells (safe to attach once)
  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      // ignore clicks if game not started (gameSection hidden) or game over
      if (gameSection.classList.contains("hidden") || gameOver) return;

      // ignore if cell already filled
      if (cell.textContent !== "") return;

      // place mark
      cell.textContent = currentPlayer;

      // check for winner
      if (checkWinner()) {
        message.innerText = `${currentName}, congratulations you won!`;
        gameOver = true;
        return;
      }

      // check for draw (all cells filled)
      const allFilled = cells.every(c => c.textContent !== "");
      if (allFilled) {
        message.innerText = `It's a draw!`;
        gameOver = true;
        return;
      }

      // switch turns
      switchPlayer();
    });
  });

  function switchPlayer() {
    if (currentPlayer === "X") {
      currentPlayer = "O";
      currentName = player2;
    } else {
      currentPlayer = "X";
      currentName = player1;
    }
    message.innerText = `${currentName}, you're up`;
  }

  function checkWinner() {
    // returns true if currentPlayer has any winning pattern
    const mark = currentPlayer;
    const hasWon = winPatterns.some(pattern => {
      return pattern.every(id => {
        const el = document.getElementById(String(id));
        return el && el.textContent === mark;
      });
    });

    // optional: highlight winning cells if there is a winner
    if (hasWon) {
      winPatterns.forEach(pattern => {
        if (pattern.every(id => {
          const el = document.getElementById(String(id));
          return el && el.textContent === mark;
        })) {
          pattern.forEach(id => {
            const el = document.getElementById(String(id));
            if (el) el.classList.add("winner");
          });
        }
      });
    }

    return hasWon;
  }

  // Expose a small restart helper: press 'r' to restart the board (optional)
  document.addEventListener("keydown", (e) => {
    if (e.key === "r" || e.key === "R") {
      // only allow restart if game has started
      if (!gameSection.classList.contains("hidden")) {
        resetBoardState();
        currentName = (currentPlayer === "X") ? player1 : player2;
        message.innerText = `${currentName}, you're up`;
        gameOver = false;
      }
    }
  });

});

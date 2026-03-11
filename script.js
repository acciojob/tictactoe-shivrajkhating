let player1, player2
let currentPlayer = "X"
let board = ["","","","","","","","",""]
let gameActive = false

const cells = document.querySelectorAll(".cell")
const statusText = document.getElementById("status")

const winConditions = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

function startGame(){

player1 = document.getElementById("p1").value
player2 = document.getElementById("p2").value

if(player1=="" || player2==""){
alert("Enter both player names")
return
}

gameActive = true
statusText.innerText = player1 + ", you're up"

cells.forEach(cell=>{
cell.addEventListener("click",cellClick)
})

}

function cellClick(){

const index = this.dataset.index

if(board[index] !== "" || !gameActive) return

board[index] = currentPlayer
this.innerText = currentPlayer

checkWinner()

}

function checkWinner(){

let roundWon = false

for(let i=0;i<winConditions.length;i++){

const [a,b,c] = winConditions[i]

if(board[a]=="" || board[b]=="" || board[c]=="") continue

if(board[a]===board[b] && board[b]===board[c]){

roundWon = true

cells[a].classList.add("win")
cells[b].classList.add("win")
cells[c].classList.add("win")

break
}

}

if(roundWon){

let winner = currentPlayer=="X" ? player1 : player2

statusText.innerText = winner + ", congratulations you won!"

gameActive=false
return
}

currentPlayer = currentPlayer=="X" ? "O" : "X"

let next = currentPlayer=="X" ? player1 : player2

statusText.innerText = next + ", you're up"

}
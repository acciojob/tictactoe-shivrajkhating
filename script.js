let player1="";
let player2="";
let currentPlayer="X";
let gameActive=true;

let board=["","","","","","","","",""];

const submitBtn=document.getElementById("submit");
const message=document.querySelector(".message");
const gameDiv=document.querySelector(".game");
const inputs=document.getElementById("player-inputs");
const cells=document.querySelectorAll(".cell");

submitBtn.addEventListener("click",()=>{

player1=document.getElementById("player-1").value;
player2=document.getElementById("player-2").value;

inputs.style.display="none";
gameDiv.style.display="block";

message.innerText=player1 + ", you're up";

});

cells.forEach(cell=>{
cell.addEventListener("click",handleClick);
});

function handleClick(e){

let id=e.target.id-1;

if(board[id]!=="" || !gameActive) return;

board[id]=currentPlayer;
e.target.innerText=currentPlayer;

checkWinner();

currentPlayer=currentPlayer==="X"?"O":"X";

if(gameActive){
message.innerText=(currentPlayer==="X"?player1:player2) + ", you're up";
}

}

function checkWinner(){

const winPatterns=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

for(let pattern of winPatterns){

let a=pattern[0];
let b=pattern[1];
let c=pattern[2];

if(board[a] && board[a]===board[b] && board[a]===board[c]){

gameActive=false;

let winner = board[a]==="X" ? player1 : player2;

message.innerText=winner + " congratulations you won!";

return;
}

}

}
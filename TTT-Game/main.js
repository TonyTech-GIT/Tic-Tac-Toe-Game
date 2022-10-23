const PLAYER_X = "X";
const PLAYER_O = "O";
const tiles = document.querySelectorAll(".tile");
let turn = PLAYER_X;

let gameBoard = Array(tiles.length);
gameBoard.fill(null);
// console.log(gameBoard);

// Elements
const strike = document.getElementById("strike");
const gameArea = document.getElementById("game-area");
const gameAreaText = document.getElementById("gameAreaText");
const startOver = document.getElementById("reset");
startOver.addEventListener("click", gameStart);
// event listener here....

// sounds...
const clickSound = new Audio("./sounds2/click.wav");
const gameOverSound = new Audio("./sounds2/game_over.wav");

// Hover function...
function hoverPreview() {
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const preview = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(preview);
    }
  });
}

hoverPreview();

// button Click..
tiles.forEach((tile) => tile.addEventListener("click", buttonClicked));

function buttonClicked(e) {
  if (gameArea.classList.contains("visible")) {
    return;
  }

  var tile = e.target;
  var tileIndex = tile.dataset.index;
  if (tile.innerText != "") {
    return;
  }

  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X;
    gameBoard[tileIndex - 1] = PLAYER_X; // Our index starts from 1 and an array is meant to start from zero.

    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O;
    gameBoard[tileIndex - 1] = PLAYER_O;
    turn = PLAYER_X;
  }

  clickSound.play();

  hoverPreview();
  checkWinner();
}

// Checking Winner..
function checkWinner() {
  for (const winningCode of winningCodes) {
    const { code, strikeClass } = winningCode;
    // console.log(winningCode);

    const tileValue1 = gameBoard[code[0] - 1];
    const tileValue2 = gameBoard[code[1] - 1];
    const tileValue3 = gameBoard[code[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass);
      resultDisplay(tileValue1);
      return;
    }
  }

  //    Draw..
  const allTiles = gameBoard.every((tile) => tile !== null);
  if (allTiles) {
    resultDisplay(null);
  }
}

function resultDisplay(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Winner is ${winnerText}!`;
  }
  gameArea.className = "visible";
  gameAreaText.innerText = text;
  gameOverSound.play();
}

// Reset..

function gameStart() {
  strike.className = "strike";
  gameArea.className = "hidden";
  tiles.forEach((tile) => (tile.innerText = ""));
  gameBoard.fill(null);
  turn = PLAYER_X;
  hoverPreview();
}
const winningCodes = [
  { code: [1, 2, 3], strikeClass: "strike-row-1" },
  { code: [4, 5, 6], strikeClass: "strike-row-2" },
  { code: [7, 8, 9], strikeClass: "strike-row-3" },

  { code: [1, 4, 7], strikeClass: "strike-col-1" },
  { code: [2, 5, 8], strikeClass: "strike-col-2" },
  { code: [3, 6, 9], strikeClass: "strike-col-3" },

  { code: [1, 5, 9], strikeClass: "strike-diag-1" },
  { code: [3, 5, 7], strikeClass: "strike-diag-2" },
];

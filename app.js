// VARIABLES
let game;
let cellMap = {};
let rows = 3;
let cols = 3;
let clickCount;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// GAME OBJECTS
class Game {
  playerOne;
  playerTwo;
  currentPlayer;
  isPlayerTwoComputer = false;
  defaultPlayerOneName = `Player One`;
  defaultPlayerTwoName = `Player Two`;
}

class Player {
  playerName;
  playerMark;

  constructor(playerName, playerMark) {
    this.playerName = playerName;
    this.playerMark = playerMark;
  }
}

class Cell {
  cellId;
  value;
  isAvailable = true;

  constructor(cellId) {
    this.cellId = cellId;
  }
}

// BOARD FUNCTIONS
const createBoard = () => {
  for (let i = 0; i < rows * cols; i++) {
    const board = document.getElementById(`board`);
    const cell = document.createElement(`div`);

    cell.classList.add(`cell`);
    cell.id = i;
    board.append(cell);

    cellMap[i] = new Cell(i);
  }
};

const startNewGame = () => {
  game = new Game();
  clickCount = rows * cols;
  startButton.disabled = true;
  startButton.style.backgroundColor = `lightgray`;

  resetBoard();
  enableBoardClick();
  setPlayersNames();
};

const handleBoardClick = (e) => {
  let currentCell = cellMap[e.target.id];

  if (currentCell.isAvailable) {
    currentCell.value = game.currentPlayer.playerMark;
    e.target.innerText = game.currentPlayer.playerMark;
    currentCell.isAvailable = false;
    clickCount--;
  } else {
    return;
  }

  checkWinner();
};

const resetGame = () => {
  startButton.disabled = false;
  startButton.style.backgroundColor = `forestgreen`;
  message.innerText = `Press Start to Play`;

  for (const cell of cells) {
    cell.innerText = ``;
    cell.style = `white`;
  }

  resetBoard();
  enableBoardClick();
};

const resetBoard = () => {
  for (const cell of Object.values(cellMap)) {
    cell.isAvailable = true;
    cell.value = null;
  }
};

const enableBoardClick = () => {
  for (const cell of cells) {
    cell.addEventListener(`click`, handleBoardClick);
  }
};

const disableBoardClick = () => {
  for (const cell of cells) {
    cell.removeEventListener(`click`, handleBoardClick);
  }
};

createBoard();

//  PLAYER FUNCTIONS
const setPlayersNames = () => {
  let playerOneName = playerOneNameInput.value
    ? playerOneNameInput.value
    : game.defaultPlayerOneName;
  let playerTwoName = playerTwoNameInput.value
    ? playerTwoNameInput.value
    : game.defaultPlayerTwoName;

  if (gameModeSelect.value === `computer`) {
    game.isPlayerTwoComputer = true;
    playerTwoName = `Computer`;
  }

  game.playerOne = new Player((playerName = playerOneName), (playerMark = `X`));
  game.playerTwo = new Player((playerName = playerTwoName), (playerMark = `O`));

  handlePlayersTurns();
};

const handlePlayersTurns = () => {
  if (clickCount === 9) {
    game.currentPlayer =
      Math.floor(Math.random() * 2) === 0 ? game.playerOne : game.playerTwo;

    message.innerText = `${game.currentPlayer.playerName} starts first`;
  } else {
    game.currentPlayer =
      game.currentPlayer === game.playerTwo ? game.playerOne : game.playerTwo;

    message.innerText = `${game.currentPlayer.playerName}'s turn`;
  }

  if (
    game.isPlayerTwoComputer === true &&
    game.currentPlayer === game.playerTwo
  ) {
    disableBoardClick();
    setTimeout(handleComputerPlayerTurn, 800);
  }
};

const handleComputerPlayerTurn = () => {
  let openCells = [];

  for (const cell of Object.values(cellMap)) {
    if (cell.isAvailable) openCells.push(cell);
  }

  let randomCell = openCells[Math.floor(Math.random() * openCells.length)];
  randomCell.value = 'O';
  document.getElementById(randomCell.cellId).innerText = 'O';
  randomCell.isAvailable = false;
  clickCount--;

  checkWinner();
  enableBoardClick();
};

//  GAME STATE FUNCTIONS
const checkWinner = () => {
  let board = [];

  for (const cell of Object.values(cellMap)) {
    board.push(cell.value);
  }

  for (let i = 0; i < board.length - 1; i++) {
    const checkThree = winConditions[i];
    const a = board[checkThree[0]];
    const b = board[checkThree[1]];
    const c = board[checkThree[2]];
    if (a === null || b === null || c === null) continue;
    if (a === b && b === c) {
      for (const cell of checkThree) {
        document.getElementById(cell).style.color = 'tomato';
      }
      return winnerMessage();
    }
  }

  if (clickCount === 0) return drawMessage();

  handlePlayersTurns();
};

const winnerMessage = () => {
  message.innerText = `${game.currentPlayer.playerName} is the winner!`;
  disableBoardClick();
};

const drawMessage = () => {
  message.innerText = `It's a draw!`;
};

// DOM ELEMENTS
const cells = document.getElementsByClassName(`cell`);
const message = document.getElementById(`message`);

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

const playerOneNameInput = document.getElementById('playerOneName');
const playerTwoNameInput = document.getElementById('playerTwoName');
const gameModeSelect = document.getElementById(`gameModeSelect`);

// EVENT LISTENERS
startButton.addEventListener(`click`, startNewGame);
resetButton.addEventListener(`click`, resetGame);

gameModeSelect.addEventListener(
  `change`,
  () =>
    (playerTwoNameInput.disabled =
      gameModeSelect.value === `computer` ? true : false)
);

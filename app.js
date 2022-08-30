// VARIABLES
let game;
let cellMap = {};
let rows = 3;
let cols = 3;
let clickCount = rows * cols;

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

const createresetGame = () => {
  game = new Game();
  startButton.disabled = true;
  startButton.style.backgroundColor = `lightgray`;

  for (const cell of Object.values(cellMap)) {
    cell.isAvailable = true;
  }

  enableBoardClick();
  setPlayers();
};

const handleBoardClick = (e) => {
  let cellId = e.target.id;
  let currentCell = cellMap[cellId];

  if (currentCell.isAvailable) {
    currentCell.value = game.currentPlayer.playerMark;
    e.target.innerText = game.currentPlayer.playerMark;
    currentCell.isAvailable = false;
    clickCount--;
  } else {
    return;
  }

  if (checkWinner()) {
    gameOver();
    return;
  } else if (clickCount === 0) {
    message.innerText = `It's a draw!`;
    gameOver();
    return;
  }

  game.currentPlayer =
    game.currentPlayer === game.playerTwo ? game.playerOne : game.playerTwo;
  message.innerText = `${game.currentPlayer.playerName}'s turn`;

  if (
    game.isPlayerTwoComputer === true &&
    game.currentPlayer === game.playerTwo
  ) {
    disableBoardClick();
    setTimeout(handleComputerPlayerTurn, 800);
  }
};

const resetGame = () => {
  clickCount = rows * cols;
  startButton.disabled = false;
  startButton.style.backgroundColor = `forestgreen`;
  message.innerText = `Press Start to Play`;

  for (const cell of cells) {
    cell.innerText = ``;
    cell.style = `white`;
  }

  for (const cell of Object.values(cellMap)) {
    cell.isAvailable = true;
    cell.value = null;
    cell.isAvailable = false;
  }

  enableBoardClick();
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
const setPlayers = () => {
  let playerOneName = playerOneNameInput.value;
  let playerTwoName = playerTwoNameInput.value;

  if (gameModeSelect.value === `computer`) {
    game.isPlayerTwoComputer = true;
    playerTwoName = `Computer`;
  }

  playerOneName =
    playerOneName != `` ? playerOneName : game.defaultPlayerOneName;
  playerTwoName =
    playerTwoName != `` ? playerTwoName : game.defaultPlayerTwoName;

  game.playerOne = new Player((playerName = playerOneName), (playerMark = `X`));
  game.playerTwo = new Player((playerName = playerTwoName), (playerMark = `O`));
  game.currentPlayer =
    Math.floor(Math.random() * 2) === 0 ? game.playerOne : game.playerTwo;

  message.innerText = `${game.currentPlayer.playerName} starts first`;

  if (
    game.currentPlayer.playerName === `Computer` &&
    game.isPlayerTwoComputer
  ) {
    disableBoardClick();
    setTimeout(handleComputerPlayerTurn, 800);
  }
};

const handleComputerPlayerTurn = () => {
  let openCells = [];

  for (const cell of Object.values(cellMap)) {
    if (cell.isAvailable) {
      openCells.push(cell);
    }
  }

  let randomCell = openCells[Math.floor(Math.random() * openCells.length)];
  randomCell.value = game.currentPlayer.playerMark;
  document.getElementById(randomCell.cellId).innerText =
    game.currentPlayer.playerMark;
  randomCell.isAvailable = false;
  clickCount--;

  if (checkWinner()) {
    gameOver();
    return;
  } else if (clickCount === 0) {
    message.innerText = `It's a draw!`;
    gameOver();
    return;
  } else if (!checkWinner() && clickCount > 0) {
    game.currentPlayer =
      game.currentPlayer === game.playerTwo ? game.playerOne : game.playerTwo;
    message.innerText = `${game.currentPlayer.playerName}'s turn`;
  }

  enableBoardClick();
};

//  GAME STATE FUNCTIONS
const checkWinner = () => {
  let board = [];

  for (const cell of Object.values(cellMap)) {
    board.push(cell.value);
  }

  if (board[0] === board[1] && board[0] === board[2] && board[0] != null) {
    styleWinner(0, 1, 2);

    return winnerMessage(board[0]);
  } else if (
    board[3] === board[4] &&
    board[3] === board[5] &&
    board[3] != null
  ) {
    styleWinner(3, 4, 5);

    return winnerMessage(board[3]);
  } else if (
    board[6] === board[7] &&
    board[6] === board[8] &&
    board[6] != null
  ) {
    styleWinner(6, 7, 8);

    return winnerMessage(board[6]);
  } else if (
    board[0] === board[3] &&
    board[0] === board[6] &&
    board[0] != null
  ) {
    styleWinner(0, 3, 6);

    return winnerMessage(board[0]);
  } else if (
    board[1] === board[4] &&
    board[1] === board[7] &&
    board[1] != null
  ) {
    styleWinner(1, 4, 7);

    return winnerMessage(board[1]);
  } else if (
    board[2] === board[5] &&
    board[2] === board[8] &&
    board[2] != null
  ) {
    styleWinner(2, 5, 8);

    return winnerMessage(board[2]);
  } else if (
    board[0] === board[4] &&
    board[0] === board[8] &&
    board[0] != null
  ) {
    styleWinner(0, 4, 8);

    return winnerMessage(board[0]);
  } else if (
    board[2] === board[4] &&
    board[2] === board[6] &&
    board[2] != null
  ) {
    styleWinner(2, 4, 6);

    return winnerMessage(board[2]);
  } else {
    return false;
  }
};

const styleWinner = (cell1, cell2, cell3) => {
  document.getElementById(cell1).style.color = `tomato`;
  document.getElementById(cell2).style.color = `tomato`;
  document.getElementById(cell3).style.color = `tomato`;
};

const winnerMessage = (winningValue) => {
  let winningPlayerName = ``;

  winningPlayerName =
    winningValue === game.playerOne.playerMark
      ? game.playerOne.playerName
      : game.playerTwo.playerName;
  message.innerText = `${winningPlayerName} is the winner!`;

  return true;
};

const gameOver = () => {
  for (const cell of Object.values(cellMap)) {
    cell.isAvailable = false;
  }
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
startButton.addEventListener(`click`, createresetGame);
resetButton.addEventListener(`click`, resetGame);

gameModeSelect.addEventListener(
  `change`,
  () =>
    (playerTwoNameInput.disabled =
      gameModeSelect.value === `computer` ? true : false)
);

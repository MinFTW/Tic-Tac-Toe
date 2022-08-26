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
  coordinates;
  value;
  isAvailable = true;

  constructor(cellId) {
    this.cellId = cellId;
  }
}

// FUNCTIONS
let createBoard = () => {
  for (let i = 0; i < rows * cols; i++) {
    let board = document.getElementById(`board`);
    let cell = document.createElement(`div`);

    cell.classList.add(`cell`);
    cell.id = i;
    board.append(cell);

    cellMap[i] = new Cell(i);
  }
};

createBoard();

let onStartClick = () => {
  game = new Game();
  startButton.disabled = true;
  startButton.style.backgroundColor = `lightgray`;

  for (const [key, cell] of Object.entries(cellMap)) {
    cell.isAvailable = true;
  }

  enableBoardClick();
  setPlayers();
};

let setPlayers = () => {
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
    setTimeout(runComputerPlayerTurn, 800);
  }
};

let onBoardClick = (e) => {
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
    setTimeout(runComputerPlayerTurn, 800);
  }
};

let checkWinner = () => {
  let board = [];

  for (const [key, cell] of Object.entries(cellMap)) {
    board.push(cell.value);
  }

  if (board[0] === board[1] && board[0] === board[2] && board[0] != null) {
    for (let i = 0; i < rows; i++) {
      document.getElementById(i).style.color = `tomato`;
    }

    return winnerAnnouncement(board[0]);
  } else if (
    board[3] === board[4] &&
    board[3] === board[5] &&
    board[3] != null
  ) {
    for (let i = 3; i < rows * 2; i++) {
      document.getElementById(i).style.color = `tomato`;
    }

    return winnerAnnouncement(board[3]);
  } else if (
    board[6] === board[7] &&
    board[6] === board[8] &&
    board[6] != null
  ) {
    for (let i = 6; i < rows * 3; i++) {
      document.getElementById(i).style.color = `tomato`;
    }

    return winnerAnnouncement(board[6]);
  } else if (
    board[0] === board[3] &&
    board[0] === board[6] &&
    board[0] != null
  ) {
    for (let i = 0; i < rows * cols; i += 3) {
      document.getElementById(i).style.color = `tomato`;
    }

    return winnerAnnouncement(board[0]);
  } else if (
    board[1] === board[4] &&
    board[1] === board[7] &&
    board[1] != null
  ) {
    for (let i = 1; i < rows * cols; i += 3) {
      document.getElementById(i).style.color = `tomato`;
    }

    return winnerAnnouncement(board[1]);
  } else if (
    board[2] === board[5] &&
    board[2] === board[8] &&
    board[2] != null
  ) {
    for (let i = 2; i < rows * cols; i += 3) {
      document.getElementById(i).style.color = `tomato`;
    }

    return winnerAnnouncement(board[2]);
  } else if (
    board[0] === board[4] &&
    board[0] === board[8] &&
    board[0] != null
  ) {
    for (let i = 0; i < rows * cols; i += 4) {
      document.getElementById(i).style.color = `tomato`;
    }

    return winnerAnnouncement(board[0]);
  } else if (
    board[2] === board[4] &&
    board[2] === board[6] &&
    board[2] != null
  ) {
    for (let i = 2; i < rows * cols - 1; i += 2) {
      document.getElementById(i).style.color = `tomato`;
    }

    return winnerAnnouncement(board[2]);
  } else {
    return false;
  }
};

let winnerAnnouncement = (winningValue) => {
  let winningPlayerName = ``;

  winningPlayerName =
    winningValue === game.playerOne.playerMark
      ? game.playerOne.playerName
      : game.playerTwo.playerName;
  message.innerText = `${winningPlayerName} is the winner!`;

  return true;
};

let runComputerPlayerTurn = () => {
  let openCells = [];

  for (const [key, cell] of Object.entries(cellMap)) {
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

let newGame = () => {
  clickCount = rows * cols;
  startButton.disabled = false;
  startButton.style.backgroundColor = `forestgreen`;
  message.innerText = `Press Start to Play`;

  for (let cell of cells) {
    cell.innerText = ``;
    cell.style = `white`;
  }

  for (const [key, cell] of Object.entries(cellMap)) {
    cell.isAvailable = true;
    cell.value = null;
    cell.isAvailable = false;
  }

  enableBoardClick();
};

let enableBoardClick = () => {
  for (let cell of cells) {
    cell.addEventListener(`click`, onBoardClick);
  }
};

let disableBoardClick = () => {
  for (let cell of cells) {
    cell.removeEventListener(`click`, onBoardClick);
  }
};

let gameOver = () => {
  for (const [key, cell] of Object.entries(cellMap)) {
    cell.isAvailable = false;
  }
};

// DOM ELEMENTS
let cells = document.getElementsByClassName(`cell`);
let message = document.getElementById(`message`);

let startButton = document.getElementById('startButton');
let resetButton = document.getElementById('resetButton');

let playerOneNameInput = document.getElementById('playerOneName');
let playerTwoNameInput = document.getElementById('playerTwoName');
let gameModeSelect = document.getElementById(`gameModeSelect`);

// EVENT LISTENERS
startButton.addEventListener(`click`, onStartClick);
resetButton.addEventListener(`click`, newGame);

gameModeSelect.addEventListener(
  `change`,
  () =>
    (playerTwoNameInput.disabled =
      gameModeSelect.value === `computer` ? true : false)
);

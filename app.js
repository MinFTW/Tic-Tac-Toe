let game;
let cellMap = {};
let rows = 3;
let cols = 3;
let clickCount = rows * cols;


class Game {
    playerOne;
    playerTwo;
    currentPlayer;
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
    coordinates;
    value;
    isAvailable = true;
}


function createBoard() {
    for (let i = 0; i < rows * cols; i++) {
        let cell = document.createElement(`div`);
        let board = document.getElementById(`board`);

        cell.classList.add(`cell`);
        cell.id = i;
        board.append(cell)

        cellMap[i] = new Cell();
    }
}

createBoard();


// HELPER FUNCTIONS
function onStartClick() {
    game = new Game();

    document.getElementById("startButton").disabled = true;
    startButton.style.backgroundColor = `lightgray`;

    let playerOneName = document.getElementById("playerOneName").value;
    let playerTwoName = document.getElementById("playerTwoName").value;
    playerOneName = (playerOneName != ``) ? playerOneName : game.defaultPlayerOneName;
    playerTwoName = (playerTwoName != ``) ? playerTwoName : game.defaultPlayerTwoName;
    
    playerOne = new Player(playerName = playerOneName, playerMark = `X`);
    playerTwo = new Player(playerName = playerTwoName, playerMark = `O`);
    currentPlayer = Math.floor(Math.random() * 2) === 0 ? playerOne : playerTwo;

    game.playerOne = playerOne;
    game.playerTwo = playerTwo;
    game.currentPlayer = currentPlayer;

    for (const [key, cell] of Object.entries(cellMap)) {
        cell.isAvailable = true;
    }
    message.innerText = `${game.currentPlayer.playerName} starts first`;
}


function onBoardClick(e) {
    let cellId = e.target.id;
    let currentCell = cellMap[cellId];
    
    if (currentCell.isAvailable) {
        currentCell.value = game.currentPlayer.playerMark;
        e.target.innerText = game.currentPlayer.playerMark;
        currentCell.isAvailable = false;
        clickCount--;
    }
    else {
        return;
    }

    game.currentPlayer = (game.currentPlayer === game.playerTwo) ? game.playerOne : game.playerTwo;
    message.innerText = `${game.currentPlayer.playerName}'s turn`;

    if (clickCount === 0) {
        message.innerText = `It's a draw!`
        gameOver();
    }

    checkWinner();
};


function checkWinner() {
    if (cellMap[0].value === cellMap[1].value && cellMap[0].value === cellMap[2].value && cellMap[0].value != null) {
        winConditions(cellMap[0].value);
    }
    else if (cellMap[3].value === cellMap[4].value && cellMap[3].value === cellMap[5].value && cellMap[3].value != null) {
        winConditions(cellMap[3].value);
    }
    else if (cellMap[6].value === cellMap[7].value && cellMap[6].value === cellMap[8].value && cellMap[6].value != null) {
        winConditions(cellMap[6].value);
    }
    else if (cellMap[0].value === cellMap[3].value && cellMap[0].value === cellMap[6].value && cellMap[0].value != null) {
        winConditions(cellMap[0].value);
    }
    else if (cellMap[1].value === cellMap[4].value && cellMap[1].value === cellMap[7].value && cellMap[1].value != null) {
        winConditions(cellMap[1].value);
    }
    else if (cellMap[2].value === cellMap[5].value && cellMap[2].value === cellMap[8].value && cellMap[2].value != null) {
        winConditions(cellMap[2].value);
    }
    else if (cellMap[0].value === cellMap[4].value && cellMap[0].value === cellMap[8].value && cellMap[0].value != null) {
        winConditions(cellMap[0].value);
    }
    else if (cellMap[2].value === cellMap[4].value && cellMap[2].value === cellMap[6].value && cellMap[2].value != null) {
        winConditions(cellMap[2].value);
    }
}


function winConditions(winningValue) {
    let winningPlayerName = ``;

    winningPlayerName = (winningValue === game.playerOne.playerMark) ? game.playerOne.playerName : game.playerTwo.playerName
    message.innerText = `${winningPlayerName} is the winner!`;

    gameOver();
}


function gameOver() {
    for (const [key, cell] of Object.entries(cellMap)) {
        cell.isAvailable = false;
    }
}


function newGame() {
    for (let cell of cells) {
        cell.innerText = ``;
    }

    for (const [key, cell] of Object.entries(cellMap)) {
        cell.isAvailable = true;
        cell.value = null;
        cell.isAvailable = false;
    }

    document.getElementById("startButton").disabled = false;
    startButton.style.backgroundColor = `forestgreen`;
    document.getElementById(`playerTwoName`).disabled = false;

    clickCount = rows * cols;

    message.innerText = `Press Start to Play`;
}


function gameMode() {
    if (gameModeSelect.value === `twoPlayer`) {
        document.getElementById(`playerTwoName`).disabled = false;
        return;
    }
    else {
        computerPlayer();
    }
}


function computerPlayer() {
    document.getElementById(`playerTwoName`).disabled = true;


}


// DOM ELEMENTS
let message = document.getElementById(`message`);
let cells = document.getElementsByClassName(`cell`);

let startButton = document.getElementById("startButton");
let resetButton = document.getElementById("resetButton");

let gameModeSelect = document.getElementById(`gameModeSelect`);


// EVENT LISTENERS
for (let cell of cells) {
    cell.addEventListener(`click`, onBoardClick);
}

startButton.addEventListener(`click`, onStartClick)
resetButton.addEventListener(`click`, newGame);

gameModeSelect.addEventListener(`change`, gameMode);


// add computer player
// implement github
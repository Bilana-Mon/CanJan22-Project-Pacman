'use strict';
const WALL = '圓';
const FOOD = '○';
const EMPTY = ' ';
const SUPER_FOOD = '🍻';
const CHERRY = '🍒';

var gIntervalCherry;
var gCount;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

function init() {
    document.querySelector('h1').innerText = 'Pacman';
    document.querySelector('.modal').style.display = 'none';
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gGame.score = 0;
    document.querySelector('span').innerText = '0';
    gCount = 0;
    setInterval(addCherry, 15000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                cell = WALL;
            }
            else gCount++;
            board[i][j] = cell;
        }
    }

    board[1][1] = SUPER_FOOD;
    board[8][1] = SUPER_FOOD;
    board[1][8] = SUPER_FOOD;
    board[8][8] = SUPER_FOOD;

    return board;
}




// update model and dom
function updateScore(diff) {
    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;

}

function gameOver() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    gIntervalGhosts = null;
    gIntervalCherry = null;
    gameOverModal()


}

function gameOverModal() {
    var elH1 = document.querySelector('h1');
    elH1.innerText = 'Game Over!';
    var elDiv = document.querySelector('.modal');
    elDiv.style.display = 'block';
    elDiv.innerHTML = '<button onclick="init(this)">New Game?</button>';
}


function gameVictory() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    gIntervalGhosts = null;
    gIntervalCherry = null;
    VictoryModal();
}



function VictoryModal() {
    var elH1 = document.querySelector('h1');
    elH1.innerText = 'Victory!';
    var elDiv = document.querySelector('.modal');
    elDiv.style.display = 'block';
    elDiv.innerHTML = '<button onclick="init(this)">New Game?</button>';
}



function addCherry() {
    var pos = emptyCells()
    if (!pos) return;
    gBoard[pos.i][pos.j] = CHERRY;
    renderCell(pos, CHERRY);
}

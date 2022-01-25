'use strict';
var PACMAN = `<img src="assets/img/pacmanright.jpg"/>`;

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCellContent === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCellContent === GHOST) {
        var currGhost = removeGhost(nextLocation);
        eatingGhost(currGhost);
    }


    if (nextCellContent === FOOD) collectFood();

    if (nextCellContent === SUPER_FOOD) {
        if (gPacman.isSuper) return;
        makeSuper();
    }


    if (nextCellContent === CHERRY) {
        updateScore(10);
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);
}


function makeSuper() {
    gPacman.isSuper = true;
    setTimeout(resetGhosts, 5000)
}


function collectFood() {
    updateScore(1);
    gCount++
    if (gCount === 56) gameVictory()
}



function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            PACMAN = `<img src="assets/img/pacmandown.jpg"/>`;
            nextLocation.i++;
            break;
        case 'ArrowUp':
            PACMAN = `<img src="assets/img/pacmanup.jpg"/>`;
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            PACMAN = `<img src="assets/img/pacmanleft.jpg"/>`;
            nextLocation.j--;
            break;
        case 'ArrowRight':
            PACMAN = `<img src="assets/img/pacmanright.jpg"/>`;
            nextLocation.j++;
            break;
    }

    return nextLocation;
}

'use strict'
const mine = '💣'
var minesLocation = []




function placeMines(cell) {
    var Loc = cell.className;
    var gCell = getLocation(Loc)
    for (var i = 0; i <= gLevel.MINES; i++) {
        var posI = getRandomIntInclusive(0, gBoard.length - 1)
        var posJ = getRandomIntInclusive(0, gBoard.length - 1)
        minesLocation.push({ i: posI, j: posJ })
        gBoard[posI][posJ].isMine = true
            // renderCell({ i: posI, j: posJ }, mine)
    }

}


/* function markMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine = true) {
                var elCell = document.querySelector(`.cell-${i}-${j}`);
                console.log(elCell)
                elCell.style.display = 'block'

            }
        }
    }
} */

function countNeighbors(cellI, cellJ, mat) {
    var counter = 0
        // var storeNegs = []
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === cellI && j === cellJ) continue
            var currCell = mat[i][j];
            if (currCell.isMine === true) counter++
        }
        return counter;

    }
}
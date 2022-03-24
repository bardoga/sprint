'use strict'

const flag = '🚩'
const player = '😀'
const playerL = '😭'
const HEART = "❤️"
var gBoard;
var secondclick = false
var gInterval;
var gCount = 0;
var heart = document.querySelector('.heart')
    // var mCell;
    // console.log(mCell)

var gLevel = {
    SIZE: 9,
    MINES: 40
}
var gGame = {
    isOn: false,
    showCount: 0,
    markedCount: 0,
    secsPassed: 0

}

function InitGame() {
    // onRightClick()
    // debugger
    gBoard = createMat(gLevel.SIZE)
    console.log(gBoard)
    renderBoard(gBoard, '.board-container')
}


function cellClicked(elCell) {
    //console.log(elCell)
    elCell.classList.remove("notpressed");
    onFirstClick(elCell)
    var Loc = elCell.className;
    var mCell = getLocation(Loc)
    if (gBoard[mCell.i][mCell.j].isMine === true)
        countLives()
    showNegs(elCell);
}

function showNegs(elCell) {
    var Loc = elCell.className;
    var gCell2 = getLocation(Loc)
    console.log(gCell2)
        // debugger
    if (elCell.isMine) gameOver();
    else {
        var count = countNeighbors(gCell2.i, gCell2.j, gBoard)
        switch (count) {
            case 0:
                break
            case 1:
                renderCelltoText(gCell2, '1')
                break;
            case 2:
                renderCelltoText(gCell2, '2')
                break;
            case 3:
                renderCelltoText(gCell2, '3')
                break;
            case 4:
                renderCelltoText(gCell2, '4')
                break;
            case 5:
                renderCelltoText(gCell2, '5')
                break;
            case 6:
                renderCelltoText(gCell2, '6')
                break;
            case 7:
                renderCelltoText(gCell2, '7')
                break;
            case 8:
                renderCelltoText(gCell2, '8')
                break;

        }
    }
}


function gameOver() {
    gGame.isOn = false;
    gCount = 0;
    //heart.innerHTML = "❤️❤️❤️"
    // console.log('You lost')
    stopTimer()
    resetTimer()
    InitGame()
}

function onFirstClick(elCell) {
    startTimer()
    if (gGame.isOn) return
    placeMines(elCell);
    showNegs(elCell);
    gGame.isOn = true;
}



function highlightNegs() {

}

function onRightClick(ev) {
    ev.preventDefault();
    console.log('test')

}


function countLives() {
    gCount++
    console.log(gCount)
    var heart = document.querySelector('.heart')
    if (gCount === 1) heart.innerHTML = "❤️❤️"
    if (gCount === 2) heart.innerHTML = "❤️"
    gameOver()


}
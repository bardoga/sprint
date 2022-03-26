"use strict";

const flag = "🚩";
const player = "😀";
const playerL = "😭";
const HEART = "❤️";
var gBoard;
var result = false;
// var secondclick = false
var gInterval;
var gCount = 0;
var gNegs = {
  posi: 0,
  posj: 0,
};
var audio = new Audio("sound/click.wav");
var heart = document.querySelector(".heart");
var flags = document.querySelector(".flags span");
var gPlayer = document.querySelector(".player");
// console.log(flags.innerText)
// let result = true;
// var mCell;
// console.log(mCell)

var gLevel = {
  SIZE: 4,
  MINES: 2,
};
var gGame = {
  isOn: false,
  showCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

function setLevel(c) {
  // gLevel.SIZE === 5
  // console.log(c)
  if (c === 4) {
    audio.play();
    gLevel.SIZE = 4;
    gLevel.MINES = 2;
    flags.innerHTML = 2;
    gameOver();
  } else if (c === 8) {
    audio.play();
    gLevel.SIZE = 8;
    gLevel.MINES = 12;
    flags.innerHTML = 12;
    gameOver();
  } else {
    audio.play();
    gLevel.SIZE = 12;
    gLevel.MINES = 30;
    flags.innerHTML = 30;
    gameOver();
  }
}

function InitGame() {
  gPlayer.innerHTML = player;
  // gGame.isOn === false;
  stopTimer();
  resetTimer();
  gBoard = createMat(gLevel.SIZE);
  console.log(gBoard);
  // debugger
  gCount = 0;
  heart.innerHTML = "❤️❤️❤️";
  renderBoard(gBoard, ".board-container");
}

function cellClicked(elCell) {
  audio.play();
  var Loc = elCell.className;
  var mCell = getLocation(Loc);
  // console.log(gCell2)
  // debugger
  if (gBoard[mCell.i][mCell.j].isMine === true) countLives();
  else {
    onFirstClick(elCell);
    elCell.classList.remove("notpressed");
    showNegs(elCell);
    checkVictory(minesLocation);
  }
}

function showNegs(elCell) {
  // debugger
  var Loc = elCell.className;
  var gCell2 = getLocation(Loc);
  if (elCell.isMine) gameOver();
  else {
    showNegsRec(gCell2.i, gCell2.j);
  }
}

function showNegsRec(i, j) {
  if (gBoard[i][j].isShown == true || gBoard[i][j].isMine == true) return;
  else {
    var cell = document.querySelector(`.cell-${i}-${j}`);
    cell.classList.remove("notpressed");
    var new_cell = document.createElement("td");
    new_cell.classList.add(`cell-${i}-${j}`);
    new_cell.classList.add("cell");
    cell.replaceWith(new_cell);
    var gCell2 = { i, j };
    var count = countNeighbors(i, j, gBoard);
    switch (count) {
      case 0:
        gBoard[i][j].isShown = true;
        for (var i2 = i - 1; i2 <= i + 1; i2++) {
          if (i2 < 0 || i2 > gBoard.length - 1) continue;
          for (var j2 = j - 1; j2 <= j + 1; j2++) {
            if (j2 < 0 || j2 > gBoard[0].length - 1) continue;
            if (i2 === i && j2 === j) continue;
            showNegsRec(i2, j2);
          }
        }
        break;
      case 1:
        gBoard[i][j].isShown = true;
        renderCelltoText(gCell2, "1");
        break;
      case 2:
        gBoard[i][j].isShown = true;
        renderCelltoText(gCell2, "2");
        break;
      case 3:
        gBoard[i][j].isShown = true;
        renderCelltoText(gCell2, "3");
        break;
      case 4:
        gBoard[i][j].isShown = true;
        renderCelltoText(gCell2, "4");
        break;
      case 5:
        gBoard[i][j].isShown = true;
        renderCelltoText(gCell2, "5");
        break;
      case 6:
        gBoard[i][j].isShown = true;
        renderCelltoText(gCell2, "6");
        break;
      case 7:
        gBoard[i][j].isShown = true;
        renderCelltoText(gCell2, "7");
        break;
      case 8:
        gBoard[i][j].isShown = true;
        renderCelltoText(gCell2, "8");
        break;
    }
  }
}

function gameOver() {
  gGame.isOn = false;
  // gCount = 0;
  heart.innerHTML = "❤️❤️❤️";
  // debugger
  console.log("test");
  stopTimer();
  resetTimer();
  InitGame();
}

function onFirstClick(elCell) {
  startTimer();
  if (gGame.isOn) return;
  placeMines(elCell);
  //showNegs(elCell);
  gGame.isOn = true;
}

// function highlightNegs(gNegs) {
//     for (var i = 0; i < gNegs.length; i++) {
//         var posi = gNegs.i[i]
//         var posj = gNegs.j[i]
//             // console.log(gNegs[i])
//             // debugger
//         gNegs[i].document.querySelector(`.cell-${posi}-${posj}`).classList.remove("notpressed");
//     }

// }

function onRightClick(ev, cell) {
  ev.preventDefault();
  audio.play();
  // if (gGame.isOn) return;
  var Loc = cell.className;
  var mCell = getLocation(Loc);
  console.log("test");
  renderCell({ i: mCell.i, j: mCell.j }, "🚩");
  // if (document.querySelector(`.cell-${mCell.i}-${mCell.j}`).innerHTML === '🚩') {
  //     renderCell({ i: mCell.i, j: mCell.j }, '')
  //     debugger
  // }
  checkVictory(minesLocation);
}

function countLives() {
  gCount++;
  console.log(gCount);
  var heart = document.querySelector(".heart");
  if (gCount === 1) heart.innerHTML = "❤️❤️";
  else if (gCount === 2) heart.innerHTML = "❤️";
  else gameOver();
}

function checkVictory(arr) {
  var result = false;
  // var result = true;
  for (var i = 0; i < arr.length; i++) {
    var mine = arr[i];
    var posI = mine.i;
    var posJ = mine.j;
    if (document.querySelector(`.cell-${posI}-${posJ}`).innerHTML !== "🚩") {
      result = false;
      break;
    }
  }
  Victory(result);
}

function Victory(num) {
  if (num === true) {
    console.log("You cleared all the mines!");
    alert("Congratulations!, You cleared all the mines");
    gameOver();
  }
}

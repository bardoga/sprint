'use strict'

function renderBoard(mat, selector) {
    var strHTML = '<table id="hello"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell-' + i + '-' + j + ' + notpressed';
            strHTML += '<td oncontextmenu="onRightClick(event,this)" onclick="cellClicked(this)" class="' + className + '">  </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
    // let x = document.getElementsByClassName(className)[0];
    // console.log(x)
    // debugger

}

function createMat(length) {
    var mat = []
    for (var i = 0; i < length; i++) {
        mat[i] = []
        for (var j = 0; j < length; j++) {
            mat[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return mat
}


// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function getLocation(cell) {
    var seperated = cell.split('-')
    var i = parseInt(seperated[1])
    var j = parseInt(seperated[2])
    return { i, j }
}


function renderCelltoText(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerText = value;
}

var getRandomInteger = function(min, max) {
    return Math, floor(Math.random() * (max - min)) + min
}
/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'blue',
    '-1': 'gold'
};

/*----- app's state (variables) -----*/
// Array of 42 elements?
// Make the board an array?

let board;  // 2D array where nested arrays rep the columns
let turn;  // 1 or -1; 0 for nobddy home in that cell
let gameStatus;  // 0 -> game in play; 1/-1 player win; 'S' -> stalemate

/*----- cached element references -----*/
const guideEls = [...document.querySelectorAll('#guides > div')];
const messageEl = document.querySelector('h1');
const replayBtn = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('guides').addEventListener('click', handleDrop); 
replayBtn.addEventListener('click', init);

/*----- functions -----*/
init();
// board = new Array(42).fill(0);
function init() {
    board = [
      [0, 0, 0, 0, 0, 0],    // column 0
      [0, 0, 0, 0, 0, 0],    // column 1
      [0, 0, 0, 0, 0, 0],    // column 2
      [0, 0, 0, 0, 0, 0],    // column 3
      [0, 0, 0, 0, 0, 0],    // column 4
      [0, 0, 0, 0, 0, 0],    // column 5
      [0, 0, 0, 0, 0, 0],    // column 6
    ];
    turn = 1;
    gameStatus = 0;
    renderGuides();
    render();
}

function render() {
  // iterate over the column arrays
  board.forEach(function(colArr, colIdx) {
    colArr.forEach(function(cellVal, rowIdx) {
       const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
       cellEl.style.backgroundColor = COLORS[cellVal];
     });
   });
    renderGuides();
    renderMessage();
}

// hide or show the guidepoints (if no 0's)
function renderGuides() {
    guideEls.forEach(function(guideEl, colIdx) {
        guideEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
        if (gameStatus === -1 || gameStatus === 1 ) {
            guideEl.style.visibility = 'hidden'
    };
    });
}

// Update all impacted state, then call render
function handleDrop(evt) {
    //Guards
    if (gameStatus != 0) return;
   const colIdx = guideEls.indexOf(evt.target);
   if (colIdx === -1) return;
   const colArr = board[colIdx];
   const rowIdx = colArr.indexOf(0);
   colArr[rowIdx] = turn;
   turn *= -1;
   winner = checkWin(colIdx, rowIdx);
   render();
}

function renderMessage() {
    if (gameStatus === 0) {
         messageEl.innerHTML = `Player <span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    } else if (gameStatus === 'S') {
// Stalemate
        messageEl.textContent = 'Stalemate';
    } else {
 // Player has won!
        messageEl.innerHTML = `Player <span style="color: ${COLORS[gameStatus * -1]}">${COLORS[gameStatus * -1].toUpperCase()}</span>'s Wins!`;
    }
}
// In response to user interaction (e.g., click)
// We update ALL impacted state,
// then lastly, call render



// Render's job is to transfer/visualize
// all state to the DOM
function checkWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    return checkVertWin(colIdx, rowIdx, player) || checkHorzWin(colIdx, rowIdx, player)
};

function checkVertWin(colIdx, rowIdx, player) {
   // const playe = board[colIdx][rowIdx];
    let count = 1;
    rowIdx--;
    while (board[colIdx][rowIdx] === player && rowIdx >= 0) {
        count++;
        rowIdx--;
    }
    console.log(count);
    return count === 4 ? gameStatus = turn : 0;
}

function checkHorzWin(colIdx, rowIdx, player) {
    const colArr = board[colIdx];
    let count = 1;
    let idx = colIdx + 1;
    while (idx < board.length && board [idx][rowIdx] === player) {
        count++;
        idx++;
    }
    idx = colIdx - 1;
    while((idx >= 0) && board[idx][rowIdx] === player) {
        count++;
        idx--;
    }
    return count >= 4 ? gameStatus = turn : 0;
}

function checkDiagWin(colIdx, rowIdx, player) {
    const colArr = board[colIdx];
    let count = 1;
}
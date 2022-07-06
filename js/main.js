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
const messageEls = document.querySelector('h1');
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
    winner = 0;
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
}

// hide or show the guidepoints (if no 0's)
function renderGuides() {
    guideEls.forEach(function(guideEl, colIdx) {
        guideEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
        if (winner === -1 || winner === 1 ) {
            guideEl.style.visibility = 'hidden'
    };
    });
}

// Update all impacted state, then call render
function handleDrop(evt) {
    //Guards
   const colIdx = guideEls.indexOf(evt.target);
   if (colIdx === -1) return;
   const colArr = board[colIdx];
   const rowIdx = colArr.indexOf(0);
   colArr[rowIdx] = turn;
   turn *= -1;
   render();
}

// In response to user interaction (e.g., click)
// We update ALL impacted state,
// then lastly, call render



// Render's job is to transfer/visualize
// all state to the DOM
function renderMessage() {
    if (gameStatus === 0) {
         msgEl.innerHTML = `Player's Turn`;
    } else if (gameStatus === 'S') {
// Stalemate
        msgEl.textContent = 'Stalemate';
    } else {
 // Player has won!
        msgEl.innerHTML = `Player's Wins!`;
    }
}

function checkVertWin(colIdx, rowIdx, player) {
    const colArr = board[colIdx];
    let count = 1;
    rowIdx--;
    while (colArr[rowIdx] === player && rowIdx >= 0) {
        count++;
        rowIdx--;
    }
    return count === 4 ? winner = turn : 0;
}

// const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
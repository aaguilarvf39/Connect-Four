/*----- constants -----*/
const COLOR_LOOKUP = {
        '1': 'blue',
        '-1': 'yellow',
        '0': 'white'
};

const WINNING_PATTERNS = {

}

/*----- app's state (variables) -----*/
// Array of 42 elements?
// Make the board an array?

let board;  // 42 array where nested arrays rep the columns
let turn;  // 1 or -1; 0 for nobddy home in that cell
let gameStatus;  // null -> game in play; 1/-1 player win; 'S' -> stalemate

/*----- cached element references -----*/

const squareEls = [];
const messageEls = 
const replayBtn = document.querySelector('button');

/*----- event listeners -----*/

replayBtn.addEventListener('click', init);

/*----- functions -----*/
init();

// board = new Array(42).fill(null);
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
    render();
}

function render() {
    // iterate over the column arrays
    board.forEach(function(colArr, colIdx) {
        
    });
}

gameStatus = null;


function TOBENAMED(evt) {
    //Guards
 if ()
}

// In response to user interaction (e.g., click)
// We update ALL impacted state,
// then lastly, call render



// Render's job is to transfer/visualize
// all state to the DOM
function render() {

}

function renderMessage() {
    
    // Tie game


    // Player has won!
}


const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
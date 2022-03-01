// As a user for two player game:
// enter our names and have them displayed
// have our order chosen for us by the game
 // take turns by dropping our chip into a column on the grid
// not be able to drop a chip into a totally filled column
 // be told when a move causes a player to win, or to draw
 // start the game over without having to reset the browser

 // User for single player game:
// see the name 'Computer' displayed as my opponent
// have the Computer player choose columns as if it were a human player



// Make the board

const board = [];

for (let i = 0; i < 7; i++) {
  board.push([])
}


// Visually display board, (not round shaped yet)

let tableElement = document.getElementsByTagName('table')[0]


function createRow(){
    let row = document.createElement('row')
    for(let i = 0; i < 7; i++){
        let col = document.createElement('col')
        row.appendChild(col)
    }
    tableElement.appendChild(row)
    
}


function createBoard(){
    for(let i = 0; i < 6; i++){
        createRow();
    }
}


createBoard()



// Game state
let playerColor = 'red'
const gameState = {
  board: board, 
  players: ['red', 'yellow'] 
}




// Create a button to press for the token drop
const aboveBoard = document.querySelector('.aboveBoard')
function createButton(){
    for(let i = 0; i < 7; i++){
    const button = document.createElement('button')
    aboveBoard.appendChild(button)
    }
}

createButton()


// Click button change space color --- currently hard coded to be the bottom left most space
function colorSpace(event){
    let selectedCol = document.getElementsByTagName('col')[35]
    if(event.target.tagName === 'BUTTON')
    selectedCol.classList.toggle(playerColor)
}

// Need function to grab the correct index number for the specific col 

aboveBoard.addEventListener('click', colorSpace)












//Player turn display


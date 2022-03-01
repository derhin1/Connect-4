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
const gameState = {
  board: board, 
  players: ['red', 'yellow'] 
}




// Create a button to press for the token drop

function createButton(){
    const aboveBoard = document.querySelector('.aboveBoard')
    for(let i = 0; i < 7; i++){
    const button = document.createElement('button')
    aboveBoard.appendChild(button)
    }
}

createButton()


//Player turn display


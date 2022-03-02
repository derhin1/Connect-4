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

function randomInt(){
    return Math.floor(Math.random() * 2);
}

// Game state
const gameState = {
  board: board, 
  players: ['red', 'yellow'] ,
  turn: 'red'
}

// Turn is currently defaulted at red, will use a random number gen to get a random starting color
gameState.turn = gameState.players[randomInt()]



// Create a button to press for the token drop
const aboveBoard = document.querySelector('.aboveBoard')
function createButton(){
    for(let i = 0; i < 7; i++){
    const button = document.createElement('button')
    button.classList.add(i)
    aboveBoard.appendChild(button)
    }
}

createButton()


// Function to create a starting point for the index
function startingIndex(event){
    let indexNum = 0
    if(event.target.className === '0'){
        indexNum = 35
        return indexNum
    }
    if(event.target.className === '1'){
        indexNum = 36
        return indexNum
    }
    if(event.target.className === '2'){
        indexNum = 37
        return indexNum
    }
    if(event.target.className === '3'){
        indexNum = 38
        return indexNum
    }
    if(event.target.className === '4'){
        indexNum = 39
        return indexNum
    }
    if(event.target.className === '5'){
        indexNum = 40
        return indexNum
    }
    if(event.target.className === '6'){
        indexNum = 41
        return indexNum
    }
    
}






//Function that will move the index by 7 if the current col is colored --- returns new index number
function indexMover(event){
    let i = 0;
    let selectedCols = document.getElementsByTagName('col')[startingIndex(event)]
    let newIndex = startingIndex(event)
    while(i < 5){
        if(selectedCols.className === 'red' || selectedCols.className ==='yellow'){
             newIndex -= 7;
             selectedCols = document.getElementsByTagName('col')[newIndex]
            i++
        }
         else{
             break;
         }  
    }   
    return newIndex
}



// Click button change space color -- also only works if a button was pressed
function colorSpace(event){
    let selectedCol = document.getElementsByTagName('col')[indexMover(event)]
    if(event.target.tagName === 'BUTTON' && !(selectedCol.className === 'red') && !(selectedCol.className === 'yellow')){
        selectedCol.classList.toggle(gameState.turn)
    }
}


aboveBoard.addEventListener('click', function(event){  
    colorSpace(event);
    nextTurn();
})




// Function to change the gameState turn order

function nextTurn(){
    if(gameState.turn === 'red'){
        gameState.turn = 'yellow'
    }
    else{
        gameState.turn = 'red'
    }
}
   








//Player turn display


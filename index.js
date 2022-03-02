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


// Converting the general index number to i and j values

function getRow(number){
    if(number < 7){
        return 0
    }
    else if(number < 14){
        return 1
    }
    else if(number < 21){
        return 2
    }
    else if(number< 28){
        return 3
    }
    else if(number < 35){
        return 4
    }
    else if(number <= 41){
        return 5
    }
}


function getCol(indexNum){
    if(indexNum % 7 === 0){
        return 0
    }
    if(indexNum % 7 === 1){
        return 1
    }
    if(indexNum % 7 === 2){
        return 2
    }
    if(indexNum % 7 === 3){
        return 3
    }
    if(indexNum % 7 === 4){
        return 4
    }
    if(indexNum % 7 === 5){
        return 5
    }
    if(indexNum % 7 === 6){
        return 6
    }
}



function convertIndex(indexNum){

}

// Click button change space color -- also only works if a button was pressed
function colorSpace(event){
    let movedCol = document.getElementsByTagName('col')[indexMover(event)]
    if(event.target.tagName === 'BUTTON' && !(movedCol.className === 'red') && !(movedCol.className === 'yellow')){
        movedCol.classList.toggle(gameState.turn)
        // console.log(getRow(35))
        // console.log(getRow(indexMover(event)))
        board[getCol(indexMover(event))].push(gameState.turn)
        console.log(board)
    }
}

// // board values back end function
// function boardUpdate(){
//   let indexNum = indexMover()

// }



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
   



// Function to check win
// from any index position, need to check every surrounding index space for the same color, and if it is we check again around that space till 4 times
function winner(event){
    let indexCheck = indexMover(event)
    let checkCol = document.getElementsByTagName('col')[indexCheck]
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++)
        if(checkCol.className === 'red'){
            indexCheck = indexCheck - 7

        }
        if(checkCol.className === 'yellow'){

        }
    }
}








//Player turn display


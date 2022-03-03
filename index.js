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
  playerName1: 'Enter Name',
  playerName2: 'Enter Name',
  turn: 'red'
}

function reRender(){
    displayName1.innerText = gameState.playerName1
    displayName2.innerText = gameState.playerName2
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


// Converting the general index number col numbers



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
        board[getCol(indexMover(event))].push(gameState.turn)
        
    }
}



aboveBoard.addEventListener('click', function(event){  
    colorSpace(event);
    nextTurn();
    // console.log(board, 'actual')
    // console.log(colWin())
    // console.log(rowWin())
    // console.log(diagWinAsc())
    console.log(diagWinDesc())
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
   



// Function to check for a column win condition
function colWin(){
    for(let i = 0; i < board.length; i ++){
        let redColCount = 0;
        let yellowColCount = 0;
        for(let j = 0; j < board[i].length; j++){
            if(board[i][j] === 'red'){
                yellowColCount = 0;
                redColCount++;
                if(redColCount === 4){
                    return 'Red Wins!'
                }
            }
            if(board[i][j] === 'yellow'){
                redColCount = 0;
                yellowColCount++;
                if(yellowColCount === 4){
                    return 'Yellow Wins!'
                }
            }
        }
   }
}

// Function to check a horizontal win condition

function rowWin(){
    for(let j = 0; j < 6; j++){
        let rowArray = []
        for(let i = 0; i < 7; i++){
            if(board[i][j] === undefined){
                continue;
            }
            rowArray.push(board[i][j])
            if(rowArray.length >= 4){
                stringRowArray = rowArray.join('-')
                if(!(stringRowArray.search('red-red-red-red') === -1)){
                    return "Red wins with 4 horizontally"
                }
                if(!(stringRowArray.search('yellow-yellow-yellow-yellow') === -1)){
                    return 'Yellow wins with 4 horizontally'
                }
            }
         }
    }
}

// Function to check a diagonal win condition

function diagWinAsc(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] === 'red' && board[i+1][j+1] === 'red' && board[i+2][j+2] === 'red' && board[i+3][j+3] === 'red'){
                return 'Red wins diagonally'
            }
            if(board[i][j] === 'yellow' && board[i+1][j+1] === 'yellow' && board[i+2][j+2] === 'yellow' && board[i+3][j+3] === 'yellow'){
                return 'Yellow wins diagonally'
            }
        }
    }
}

function diagWinDesc(){
    for(let i = 0; i < 4; i++){
        for(let j = 3; j < 6; j++){
             if(board[i][j] === 'red' && board[i+1][j-1] === 'red' && board[i+2][j-2] === 'red' && board[i+3][j-3] === 'red'){
                return 'Red wins diagonally desc'
            }
            if(board[i][j] === 'yellow' && board[i+1][j-1] === 'yellow' && board[i+2][j-2] === 'yellow' && board[i+3][j-3] === 'yellow'){
                return 'Yellow wins diagonally'
            }
        }
    }
}


// Need a function to check for draw



// Name Display

const displayName1 = document.createElement('div')
displayName1.classList.add('Name1')
document.body.appendChild(displayName1)
displayName1.innerText = gameState.playerName1
const displayName2 = document.createElement('div')
displayName2.classList.add('Name2')
document.body.appendChild(displayName2)
displayName2.innerText = gameState.playerName2



// Create text input forms
// const label = document.createElement("label")
// label.
const inputs = document.createElement('search')
inputs.classList.add("nameInputs")
document.body.appendChild(inputs)
const input1 = document.createElement("input")
input1.setAttribute("type", "text")
input1.setAttribute("id", "box1")
inputs.appendChild(input1)
const input2 = document.createElement("input")
input2.setAttribute("type", "text")
input2.setAttribute("id", "box2")
inputs.appendChild(input2)



// Create buttons for the names

const editNameButton = document.createElement('button')
const editNameButton2 = document.createElement('button')
editNameButton.classList.add('gg-pen')
editNameButton.setAttribute("id", 'first')
editNameButton2.classList.add('gg-pen')
editNameButton2.setAttribute("id", 'second')
inputs.appendChild(editNameButton)
inputs.appendChild(editNameButton2)




// Click button change name
function changePlayerName(){
    let newName = document.getElementById('box1').value
    let newName2 = document.getElementById('box2').value
    if(!(newName === '')){
        gameState.playerName1 = document.getElementById('box1').value
    }
    if(!(newName2 === '')){
        gameState.playerName2 = document.getElementById('box2').value
    }
}


inputs.addEventListener('click', function(){
    changePlayerName()
    reRender()
}
)

inputs.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
    changePlayerName()
    reRender()
    }
}
)

// editNameButton2.addEventListener('click', function(){
//     changePlayerName2()
//     displayName2.innerText = gameState.playerName2
//     console.log(gameState.playerName2)
// }
// )

// displayName1.addEventListener('click', )





//Player turn display



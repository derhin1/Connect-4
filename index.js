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
    button.classList.add(i)
    aboveBoard.appendChild(button)
    }
}

createButton()


// Need function to grab the correct index number for the specific col 
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




// Function to check if index has a colored space already
// function spaceChecker(){
//     let selectedCols = document.getElementsByTagName('col')[startingIndex()]
//     if(selectedCols.className === 'red'){
//         return true
//     }
//     return false
// }

//Function that to move the index by 7 if the current col is colored
function indexMover(event){
    let i = 0;
    let selectedCols = document.getElementsByTagName('col')[startingIndex(event)]
    let newIndex = startingIndex(event)
    while(i < 5){
        if(selectedCols.className === 'red'){
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



// Click button change space color --- currently hard coded to be the bottom left most space
function colorSpace(event){
    let selectedCol = document.getElementsByTagName('col')[indexMover(event)]
    if(event.target.tagName === 'BUTTON'){
        selectedCol.classList.toggle(playerColor)
    }
}


aboveBoard.addEventListener('click', function(event){  
    // startingIndex(event);
    // spaceChecker(event);
    colorSpace(event);
})





   





//Player turn display


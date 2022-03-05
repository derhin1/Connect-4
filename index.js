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
function arrBoard(){
    for (let i = 0; i < 7; i++) {
        board.push([]);
    }
}

arrBoard();


// Visually display board,

let tableElement = document.getElementsByTagName('table')[0];


function createRow(){
    let row = document.createElement('row');
    for(let i = 0; i < 7; i++){
        let col = document.createElement('col');
        row.appendChild(col);
    }
    tableElement.appendChild(row);
    
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
  playerName: ['Enter Name', 'Enter Name'],
  currentPlayer: '',
  turn: 'red',
  winner: ''
}



function reRender(){
    if(gameState.currentPlayer === ''){
        if(!(gameState.playerName[0] === 'Enter Name') && (!(gameState.playerName[1] === 'Enter Name'))){
            gameState.currentPlayer = gameState.playerName[randomInt()];
            turnDisplay.innerHTML = `${gameState.currentPlayer}'s (${gameState.turn}) turn`;
        }
    }
    else if(!(gameState.currentPlayer === '')){
        turnDisplay.innerHTML = `${gameState.currentPlayer}'s (${gameState.turn}) turn`;
    }
    nextPlayer()
    displayName1.innerText = gameState.playerName[0];
    displayName2.innerText = gameState.playerName[1];
    if(!(gameState.winner === '')){
        winnerDisplay.innerText = `${gameState.currentPlayer} wins!`;
        turnDisplay.style.display = "none";
    }
}


function nextPlayer(){
    if(gameState.currentPlayer === gameState.playerName[0]){
        gameState.currentPlayer = gameState.playerName[1];

    }
    else if(gameState.currentPlayer === gameState.playerName[1]){
        gameState.currentPlayer = gameState.playerName[0];
    }
}



// Turn is currently defaulted at red, will use a random number gen to get a random starting color

gameState.turn = gameState.players[randomInt()];


// Create a button to press for the token drop
const aboveBoard = document.querySelector('.aboveBoard');
function createButton(){
    for(let i = 0; i < 7; i++){
    const button = document.createElement('button');
    button.classList.add(i);
    aboveBoard.appendChild(button);
    }
}

createButton();


// Function to create a starting point for the index
function startingIndex(event){
    let indexNum = 0;
    if(event.target.className === '0'){
        indexNum = 35;
        return indexNum;
    }
    if(event.target.className === '1'){
        indexNum = 36;
        return indexNum;
    }
    if(event.target.className === '2'){
        indexNum = 37;
        return indexNum;
    }
    if(event.target.className === '3'){
        indexNum = 38;
        return indexNum;
    }
    if(event.target.className === '4'){
        indexNum = 39;
        return indexNum;
    }
    if(event.target.className === '5'){
        indexNum = 40;
        return indexNum;
    }
    if(event.target.className === '6'){
        indexNum = 41;
        return indexNum;
    }
    
}






//Function that will move the index by 7 if the current col is colored --- returns new index number
function indexMover(event){
    let i = 0;
    let selectedCols = document.getElementsByTagName('col')[startingIndex(event)];
    let newIndex = startingIndex(event);
    while(i < 5){
        if(selectedCols.className === 'red' || selectedCols.className ==='yellow'){
             newIndex -= 7;
             selectedCols = document.getElementsByTagName('col')[newIndex];
            i++;
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
        return 0;
    }
    if(indexNum % 7 === 1){
        return 1;
    }
    if(indexNum % 7 === 2){
        return 2;
    }
    if(indexNum % 7 === 3){
        return 3;
    }
    if(indexNum % 7 === 4){
        return 4;
    }
    if(indexNum % 7 === 5){
        return 5;
    }
    if(indexNum % 7 === 6){
        return 6;
    }
}



function convertIndex(indexNum){

}

// Click button change space color -- also only works if a button was pressed
function colorSpace(event){
    let movedCol = document.getElementsByTagName('col')[indexMover(event)];
    if(event.target.tagName === 'BUTTON' && !(movedCol.className === 'red') && !(movedCol.className === 'yellow')){
        movedCol.classList.toggle(gameState.turn);
        board[getCol(indexMover(event))].push(gameState.turn);
        
    }
}



aboveBoard.addEventListener('click', function(event){  
    colorSpace(event);
    nextTurn();
    crownWinner();
    reRender();
})




// Function to change the gameState turn order

function nextTurn(){
    if(gameState.turn === 'red'){
        gameState.turn = 'yellow';
    }
    else{
        gameState.turn = 'red';
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
                    return 'Red';
                }
            }
            if(board[i][j] === 'yellow'){
                redColCount = 0;
                yellowColCount++;
                if(yellowColCount === 4){
                    return 'Yellow';
                }
            }
        }
   }
}

// Function to check a horizontal win condition

function rowWin(){
    for(let j = 0; j < 6; j++){
        let rowArray = [];
        for(let i = 0; i < 7; i++){
            if(board[i][j] === undefined){
                continue;
            }
            rowArray.push(board[i][j])
            if(rowArray.length >= 4){
                stringRowArray = rowArray.join('-');
                if(!(stringRowArray.search('red-red-red-red') === -1)){
                    return "Red";
                }
                if(!(stringRowArray.search('yellow-yellow-yellow-yellow') === -1)){
                    return 'Yellow';
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
                return 'Red';
            }
            if(board[i][j] === 'yellow' && board[i+1][j+1] === 'yellow' && board[i+2][j+2] === 'yellow' && board[i+3][j+3] === 'yellow'){
                return 'Yellow';
            }
        }
    }
}

function diagWinDesc(){
    for(let i = 0; i < 4; i++){
        for(let j = 3; j < 6; j++){
             if(board[i][j] === 'red' && board[i+1][j-1] === 'red' && board[i+2][j-2] === 'red' && board[i+3][j-3] === 'red'){
                return 'Red';
            }
            if(board[i][j] === 'yellow' && board[i+1][j-1] === 'yellow' && board[i+2][j-2] === 'yellow' && board[i+3][j-3] === 'yellow'){
                return 'Yellow';
            }
        }
    }
}


// Function checks if board is full
function boardFull(){
    for(let i = 0; i < board.length; i++){
        if(board[i].length === 6){
            continue;
        }
        else{
           return false;
        }
    }
    return true;
}



// function to declare winner

function crownWinner(){
    if(colWin() === 'Red' || rowWin() === 'Red' || diagWinAsc() === 'Red' || diagWinDesc() === 'Red'){
        gameState.winner = 'Red';
    }
    if(colWin() === 'Yellow' || rowWin() === 'Yellow' || diagWinAsc() === 'Yellow' || diagWinDesc() === 'Yellow'){
        gameState.winner = 'Yellow';
    }
    if(boardFull() && !(colWin() === 'Red' || rowWin() === 'Red' || diagWinAsc() === 'Red' || diagWinDesc() === 'Red') && !(colWin() === 'Yellow' || rowWin() === 'Yellow' || diagWinAsc() === 'Yellow' || diagWinDesc() === 'Yellow')){
        drawDisplay.innerHTML = "It's a draw!";
    }
}



const drawDisplay = document.createElement('div');
drawDisplay.classList.add('draw');
document.body.appendChild(drawDisplay);

// Winner display but only show if there is a winner

const winnerDisplay = document.createElement('div');
winnerDisplay.classList.add('winnerName');
document.body.appendChild(winnerDisplay);


// Display which color goes first
const turnDisplay = document.createElement('div');
turnDisplay.classList.add("turnOrder");
document.body.appendChild(turnDisplay);



// Name Display

const displayName1 = document.createElement('div');
displayName1.classList.add('Name1');
document.body.appendChild(displayName1);
displayName1.innerText = gameState.playerName[0];
const displayName2 = document.createElement('div');
displayName2.classList.add('Name2');
document.body.appendChild(displayName2);
displayName2.innerText = gameState.playerName[1];



// Create text input forms
const inputs = document.createElement('search');
inputs.classList.add("nameInputs");
document.body.appendChild(inputs);
const input1 = document.createElement("input");
input1.setAttribute("type", "text");
input1.setAttribute("id", "box1");
inputs.appendChild(input1);
const input2 = document.createElement("input");
input2.setAttribute("type", "text");
input2.setAttribute("id", "box2");
inputs.appendChild(input2);



// Create buttons for the names

const editNameButton = document.createElement('button');
const editNameButton2 = document.createElement('button');
editNameButton.classList.add('gg-pen');
editNameButton.setAttribute("id", 'first');
editNameButton2.classList.add('gg-pen');
editNameButton2.setAttribute("id", 'second');
inputs.appendChild(editNameButton);
inputs.appendChild(editNameButton2);


// Button for Single player mode
const singlePlayerButton = document.createElement('button')
singlePlayerButton.setAttribute("id", 'singlePlayer')
document.body.appendChild(singlePlayerButton)
singlePlayerButton.innerHTML = 'Click for single player game'

singlePlayerButton.addEventListener('click', function(){
    setSinglePlayer()
    reRender()
})

function setSinglePlayer(){
    gameState.playerName[1] = 'Computer'
}


// Button for reset game
const restartButton = document.createElement('button');
restartButton.setAttribute("id", "restart");
document.body.appendChild(restartButton);
restartButton.innerHTML = 'Restart Game';

// Click button change name
function changePlayerName(event){
    let newName = document.getElementById('box1').value
    let newName2 = document.getElementById('box2').value
        if(!(newName === '')){
            gameState.playerName[0] = document.getElementById('box1').value
        }
        if(!(newName2 === '')){
            gameState.playerName[1] = document.getElementById('box2').value
        }
}


inputs.addEventListener('click', function(event){
    if(event.target.tagName === 'BUTTON'){
        changePlayerName();
        reRender();
    }
})

inputs.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
    changePlayerName();
    reRender();
    }
})

restartButton.addEventListener('click', function(){
    resetGameState();
    resetBoard();
    reRender();
})

function resetBoard(){
    const allCols = document.getElementsByTagName('col');
    for(let i = 0; i < allCols.length; i++){
            if(allCols[i].className === 'red'){
                allCols[i].classList.toggle('red');
            }
            if(allCols[i].className === 'yellow'){
                allCols[i].classList.toggle('yellow');
            }
        }
}

function resetGameState(){
    board.splice(0, board.length);
    arrBoard();
    gameState.board = board;
    gameState.playerName = ['Enter Name', 'Enter Name'];
    gameState.currentPlayer = '';
    gameState.turn = 'red';
    winner = '';
    document.getElementById('box1').value = '';
    document.getElementById('box2').value = '';
    turnDisplay.innerHTML = '';
    winnerDisplay.innerHTML = '';
    drawDisplay.innerHTML = '';
}






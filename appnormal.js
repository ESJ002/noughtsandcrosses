const allSquares = document.querySelectorAll('.square');
const resetButton = document.querySelector('button')
const playersTurnMessage = document.querySelector('.player-turn')
const winCombinations = [
    ['1','2','3'], // Top Row
    ['4','5','6'], // Middle Row
    ['7','8','9'], // Bottom Row
    ['1','4','7'], // Left Column
    ['2','5','8'], // Middle Column
    ['3','6','9'], // Right Column
    ['1','5','9'], // Diagonal Left-Right
    ['3','5','7'], // Diagonal Right-Left
]

for (let square of allSquares) {
    activateSquares(square) // Add event listener click to all squares.
}

let isPlayer1Turn = true; // Player 1 Goes First
let player1Scores = [] // Player 1 Scores
let player2Scores = [] // Player 2 Scores

function handleSquareClick(event) {
    const square = event.target;
    if (isPlayer1Turn) {
        changeToCross(square); // Change to cross if Player 1 turn
    } else {
        changeToNought(square); // Change to nought if Player 2 turn
    }
    deactivateSquare(square) // Remove cursor on clicked square
    checkForWinner()
    isPlayer1Turn = !isPlayer1Turn; // Toggle whose turn it is.
}


function checkForWinner() {
    let isWinner = false // Currently no winner
    for (let combination of winCombinations) { // Cycle through all win combinations
        if (player1Scores.includes(combination[0]) && player1Scores.includes(combination[1]) && player1Scores.includes(combination[2])) { // Check if Player 1 has a winning combination
            winner('PLAYER 1'); // Invoke Winner function with Player 1
            isWinner = true; // There is a winner
        } 
        if (player2Scores.includes(combination[0]) && player2Scores.includes(combination[1]) && player2Scores.includes(combination[2])) { // Check if Player 2 has a winning combination
            winner('PLAYER 2'); // Invoke Winner function with Player 2
            isWinner = true; // There is a winner
        }
        if (player1Scores.length === 5 && player2Scores.length === 4 && isWinner === false) { // Check if player scores have reached limit & there's still no winner
            draw() // Invoke the Draw function
        }
    }
}


function changeToCross(square) {
    square.style.color = 'lime'; // Color to Lime
    square.textContent = 'X' // Insert 'X'
    player1Scores.push(square.dataset.num) // Add square to Player 1 scores.
    playersTurnMessage.textContent = `IT'S PLAYER 2 'S TURN` // Change Turn Text
}

function changeToNought(square) {
    square.style.color = 'red'; // Color to Red
    square.textContent = 'O' // Insert 'O'
    player2Scores.push(square.dataset.num) // Add square to Player 2 scores.
    playersTurnMessage.textContent = `IT'S PLAYER 1 'S TURN` // Change Turn Text
}

resetButton.addEventListener('click', resetGame)

function winner(player) {
    for (let square of allSquares) { //cycle through all squares
        deactivateSquare(square) // Deactivate squares
    }
    playersTurnMessage.textContent = `${player} WINS!` // Add Winning Message
    resetButton.style.display = 'initial' // Reveal Reset Button
}

function draw() {
    for (let square of allSquares) { // Cycle through all squares
        deactivateSquare(square) // Deactivate squares
    }
    playersTurnMessage.textContent = `IT'S A DRAW!` // Add Draw Message
    resetButton.style.display = 'initial' // Reveal Reset Button
}

function resetGame() {
    for (let square of allSquares) { // Cycle through all squares
        square.textContent = '' // Remove X's and O's
        activateSquares(square)
    }
    playersTurnMessage.textContent = `IT'S PLAYER 1'S TURN`
    isPlayer1Turn = true
    player1Scores = []
    player2Scores = []
    resetButton.style.display = 'none' // Hide Reset Button
}

function activateSquares(square) {
    square.addEventListener('click', handleSquareClick) // Make squares clickable
    square.style.cursor = 'pointer' // Add cursor pointer to square

}

function deactivateSquare(square) {
    square.removeEventListener('click', handleSquareClick); // Make square unclickable
        square.style.cursor = 'default' // Remove cursor pointer from square
}




const allSquares = document.querySelectorAll('.square'); // All Squares
const resetButton = document.querySelector('.reset-btn') // Reset Button
const playersTurnMessage = document.querySelector('.player-turn') // Player Turn Message
const question = document.querySelector('.question') // Math Question
const answerButton = document.querySelector('.answer-btn') // Submit Button
const input = document.querySelector('input') // Input Section
const mathQuestionLine = document.querySelector('.math-q') // Whole Question Line
const player1WinCount = document.querySelector('.player-1-wins')
const player2WinCount = document.querySelector('.player-2-wins')  // Player 1 Win Counter
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
    activateSquare(square) // Add event listener click to all squares.
}

let isPlayer1Turn = true; // Player 1 Goes First
let player1Scores = [] // Player 1 Scores
let player2Scores = [] // Player 2 Scores
let player1Wins = 0
let player2Wins = 0
mathQuestionLine.style.display = 'none'

function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * 50);
    const num2 = Math.floor(Math.random() * 50);
    const operator = ['+', '-','*'][Math.floor(Math.random() * 3)];
    const question = `${num1} ${operator} ${num2}`
    const answer = eval(question);
    return { question, answer };
}

function handleSquareClick(event) {
    const square = event.target;
    const mathQuestion = generateMathQuestion();
    question.textContent = mathQuestion.question
    mathQuestionLine.style.display = 'initial'
    square.style.border = '4px solid lime'
    square.classList.add('clicked')
    for (let square of allSquares) {
        deactivateSquare(square) 
    }

}

function getAnswer() {
    const playerAnswer = Number(input.value);
    const mathAnswer = eval(question.textContent)
    input.value = ''; 
    let square = document.querySelector('.clicked')
    mathQuestionLine.style.display = 'none'
    if (playerAnswer !== null && playerAnswer === mathAnswer) {
            correctAnswer(square);
    } else {
        wrongAnswer(square);
    }
    isPlayer1Turn = !isPlayer1Turn;
    square.classList.remove('clicked')
    for (let square of allSquares) { 
        square.style.border = '1px solid lime'
        if (!square.classList.contains('completed'))
        activateSquare(square);
    }
}

answerButton.addEventListener('click', getAnswer)



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

function correctAnswer(square) {
    if (isPlayer1Turn) {
        changeToCross(square); // Change to cross if Player 1 turn
    } else {
        changeToNought(square); // Change to nought if Player 2 turn
    }
    deactivateSquare(square) // Remove cursor on clicked square
    checkForWinner()
    square.classList.add('completed')
}

function changeToCross(square) {
    square.style.color = 'lime'; // Color to Lime
    square.textContent = 'X' // Insert 'X'
    player1Scores.push(square.dataset.num) // Add square to Player 1 scores.
    playersTurnMessage.textContent = `CORRECT! IT'S PLAYER 2 'S TURN` // Change Turn Text
}

function changeToNought(square) {
    square.style.color = 'red'; // Color to Red
    square.textContent = 'O' // Insert 'O'
    player2Scores.push(square.dataset.num) // Add square to Player 2 scores.
    playersTurnMessage.textContent = `CORRECT! IT'S PLAYER 1 'S TURN` // Change Turn Text
}

function wrongAnswer(square) {
    if (isPlayer1Turn) {
        playersTurnMessage.textContent = `WRONG! IT'S PLAYER 2 'S TURN`
    } else {
        playersTurnMessage.textContent = `WRONG! IT'S PLAYER 1 'S TURN`
    } 
}

resetButton.addEventListener('click', resetGame)

function winner(player) {
    for (let square of allSquares) { //cycle through all squares
        deactivateSquare(square) // Deactivate squares
    }
    if (player === 'PLAYER 1') {;
        player1WinCount.textContent = Number(player1WinCount.textContent) + 1
    }
    if (player === 'PLAYER 2') {;
        player2WinCount.textContent = Number(player2WinCount.textContent) + 1
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
        activateSquare(square)
        square.classList.remove('completed')
        square.classList.remove('clicked')
    }
    
    if (isPlayer1Turn) {
        playersTurnMessage.textContent = `IT'S PLAYER 1 'S TURN`
    } else {
        playersTurnMessage.textContent = `IT'S PLAYER 2 'S TURN`
    }
    player1Scores = []
    player2Scores = []
    resetButton.style.display = 'none' // Hide Reset Button
}

function activateSquare(square) {
    square.addEventListener('click', handleSquareClick) // Make squares clickable
    square.style.cursor = 'pointer' // Add cursor pointer to square
}

function deactivateSquare(square) {
    square.removeEventListener('click', handleSquareClick); // Make square unclickable
    square.style.cursor = 'default' // Remove cursor pointer from square
}
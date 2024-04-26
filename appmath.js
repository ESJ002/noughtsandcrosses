// MATH NOUGHTS AND CROSSES
// DOM Declarations
const grid = document.querySelector('.grid') // Playing Area
const allSquares = document.querySelectorAll('.square'); // All Squares
const playMusic = document.querySelector('.music') // Play Music Button
const playersTurnMessage = document.querySelector('.player-turn') // Player Turn Message
const question = document.querySelector('.question') // Math Question
const input = document.querySelector('input') // Input Section
const submitButton = document.querySelector('.answer-btn') // Submit Button
const mathQuestionLine = document.querySelector('.math-q') // Whole Question Line
const player1WinCount = document.querySelector('.player-1-wins') // Player 1 Win Counter
const player2WinCount = document.querySelector('.player-2-wins')  // Player 2 win Counter
const resetButton = document.querySelector('.reset-btn') // Reset Button
const difficultyButtons = document.querySelectorAll('.difficulty-btn') // Difficulty Buttons
const difficultyHeader = document.querySelector('.difficulty') // Header Showing Difficulty Buttons

// Audio Files
const newGameAudio = new Audio('Sound/new-game.wav') // New Game Sound
const buttonAudio = new Audio('Sound/button.wav') // Click Button Sound
const correctAudio = new Audio('Sound/correct.wav') // Correct Answer Sound
const wrongAudio = new Audio('Sound/wrong.wav') // Wrong Answer Sound
const music = new Audio('Sound/music.wav') // Background Music

// MUSIC FUNCTIONS
// Start Music
function startMusic() {
    music.play()
    music.loop = true
    playMusic.removeEventListener('click', startMusic)
    playMusic.addEventListener('click', stopMusic)
    playMusic.style.textDecoration = 'initial'
}

// Stop Music
function stopMusic() {
    music.pause()
    playMusic.addEventListener('click', startMusic)
    playMusic.removeEventListener('click', stopMusic)
    playMusic.style.textDecoration = 'line-through'
}

// Add event listener to Music button
playMusic.addEventListener('click', startMusic)



// HOMESCREEN FUNCTIONS
// Select Difficulty Function
function selectDifficulty(event) {
    button = event.target
    mathDifficulty = button.dataset.difficulty 
    grid.style.display = 'grid'
    if (isPlayer1Turn) {
        playersTurnMessage.textContent = `IT'S PLAYER 1 'S TURN`
    } else {
        playersTurnMessage.textContent = `IT'S PLAYER 2 'S TURN`
    }
    difficultyHeader.style.display = 'none'
    newGameAudio.play();
}

// Add event listener to difficulty buttons
for (let button of difficultyButtons) {
    button.addEventListener('click', selectDifficulty) 
}

// GAME STARTUP
// Game Startup Variable States
let isPlayer1Turn = true; 
let player1Scores = [] 
let player2Scores = [] 
let player1Wins = 0 
let player2Wins = 0 
let mathDifficulty = 10 
mathQuestionLine.style.display = 'none' 
grid.style.display = 'none' 

// Winning Combinations Declaration
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

// Activate Squares Function
function activateSquare(square) {
    square.addEventListener('click', handleSquareClick) 
    square.style.cursor = 'pointer' 
}

// Deactivate Squares Function
function deactivateSquare(square) {
    square.removeEventListener('click', handleSquareClick); 
    square.style.cursor = 'default'
}

// Add event listener click to all squares.
for (let square of allSquares) {
    activateSquare(square) 
}


// GAMEPLAY FUNCTIONS
// Generate Math Question Function
function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * mathDifficulty + 1);
    const num2 = Math.floor(Math.random() * mathDifficulty + 1);
    const operator = ['+', '-','*'][Math.floor(Math.random() * 3)];
    const question = `${num1} ${operator} ${num2}`
    const answer = eval(question);
    return { question, answer };
}

// Square Click Function
function handleSquareClick(event) {
    buttonAudio.play()
    const square = event.target;
    const mathQuestion = generateMathQuestion();
    question.textContent = mathQuestion.question.replace('*','×')
    mathQuestionLine.style.display = 'initial'
    square.style.border = '4px solid lime'
    square.classList.add('clicked')
    for (let square of allSquares) {
        deactivateSquare(square) 
    }
    buttonAudio.play()
}

// Answer Check Function
function getAnswer() {
    const playerAnswer = Number(input.value);
    const mathAnswer = eval(question.textContent.replace('×','*'))
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

// Add Event Listener to Submit Button
submitButton.addEventListener('click', getAnswer)

// POST ANSWER CHECK FUNCTIONS
// Correct Answer Function
function correctAnswer(square) {
    if (isPlayer1Turn) {
        changeToCross(square); 
    } else {
        changeToNought(square); 
    }
    deactivateSquare(square) 
    checkForWinner()
    square.classList.add('completed')
    correctAudio.play();
}

// Player 1 Correct Function
function changeToCross(square) {
    square.style.color = 'lime'; 
    square.textContent = 'X' 
    player1Scores.push(square.dataset.num) 
    playersTurnMessage.textContent = `CORRECT! IT'S PLAYER 2 'S TURN` 
}

// Player 2 Correct Function
function changeToNought(square) {
    square.style.color = 'red'; 
    square.textContent = 'O';
    player2Scores.push(square.dataset.num);
    playersTurnMessage.textContent = `CORRECT! IT'S PLAYER 1 'S TURN` 
}

// Wrong Answer Function
function wrongAnswer(square) {
    if (isPlayer1Turn) {
        playersTurnMessage.textContent = `WRONG! IT'S PLAYER 2 'S TURN`
    } else {
        playersTurnMessage.textContent = `WRONG! IT'S PLAYER 1 'S TURN`
    } 
    wrongAudio.play();
}

// Winner Check Function
function checkForWinner() {
    let isWinner = false 
    for (let combination of winCombinations) { 
        if (player1Scores.includes(combination[0]) && player1Scores.includes(combination[1]) && player1Scores.includes(combination[2])) { // Check if Player 1 has a winning combination
            winner('PLAYER 1'); 
            isWinner = true; 
        } 
        if (player2Scores.includes(combination[0]) && player2Scores.includes(combination[1]) && player2Scores.includes(combination[2])) { // Check if Player 2 has a winning combination
            winner('PLAYER 2'); 
            isWinner = true; 
        }
        if (player1Scores.length === 5 && player2Scores.length === 4 && isWinner === false || player1Scores.length === 4 && player2Scores.length === 5 && isWinner === false) { // Check if player scores have reached limit & there's still no winner
            draw() 
        }
    }
}

// GAME RESULT FUNCTIONS
// Winner Function
function winner(player) {
    if (player === 'PLAYER 1') {;
        player1WinCount.textContent = Number(player1WinCount.textContent) + 1
    }
    if (player === 'PLAYER 2') {;
        player2WinCount.textContent = Number(player2WinCount.textContent) + 1
    }
    playersTurnMessage.textContent = `${player} WINS!` 
    resetButton.style.display = 'initial'
    for (let square of allSquares) { 
        deactivateSquare(square)
        square.classList.add('completed') 
    } 
}

// Draw Function
function draw() {
    for (let square of allSquares) { 
        deactivateSquare(square)
        square.classList.add('completed') 
    }
    playersTurnMessage.textContent = `IT'S A DRAW!` 
    resetButton.style.display = 'initial' 
}

// Reset Game Function
function resetGame() {
    for (let square of allSquares) { 
        square.textContent = '' 
        activateSquare(square)
        square.classList.remove('completed')
        square.classList.remove('clicked')
    }
    player1Scores = []
    player2Scores = []
    resetButton.style.display = 'none' 
    mathQuestionLine.style.display = 'none'
    grid.style.display = 'none'
    difficultyHeader.style.display = 'initial'
    playersTurnMessage.textContent = `SELECT A DIFFICULTY`
    wrongAudio.play()
}

// Add Event Listener to Reset Button
resetButton.addEventListener('click', resetGame)

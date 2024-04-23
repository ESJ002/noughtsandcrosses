const allSquares = document.querySelectorAll('.square');
const resetButton = document.querySelector('button')
const playersTurnMessage = document.querySelector('.player-turn')

for (let square of allSquares) {
    square.addEventListener('click', handleSquareClick);
}

let isPlayer1Turn = true;

function handleSquareClick(event) {
    const square = event.target;
    if (isPlayer1Turn) {
        changeToCross(square);
    } else {
        changeToNought(square);
    }
    
    isPlayer1Turn = !isPlayer1Turn;
    square.removeEventListener('click', handleSquareClick);
}


function changeToCross(square) {
    square.style.color = 'blue';
    square.textContent = 'X'
    square.style.cursor = 'default'
    playersTurnMessage.textContent = `It's Player 2's Turn`
}

function changeToNought(square) {
    square.style.color = 'red';
    square.textContent = 'O'
    square.style.cursor = 'default'
    playersTurnMessage.textContent = `It's Player 1's Turn`
}

resetButton.addEventListener('click', resetGame)

function resetGame() {
    for (let square of allSquares) {
        square.textContent = ''
        square.addEventListener('click', handleSquareClick)
        square.style.cursor = 'pointer'
    }
    playersTurnMessage.textContent = `It's Player 1's Turn`
    isPlayer1Turn = true
}

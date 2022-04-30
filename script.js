const box = document.querySelectorAll('.box')
const one = document.querySelector('.one')
const two = document.querySelector('.two')
const three = document.querySelector('.three')
const four = document.querySelector('.four')
const five = document.querySelector('.five')
const six = document.querySelector('.six')
const seven = document.querySelector('.seven')
const eight = document.querySelector('.eight')
const nine = document.querySelector('.nine')
const playerXScore = document.querySelector("#player-x")
const playerOScore = document.querySelector("#player-o")
const playerOneScore = document.querySelector('#player-one-score')
const playerTwoScore = document.querySelector('#player-two-score')
let winner

let playerXTotalScore = 0
let playerOTotalScore = 0

// checks for x or o
let playerX = true

// counts the number of pieces on the board
let pieceCount = 0

// sets a winner to false the computer will stop if it's true
let hasAWinner = false;


// store the player's last move...
let playersLastMove = []

// the game play
for (let i=0; i<box.length; i++) {
  console.log('ran the board')
  pieceCount = 0;
  // check for player x and o
  box[i].addEventListener('click', () => {
    // add to the pieceCount
    pieceCount += 1;
    console.log('piece count: ', + pieceCount)

    
    if (playerX && box[i].innerText === '') { 
      box[i].innerText = 'X'
      box[i].classList.add('letter-placed')
      console.log('[i] ', i)
      if (i !== 0 || i) {
        playersLastMove.push(i)
      }
      playerX = false
      checkWin()

      // restart game if it's a draw
      if(pieceCount >= 9) {
        checkForDraw()
      }

      console.log('hasaWinner ', hasAWinner)
      if (hasAWinner === false) {
        // this is the AI number generator
        aiPlayer()
        checkWin()
      }

      playerX = true
    }
  })
}

////! This is my Terrible AI
function aiPlayer() {
  let randomNum = Math.floor(Math.random() * 9)
  console.log('rand num: ' + randomNum)
  console.log('box(randNum).innerText : ' + box[randomNum].innerText) 
  console.log('players last move', typeof playersLastMove[playersLastMove.length - 1])
  let lastMove = playersLastMove[playersLastMove.length - 1]

  // too many hard-coded AI responses
  if (!playerX && box[4].innerText === '') { // place an AI letter in the center
    box[4].innerText = 'O'
    box[4].classList.add('letter-placed')
    pieceCount += 1
  } else if (!playerX && lastMove === 4) { // place an AI letter in the left bottom corner
    box[2].innerText = 'O'
    box[2].classList.add('letter-placed')
    pieceCount += 1
  } else if (!playerX && lastMove === 8 && box[8].innerText === '') {
    console.log('1 ahead')
    box[5].innerText = 'O'
    box[5].classList.add('letter-placed')
    pieceCount += 1
  } else if (!playerX && box[lastMove - 1].innerText === '') { // check for one behind
    console.log('1 behind')
    box[lastMove-1].innerText = 'O'
    box[lastMove-1].classList.add('letter-placed')
    pieceCount += 1
  } else if (!playerX && lastMove !== 8 && box[lastMove + 1].innerText === '') { // check for one ahead
    console.log('1 ahead')
    box[lastMove+1].innerText = 'O'
    box[lastMove+1].classList.add('letter-placed')
    pieceCount += 1
  } else if (!playerX && box[randomNum].innerText === '') {
    console.log('random placement')
    box[randomNum].innerText = 'O'
    box[randomNum].classList.add('letter-placed')
    pieceCount += 1
  } else if(pieceCount >= 9){
    checkForDraw();
  } else {
    // recursion if all are done and a random choice isn't available
    aiPlayer()
  }
}

/// It's a draw function
function checkForDraw() {
  document.querySelector('#winner').innerText = `It's a tie!`
  document.querySelector('#winner-box').style.height = '100vh'
  pieceCount = 0;
  resetBoard();
}



// this is a code just to combine some functions for below
function showWinReset(winner) {
  showWinner(winner)
  addPoints(winner)
  // stops the computer from playing if the player wins
  hasAWinner = true;
}

function checkWin(){
  if(one.innerText && one.innerText === two.innerText && one.innerText === three.innerText){
    winner = one.innerText
    showWinReset(winner)
  }else if(four.innerText && four.innerText === five.innerText && four.innerText === six.innerText){
    winner = four.innerText
    showWinReset(winner)
  } else if(seven.innerText && seven.innerText === eight.innerText && seven.innerText === nine.innerText){
    winner = seven.innerText
    showWinReset(winner)
  } else if(one.innerText && one.innerText === four.innerText && one.innerText === seven.innerText){
    winner = one.innerText
    showWinReset(winner)
  }  else if(two.innerText && two.innerText === five.innerText && two.innerText === eight.innerText){
    winner = two.innerText
    showWinReset(winner)
  } else if(three.innerText && three.innerText === six.innerText && three.innerText === nine.innerText){
    winner = three.innerText
    showWinReset(winner)
  } else if(one.innerText && one.innerText === five.innerText && one.innerText === nine.innerText){
    winner = one.innerText
    showWinReset(winner)
  } else if(three.innerText && three.innerText === five.innerText && three.innerText === seven.innerText){
    winner = three.innerText
    showWinReset(winner)
  } else {
    if (pieceCount >= 9) {
      checkForDraw()
    }
  }
}



function addPoints(winner){
  if (playerXScore.innerText === winner) {
    // add a score to player x
    playerXTotalScore += 1
    playerOneScore.innerText = playerXTotalScore
  }else if(playerOScore.innerText === winner){
    playerOTotalScore += 1
    playerTwoScore.innerText = playerOTotalScore
  }
  pieceCount = 0;
}


// reset the board
function resetBoard() {
  for(let i=0; i<box.length; i++) {
    box[i].innerText = ''
    box[i].classList.remove('letter-placed')
  }
  hasAWinner = false;

}


// show the winner 
function showWinner(winner) {
  console.log('winner box')
  if (winner === 'X') {
    document.querySelector('#winner').innerText = 'Player Wins! Magnificently executed!'
  } else {
    document.querySelector('#winner').innerText = 'Computer Wins! Seriously!?!'
  }
  document.querySelector('#winner-box').style.height = '100vh'
}


// play again button 
document.querySelector('#play-again').addEventListener('click', () => {
  document.querySelector("#winner-box").style.height = '0'
  resetBoard()
})
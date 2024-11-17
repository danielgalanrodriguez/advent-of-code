// problem_1.txt

const fs = require("fs");
const readline = require("readline");

const fileStream = fs.createReadStream("puzzle.txt");
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let currentGame = 1
let totalPoints = 0

function stripCardHeader(card) {
  return card.split(':').pop()
}

function getNumbers(card) {
  const cardWithoutHeader = stripCardHeader(card)
  const winning = cardWithoutHeader.split('|')[0].trim()
  const play = cardWithoutHeader.split('|')[1].trim()
  return {
    winning,
    play
  }
}

function checkCorrectNumbers({ winning, play }) {
  let correctNumbers = 0
  let correctNumbersArray = [] 
  const playArray = play.split(' ').filter(Boolean)
  winning.split(' ').filter(Boolean).forEach(winningNumber => {
    if (playArray.includes(winningNumber)) {
      correctNumbers++
      correctNumbersArray.push(winningNumber)    
    }
  });
  return correctNumbers
}

function updateTotalPoints(amountOfCorrectNumbers) {
  const timesToDouble = amountOfCorrectNumbers - 1
  let pointsToAdd = 0
  if(amountOfCorrectNumbers === 0) return

  pointsToAdd = Math.pow(2, timesToDouble)
  totalPoints +=  Math.pow(2, timesToDouble)
}

rl.on("line", (card) => {
  const numbers = getNumbers(card)
  const correctNumbers = checkCorrectNumbers(numbers)
  updateTotalPoints(correctNumbers)

});

rl.on("close", () => {
  console.log("Finished reading the file. Solution:", totalPoints);
});

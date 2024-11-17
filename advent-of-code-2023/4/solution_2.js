// problem_2.txt

const fs = require("fs");
const readline = require("readline");

const fileStream = fs.createReadStream("puzzle.txt");
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let currentCard = 1
let initialAmountOfCards = 214
const cardsWon = {}

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

function getMatchingNumbers(card) {
  const { winning, play } = getNumbers(card)
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

function updateWonCards(matchingNumbers) {
  let pointsAdded = 0
  while (pointsAdded < matchingNumbers) {
    pointsAdded++
    const cardWon = currentCard + pointsAdded
    if (cardWon > initialAmountOfCards) break
    if (cardsWon[cardWon]) cardsWon[cardWon]++
    else cardsWon[cardWon] = 1
  }
}

rl.on("line", (card) => {
  let timesCardProcessed = 0
  if (cardsWon[currentCard]) cardsWon[currentCard]++
  else cardsWon[currentCard] = 1

  const matchingNumbers = getMatchingNumbers(card)
  while (timesCardProcessed < cardsWon[currentCard]) {
    timesCardProcessed++
    updateWonCards(matchingNumbers)
  }

  currentCard++
});

function calculateResult() {

  return Object.values(cardsWon).reduce(
    (accumulator, currentValue) => currentValue + accumulator,
    0
  );
}

rl.on("close", () => {
  const result = calculateResult()
  console.log("Finished reading the file. Solution:", result);
});

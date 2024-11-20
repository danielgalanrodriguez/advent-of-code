const fs = require('fs')
const file = fs.readFileSync('puzzle.txt', { encoding: 'utf8' })
const puzzleHands = file.split(/\r?\n/)
const handValues = {
  "five": 7,
  "four": 6,
  "full": 5,
  "three": 4,
  "two": 3,
  "one": 2,
  "high": 1,
}

const cardValues = {
  "A": 13,
  "K": 12,
  "Q": 11,
  "J": 10,
  "T": 9,
  "9": 8,
  "8": 7,
  "7": 6,
  "6": 5,
  "5": 4,
  "4": 3,
  "3": 2,
  "2": 1,
}
const handSize = 5
let hands = []

puzzleHands.forEach(hand => {
  // Get hand and bid
  const [cards, bid] = hand.split(" ")

  // Identify hand
  const type = identifyHand(cards)

  // Store hand data
  hands.push({
    cards,
    bid: Number(bid),
    type
  })


});

// Sort hands by rank
hands.sort(compareHands)

// Show total winnings
console.log('Total winnings:', getTotalWinnings());

function identifyHand(cards) {
  let type = null
  let cardsArray = cards.split("")
  let differentCardsAmount = []

  // Get different cards with number of occurrences
  cardsArray.forEach(c => {
    const amount = countChar(cards, c)
    const foundElement = differentCardsAmount.find(e => e.amount === amount)
    if (!foundElement) { differentCardsAmount.push({ amount, occurrences: 1 }) }
    else { foundElement.occurrences++ }

  });


  // Five: All 5 cards are equal (5+5+5+5+5)
  const foundFive = differentCardsAmount.find(e => e.amount === 5)
  if (foundFive) return "five"

  // Four: 4 cards are equal (4+4+4+4+1)
  const foundFour = differentCardsAmount.find(e => e.amount === 4)
  if (foundFour) return "four"

  // Full: 3 cards equal and 2 cards equal (3+3+3+2+2)
  const foundThree = differentCardsAmount.find(e => e.amount === 3)
  const foundTwo = differentCardsAmount.find(e => e.amount === 2)
  if (foundThree && foundTwo) return "full"

  // Three: 3 cards equal and 2 different (3+3+3+1+1)
  const foundOne = differentCardsAmount.find(e => e.amount === 1)
  if (foundThree && foundOne && foundOne.occurrences === 2) return "three"

  // Two: 2 cards equal and 2 cards equal and 1 different (2+2+2+2+1)
  if (foundTwo && foundTwo.occurrences === 4) return "two"

  // One: 2 cards equal and 3 different (2+2+1+1+1)
  if (foundTwo && foundOne && foundOne.occurrences === 3) return "one"

  // High: All cards are different (1+1+1+1+1)
  if (foundOne && foundOne.occurrences === 5) return "high"
}


// From low to high value
function compareHands(a, b) {
  if (a.type === b.type) {
    return compareHandsWithSameType(a, b);
  }
  return handValues[a.type] > handValues[b.type] ? 1 : -1
}

function compareHandsWithSameType(a, b) {
  let result = 0
  let cardA = null
  let cardB = null
  let index = 0
  while (!result || index > handSize) {
    cardA = a.cards[index]
    cardB = b.cards[index]
    if (cardA !== cardB) {
      result = cardValues[cardA] > cardValues[cardB] ? 1 : -1
    }
    index++
  }

  return result
}

function getTotalWinnings() {
  let winnings = 0

  hands.forEach((hand, index) => {
    const rank = index + 1
    winnings += hand.bid * rank
  })
  return winnings
}


function countChar(str, char) {
  const re = new RegExp(char, 'g');
  return str.match(re).length;
}

module.exports = { identifyHand }

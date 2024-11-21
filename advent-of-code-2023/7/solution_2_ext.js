const fs = require('fs')
const file = fs.readFileSync('example_data.txt', { encoding: 'utf8' })
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
  "T": 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
  "J": 1,
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

hands.forEach(hand => {
  let newType = null

  // Improve hand with jokers
  const hasAJoker = hand.cards.includes("J")
  if (hasAJoker) {
    newType = improveHandWithJokers(hand.cards, hand.type)
  }
  if (newType) { hand.type = newType }
});

// Sort hands by rank
hands.sort(compareHands)

// Show total winnings
console.log('Total winnings:', getTotalWinnings());

function identifyHand(cards) {
  let cardsArray = cards.split("")
  let differentCardsAmount = []

  // Get different cards with number of occurrences
  cardsArray.forEach(c => {
    const amount = countChar(cards, c)
    const foundElement = differentCardsAmount.find(e => e.amount === amount)
    if (!foundElement) { differentCardsAmount.push({ amount, occurrences: 1 }) }
    else { foundElement.occurrences++ }

  });


  // Five: All 5 cards are equal (5+5+5+5+5) (5)
  const foundFive = differentCardsAmount.find(e => e.amount === 5)
  if (foundFive) return "five"

  // Four: 4 cards are equal (4+4+4+4+1) (4+1)
  const foundFour = differentCardsAmount.find(e => e.amount === 4)
  if (foundFour) return "four"

  // Full: 3 cards equal and 2 cards equal (3+3+3+2+2) (3+2)
  const foundThree = differentCardsAmount.find(e => e.amount === 3)
  const foundTwo = differentCardsAmount.find(e => e.amount === 2)
  if (foundThree && foundTwo) return "full"

  // Three: 3 cards equal and 2 different (3+3+3+1+1) (3+1+1)
  const foundOne = differentCardsAmount.find(e => e.amount === 1)
  if (foundThree && foundOne && foundOne.occurrences === 2) return "three"

  // Two: 2 cards equal and 2 cards equal and 1 different (2+2+2+2+1) (2+2+1)
  if (foundTwo && foundTwo.occurrences === 4) return "two"

  // One: 2 cards equal and 3 different (2+2+1+1+1) (2+1+1+1)
  if (foundTwo && foundOne && foundOne.occurrences === 3) return "one"

  // High: All cards are different (1+1+1+1+1)
  if (foundOne && foundOne.occurrences === 5) return "high"
}

function improveHandWithJokers(cards, currentType) {
  const amountOfJokers = countChar(cards, "J")

  // Cant improve a five
  if (currentType === "five") return currentType

  // Can improve a four to a five with one joker or 4 jokers
  if (currentType === "four") return "five"

  // Can improve a full to a five with 2 jokers or 3 jokers
  if (currentType === "full") return "five"

  // Can improve a three to a four with 1 jokers or 3 jokers
  if (currentType === "three") return "four"

  if (currentType === "two") {
    // Can improve a two to a four with 2 jokers 
    if (amountOfJokers === 2) return "four"

    // Can improve a two to a full with 1 joker
    if (amountOfJokers === 1) return "full"
  }

  // Can improve a one to a three with 1 or 2 jokers 
  if (currentType === "one") return "three"
  
  // High: All cards are different (1+1+1+1+1)
  // Can improve a high to a onw with 1 joker
  if (currentType === "high") return "one"

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

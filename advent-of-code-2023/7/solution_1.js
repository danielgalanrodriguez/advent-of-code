const readFile = require("../readFile");
const rankForPossibleCardsInHand = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

const handTypes = ["high", "one", "two", "three", "full", "four", "five"];

const allHands = [];

function getHandType(parsedHand) {
  const [firstCardAmount, secondCardAmount] = Object.values(parsedHand);
  const amountOfDifferentCards = Object.keys(parsedHand).length;

  if (amountOfDifferentCards == 1) return "five";
  if (amountOfDifferentCards == 2) {
    if (firstCardAmount == 4 || firstCardAmount == 1) return "four";
    return "full";
  }
  if (amountOfDifferentCards == 3) {
    if (firstCardAmount == 2 || secondCardAmount == 2) return "two";
    return "three";
  }
  if (amountOfDifferentCards == 4) return "one";
  if (amountOfDifferentCards == 5) return "high";
}

function readLine(line) {
  const parsedHand = {};
  const cardsWithAmount = {};
  const hand = line.split(" ")[0];
  const bid = line.split(" ")[1];
  hand.split("").forEach((card) => {
    let cardAmount = cardsWithAmount[card];
    if (cardAmount) {
      cardsWithAmount[card]++;
    } else {
      cardsWithAmount[card] = 1;
    }
  });
  parsedHand.type = getHandType(cardsWithAmount);
  parsedHand.originalHand = hand;
  parsedHand.bid = Number(bid);
  allHands.push(parsedHand);
}

function rankHands() {
  const totalHands = allHands.length;
  //console.log(allHands);
  //console.log("totalHands: ", totalHands);
  const fiveHands = allHands.filter((hand) => hand.type == "five");
  const fourHands = allHands.filter((hand) => hand.type == "four");
  const fullHands = allHands.filter((hand) => hand.type == "full");
  const treeHands = allHands.filter((hand) => hand.type == "three");
  const twoHands = allHands.filter((hand) => hand.type == "two");
  const oneHands = allHands.filter((hand) => hand.type == "one");
  const highHands = allHands.filter((hand) => hand.type == "high");

  console.log("fiveHands", fiveHands.length);
  console.log("fourHands", fourHands.length);
  console.log("fullHands", fullHands.length);
  console.log("treeHands", treeHands.length);
  console.log("twoHands", twoHands.length);
  console.log("oneHands", oneHands.length);
  console.log("highHands", highHands.length);

  sort(highHands, 1, "A");
}

function sort(hands, cardNumberInHand, card) {
  // cardPosition
  // cardToCheckAgainst
  const maxCardsInHand = 5;
  if (cardInHand > 5) return cardInHand;
  const foundCards = hands.filter(
    (hand) => hand.originalHand.split("")[cardInHand - 1] === "2"
  );
  console.log("foundCards: ", foundCards, cardInHand);
  if (foundCards.length) return sort(foundCards, cardInHand + 1);

  //   while (cardInHand <= maxCardsInHand ) {
  //     const foundCards = hands.filter(card => {
  //         return card.originalHand.split("")[cardInHand] ==
  //     })
  //   }
  [].sort((handA, handB) => {
    let cardPosition = 1;
    const handACards = handA.originalHand.split("");
    const handBCards = handB.originalHand.split("");
    let equals = handACards[cardPosition - 1] == handBCards[cardPosition - 1];
    while (equals && cardPosition <= 5) {
      equals = handACards[cardPosition - 1] == handBCards[cardPosition - 1];
      cardPosition++;
    }
  });
}

function setRanks() {
  const currentRank = 1;
  handTypes.forEach((type) => {
    const handsToRank = allHands.filter((hand) => hand.type == type);
    if (handsToRank.length == 1) {
      setRankToHand(handsToRank[0].originalHand, currentRank);
      currentRank++;
      return;
    }

    handsToRank.forEach((element) => {});
  });
}
function sortHands(hands, rank) {}

function setRankToHand(hand, rank) {
  const handIndex = allHands.findIndex((hand) => hand.originalHand == hand);
  if (handIndex == -1)
    throw new Error(`error setting rank ${rank} to hand ${hand} `);

  allHands[handIndex].rank = rank;
}

readFile("puzzle.txt", readLine, rankHands);

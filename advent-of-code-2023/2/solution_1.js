const fs = require("fs");
const readline = require("readline");

const fileStream = fs.createReadStream("puzzle.txt");
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const bagContent = {
  "red": 12,
  "green": 13,
  "blue": 14,
}

let currentGame = 1
let sumOfIds = 0

function stripGame(string) {
  return string.split(':').pop()
}

function getMovements(play) {
  // "3 blue, 4 red"
  return play.split(',').map(movement => {
    // "3 blue"
    const splittedMovement = movement.trim().split(' ')
    // { amount: 3, color:"blue"}
    return {
      amount: Number(splittedMovement[0]),
      color: splittedMovement.pop()
    }
  })
}

function getSinglePlays(plays) {
  const splittedPlays = plays.split(';')
  // ["3 blue, 4 red","1 red, 2 green, 6 blue", "2 green"]
  const result = splittedPlays.map((play) => {
    const movements = getMovements(play);
  })

  return result
}

function getPlays(string) {
  // "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
  let playsWithoutGame = stripGame(string)

  // ["3 blue, 4 red","1 red, 2 green, 6 blue", "2 green"]
  const splittedPlays = playsWithoutGame.split(';')
  /**
   * [
   *  [{ amount: 3, color:"blue"},[{ amount: 4, color:"red"},],
   *  [{ amount: 1, color:"red"},[{ amount: 2, color:"green"},],
   *  [...],
   *  ...
   * ]
   * */
  return splittedPlays.map((play) => {
    return getMovements(play);
  })
}


rl.on("line", (line) => {
  const plays = getPlays(line)
  let isPlayOk = true
  plays.forEach(movement => {
    movement.forEach(cube => {
      const allowedAmount = bagContent[cube.color]
      if (cube.amount > allowedAmount) isPlayOk = false
    })
  })

  if (isPlayOk) sumOfIds += currentGame
  currentGame++
});

rl.on("close", () => {
  console.log("Finished reading the file. Solution:", sumOfIds);
});

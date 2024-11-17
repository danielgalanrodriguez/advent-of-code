const fs = require("fs");
const readline = require("readline");

const fileStream = fs.createReadStream("puzzle.txt");
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let sumPowers = 0

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
  let minimumSetOfCubes = {
    "red": 0,
    "green": 0,
    "blue" : 0,
  }
  let power = 0
  const plays = getPlays(line)
  
  plays.forEach(movement => {
    movement.forEach(cube => {
      const minimumCubeAmount = minimumSetOfCubes[cube.color]
      if(cube.amount > minimumCubeAmount) minimumSetOfCubes[cube.color] = cube.amount
    })
  })
  
  console.log('minimumSetOfCubes: ', minimumSetOfCubes);
  power = minimumSetOfCubes.red * minimumSetOfCubes.green * minimumSetOfCubes.blue
  sumPowers += power
});

rl.on("close", () => {
  console.log("Finished reading the file. Solution:", sumPowers);
});

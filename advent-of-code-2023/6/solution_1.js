// problem_1.txt
const readFile = require("../readFile");
const acceleration = 1;
let races = [];
// get the race time and the record
// given a constant acceleration, figure out the winning moves

function getAmountOfWinningMoves() {
  let amountOfWinningMoves = [];
  console.log("races: ", races);
  races.forEach((race) => {
    let winningMoves = 0;
    let timeCharging = 1;
    while (timeCharging < race.time) {
      if (isMoveWinner(race, timeCharging)) winningMoves++;
      timeCharging++;
    }
    amountOfWinningMoves.push(winningMoves);
  });
  return amountOfWinningMoves;
}

function isMoveWinner({ time, distance }, timeCharging) {
  let boatAcceleration = timeCharging * acceleration;
  let remainingTime = time - timeCharging;
  return boatAcceleration * remainingTime > distance;
}

function onEachLine(line) {
  const lineArray = line.split(":");
  const dataType = lineArray[0];
  const dataArray = lineArray[1].split(" ").filter(Boolean);

  dataArray.forEach((data, index) => {
    let raceObject = races[index] ?? {};
    raceObject[dataType.toLowerCase()] = data;
    races[index] = raceObject;
  });
}

function onFileEnded() {
  const winningMoves = getAmountOfWinningMoves();
  console.log("winningMoves: ", winningMoves);
  const result = winningMoves.reduce((acc, value) => value * acc, 1);
  console.log("File processed. Amount of winning moves: ", result);
}

readFile("puzzle.txt", onEachLine, onFileEnded);

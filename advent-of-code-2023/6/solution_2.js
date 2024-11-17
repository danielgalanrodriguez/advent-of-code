// problem_1.txt
const readFile = require("../readFile");
const acceleration = 1;
let race = {};
// get the race time and the record
// given a constant acceleration, figure out the winning moves

function getAmountOfWinningMoves() {
  let winningMoves = 0;
  let timeCharging = 1;

  while (timeCharging < race.time) {
    if (isMoveWinner(race, timeCharging)) winningMoves++;
    timeCharging++;
  }

  return winningMoves;
}

function isMoveWinner({ time, distance }, timeCharging) {
  let boatAcceleration = timeCharging * acceleration;
  let remainingTime = time - timeCharging;
  return boatAcceleration * remainingTime > distance;
}

function onEachLine(line) {
  const lineArray = line.split(":");
  const dataType = lineArray[0];
  const data = lineArray[1].replaceAll(" ", "");
  race[dataType.toLowerCase()] = data;
}

function onFileEnded() {
  const winningMoves = getAmountOfWinningMoves();
  console.log("File processed. Amount of winning moves: ", winningMoves);
}

readFile("puzzle.txt", onEachLine, onFileEnded);

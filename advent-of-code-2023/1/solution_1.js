const fs = require("fs");
const readline = require("readline");

const fileStream = fs.createReadStream("puzzle.txt");
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let totalCalibrationValue = 0;

function checkStringIsNumber(string) {
  return /^[0-9]*$/.test(string);
}

rl.on("line", (line) => {
  let firstNumber = null;
  let lastNumber = null;
  let calibrationString = "";
  let calibrationNumber = null;
  const numbers = line.split("").filter((char) => {
    return checkStringIsNumber(char);
  });

  firstNumber = numbers[0];
  lastNumber = numbers.pop();

  calibrationString = firstNumber + lastNumber;
  calibrationNumber = Number(calibrationString);
  totalCalibrationValue += calibrationNumber;
});

rl.on("close", () => {
  console.log("Finished reading the file. Solution:", totalCalibrationValue);
});

const fs = require("fs");
const readline = require("readline");

const fileStream = fs.createReadStream("puzzle.txt");
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let totalCalibrationValue = 0;

const numbersWrittenInLetters = [
  { numberInLetters: "one", digit: 1 },
  { numberInLetters: "two", digit: 2 },
  { numberInLetters: "three", digit: 3 },
  { numberInLetters: "four", digit: 4 },
  { numberInLetters: "five", digit: 5 },
  { numberInLetters: "six", digit: 6 },
  { numberInLetters: "seven", digit: 7 },
  { numberInLetters: "eight", digit: 8 },
  { numberInLetters: "nine", digit: 9 },
];

function checkStringIsNumber(string) {
  return /^[0-9]*$/.test(string);
}

function identifyNumbersWrittenInLetters(string) {
  const numbersFound = []
  numbersWrittenInLetters
    .forEach(({ numberInLetters, digit }) => {
      let index = string.indexOf(numberInLetters)

      // Add until no more repeated numbers
      while (index != -1) {
        numbersFound.push({ number: digit, index })
        index = string.indexOf(numberInLetters, index + 1)
      }

    });

  return numbersFound;
}

function identifyNumbers(string) {
  return string
    .split("")
    .map((char, index) => {
      if (checkStringIsNumber(char)) {
        return {
          number: char,
          index,
        };
      }
    })
    .filter(Boolean);
}

function findIndexes(array) {
  if (!array.length) return -1;

  const sortedArray = array.sort(function (a, b) {
    return a.index - b.index;
  });

  return {
    first: sortedArray[0],
    last: sortedArray.pop(),
  };
}

function recalculateCalibration(firstNumber, lastNumber) {
  let calibrationString = "";
  let calibrationNumber = null;
  calibrationString = `${firstNumber}${lastNumber}`;
  calibrationNumber = Number(calibrationString);
  totalCalibrationValue += calibrationNumber;
}

rl.on("line", (line) => {
  const numbers = identifyNumbers(line);
  const letters = identifyNumbersWrittenInLetters(line);

  if (!numbers.length) {
    let lettersIndexes = findIndexes(letters);
    recalculateCalibration(
      lettersIndexes.first.number,
      lettersIndexes.last.number
    );
    return;
  }

  if (!letters.length) {
    recalculateCalibration(numbers[0].number, numbers.pop().number);
    return;
  }
  const finalNumbers = numbers.concat(letters)
  const indexes = findIndexes(finalNumbers);

  recalculateCalibration(
    indexes.first.number,
    indexes.last.number
  );
});

rl.on("close", () => {
  console.log("Finished reading the file. Solution:", totalCalibrationValue);
});

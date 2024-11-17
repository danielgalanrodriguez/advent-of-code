// problem_1.txt

const readFile = require("../readFile");
let seeds = [];
let seedsData = {};
let currentStep = "";
let lastStep = "";

function processLine(line) {
  if (line.length === 0) {
    if (currentStep) lastStep = currentStep;
    return
  };

  const step = line.split(":")[0];

  if (/seeds/.test(step)) {
    saveSeedsNumbers(line.split(":")[1]);
    return;
  }
  if (/map/.test(step)) {
    currentStep = step;
    return;
  }
  const data = line.split(" ").map((data) => Number(data));
  translateSeedToSoil(data);
}

function saveSeedsNumbers(data) {
  const seedNumbers = data.trim().split(" ").filter(Boolean);

  seedNumbers.forEach((seedNumber) => {
    seedsData[seedNumber] = {};
    seeds.push(Number(seedNumber));
  });
}

function translateSeedToSoil(data) {
  const [destinationRangeStart, sourceRangeStart, rangeLength] = data;
  const adaptedRange = rangeLength - 1;
  const sourceRangeEnd = sourceRangeStart + adaptedRange;

  seeds.forEach((seed) => {
    let numberToTranslate = seedsData[seed][currentStep];
    if (numberToTranslate == undefined)
      numberToTranslate = seedsData[seed][lastStep];
    if (numberToTranslate == undefined) numberToTranslate = seed;

    seedsData[seed][currentStep] = numberToTranslate;

    // First step
    if (seedsData[seed][lastStep] == undefined) {
      if (seedsData[seed][currentStep] != numberToTranslate) return
    }
    else {
      // Rest of the steps
      if (seedsData[seed][lastStep] != seedsData[seed][currentStep]) {
        return;
      }
    }

    if (
      sourceRangeStart <= numberToTranslate &&
      numberToTranslate <= sourceRangeEnd
    ) {
      //calculate destination range
      let lengthToAdd = numberToTranslate - sourceRangeStart;
      seedsData[seed][currentStep] = destinationRangeStart + lengthToAdd;
    }
  });
}

function onEnd() {
  const lowestLocationNumber = getLowestLocationNumber()
  console.log('seedsData: ', seedsData);
  console.log("Finished reading the file. Solution:", lowestLocationNumber);
}

function getLowestLocationNumber() {
  let lowestLocation = seedsData[seeds[0]]['humidity-to-location map']

  seeds.forEach(seed => {
    const seedLocation = seedsData[seed]['humidity-to-location map']
    if(seedLocation < lowestLocation) lowestLocation = seedLocation
  })
  return lowestLocation
}

readFile("puzzle.txt", processLine, onEnd);

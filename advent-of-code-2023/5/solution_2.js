// problem_2.txt
// refactored to process 1 seed at a time to about memory problems
// needs to have a sync readfile
const fs = require("fs");
const file = fs.readFileSync("puzzle.txt", { encoding: "utf8" })
let seedDataLength = 1
let rangeStartIndex = 0
let rangeLengthIndex = rangeStartIndex + 1
let currentIndex = 0
let seed = null;
let seedData = {};
let currentStep = "";
let lastStep = "";
let lowestLocation = -1

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
  const seedRanges = data.trim().split(" ").filter(Boolean);
  let seedRangeStart = Number(seedRanges[rangeStartIndex])
  let seedRangeLength = Number(seedRanges[rangeLengthIndex])
  
  if (currentIndex % 50000 == 0) logProgress(currentIndex,seedRangeLength)

  seed = seedRangeStart + currentIndex
  currentIndex++
  if (currentIndex >= seedRangeLength) {
    rangeStartIndex += 2
    console.log('rangeStartIndex: ', rangeStartIndex);
    rangeLengthIndex = rangeStartIndex + 1
  }
}

function translateSeedToSoil(data) {
  const [destinationRangeStart, sourceRangeStart, rangeLength] = data;
  const adaptedRange = rangeLength - 1;
  const sourceRangeEnd = sourceRangeStart + adaptedRange;

  let numberToTranslate = seedData[currentStep];
  if (numberToTranslate == undefined)
    numberToTranslate = seedData[lastStep];
  if (numberToTranslate == undefined) numberToTranslate = seed;

  seedData[currentStep] = numberToTranslate;

  // First step
  if (seedData[lastStep] == undefined) {
    if (seedData[currentStep] != numberToTranslate) return
  }
  else {
    // Rest of the steps
    if (seedData[lastStep] != seedData[currentStep]) {
      return;
    }
  }

  if (
    sourceRangeStart <= numberToTranslate &&
    numberToTranslate <= sourceRangeEnd
  ) {
    //calculate destination range
    let lengthToAdd = numberToTranslate - sourceRangeStart;
    seedData[currentStep] = destinationRangeStart + lengthToAdd;
  }

}

function getLowestLocationNumber() {
  const seedLocation = seedData['humidity-to-location map']
  if (lowestLocation == -1) lowestLocation = seedLocation
  if (seedLocation < lowestLocation) lowestLocation = seedLocation
}

function processFile() {
  console.log('rangeStartIndex: ', rangeStartIndex);
  readFile();

  while (rangeStartIndex < seedDataLength) {
    readFile();
  }
  console.log("Finished processing all seeds. Solution:", lowestLocation);

}

function readFile() {
  file.split(/\r?\n/).forEach((line) => {
    processLine(line)
  });

  getLowestLocationNumber()
  seedData = {}
}

processFile()



function logProgress(index,totalRange) {
  const formattedIndex = new Intl.NumberFormat().format(index)
  const formattedRange= new Intl.NumberFormat().format(totalRange)
  console.log(`progress: ${formattedIndex}/${formattedRange}`)
}
const { isNumber } = require("../utils")
const fs = require('fs')
const file = fs.readFileSync('puzzle.txt', { encoding: 'utf8' })
const fileByLine = file.split(/\r?\n/)

function isSymbol(char) {
  return !isNumber(char) && char !== '.'
}

function isAdjacentToASymbol(lineNumber, charNumber) {
  const line = fileByLine[lineNumber]
  const lastIndex = line.length - 1
  const isFirstChar = charNumber === 0
  const isLastChar = charNumber === lastIndex
  let isPreviousASymbol = false
  let isCurrentASymbol = false
  let isNextASymbol = false


  isCurrentASymbol = isSymbol(line[charNumber])

  if (isFirstChar) {
    isNextASymbol = isSymbol(line[charNumber + 1])
    return isCurrentASymbol || isNextASymbol
  }

  if (isLastChar) {
    isPreviousASymbol = isSymbol(line[charNumber - 1])
    return isCurrentASymbol || isPreviousASymbol
  }

  isPreviousASymbol= isSymbol(line[charNumber - 1])
  isNextASymbol = isSymbol(line[charNumber + 1])


  return isPreviousASymbol || isCurrentASymbol || isNextASymbol
}

function checkSurroundings(lineNumber,charNumber) {
  const lastIndex = fileByLine.length - 1
  const isFirstLine = lineNumber === 0
  const isLastLine = lineNumber === lastIndex
  let isAdjacentInPreviousLine = false
  let isAdjacentInCurrentLine = false
  let isAdjacentInNextLine = false


  isAdjacentInCurrentLine = isAdjacentToASymbol(lineNumber,charNumber)

  if (isFirstLine) {
    isAdjacentInNextLine = isAdjacentToASymbol(lineNumber + 1,charNumber)
    return isAdjacentInCurrentLine || isAdjacentInNextLine
  }

  if (isLastLine) {
    isAdjacentInPreviousLine = isAdjacentToASymbol(lineNumber - 1,charNumber)
    return isAdjacentInCurrentLine || isAdjacentInPreviousLine
  }

  isAdjacentInPreviousLine= isAdjacentToASymbol(lineNumber - 1,charNumber)
  isAdjacentInNextLine = isAdjacentToASymbol(lineNumber + 1,charNumber)


  return isAdjacentInPreviousLine || isAdjacentInCurrentLine || isAdjacentInNextLine

}

let numbers = [];
fileByLine.forEach((line, lineNumber) => {
  let currentNumber = ''
  let adjacentToASymbol = false

  line.split('').forEach((char, charNumber) => {
    if (isNumber(char)) {
      // Save
      currentNumber += char

      // Check surroundings if needed
      if(!adjacentToASymbol){
        adjacentToASymbol = checkSurroundings(lineNumber, charNumber)
      }

    }
    else {
      // If it's a symbol save the previous number if there is one and is adjacent
      currentNumber != '' && adjacentToASymbol && numbers.push(Number(currentNumber))

      // Reset number and adjacent value
      currentNumber = ''
      adjacentToASymbol = false
    }
  });

  // Line process is done, save last number
  currentNumber != '' && adjacentToASymbol && numbers.push(Number(currentNumber))

  //console.log(line,numbers);
})

let finalResult = 0
numbers.forEach(n => {
  finalResult+=n
});

// 550934
console.log('finalResult: ', finalResult);


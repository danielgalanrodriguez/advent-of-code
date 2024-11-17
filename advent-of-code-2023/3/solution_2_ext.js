const { isNumber } = require("../utils")
const fs = require('fs');
const file = fs.readFileSync('puzzle.txt', { encoding: 'utf8' })
const fileByLine = file.split(/\r?\n/)
let finalResult = 0

fileByLine.forEach((line, index) => {
  const isFirstLine = index === 0
  const isLastLine = index === fileByLine.length - 1


  line.split('').forEach((char, charIndex) => {
    let adjacentNumbers = []
    // 1. Find a gear
    if (isGear(char)) {
      // check same line
      findAdjacentNumbersInLine(line, charIndex).forEach((n) => adjacentNumbers.push(n))

      // check upper line if possible
      if (!isFirstLine) {
        // Check line above or simply retrieve number
        const isNumberInLineAbove = isNumber(fileByLine[index - 1][charIndex])
        if (isNumberInLineAbove) {
          adjacentNumbers.push(identifyNumber(fileByLine[index - 1], charIndex))
        } else {
          findAdjacentNumbersInLine(fileByLine[index - 1], charIndex).forEach((n) => adjacentNumbers.push(n))
        }
      }


      // check lower line if possible
      if (!isLastLine) {
        // Check line below or simply retrieve number
        const isNumberInLineAbove = isNumber(fileByLine[index + 1][charIndex])
        if (isNumberInLineAbove) {
          adjacentNumbers.push(identifyNumber(fileByLine[index + 1], charIndex))
        } else {
          findAdjacentNumbersInLine(fileByLine[index + 1], charIndex).forEach((n) => adjacentNumbers.push(n))
        }
      }

      // Check how many adjacent numbers we have
      // If there are only 2, calculate gear ratio and add it tot the total amount.
      if (adjacentNumbers.length === 2) updateFinalResult(adjacentNumbers)
    }
  })
});

console.log('The final gear ratio is:', finalResult);

function isGear(char) {
  return char == '*'
}

function findAdjacentNumbersInLine(line, gearLineIndex) {
  const isFirstCharInLine = gearLineIndex === 0
  const isLastCharInLine = gearLineIndex === line.length - 1
  let adjacentNumberOnLeft = ''
  let adjacentNumberOnRight = ''
  let adjacentNumbers = []

  if (!isFirstCharInLine) {
    // check left
    adjacentNumberOnLeft = findAdjacentNumbers(line, gearLineIndex, -1)
  }

  if (!isLastCharInLine) {
    // check right
    adjacentNumberOnRight = findAdjacentNumbers(line, gearLineIndex, +1)
  }

  adjacentNumberOnLeft && adjacentNumbers.push(adjacentNumberOnLeft)
  adjacentNumberOnRight && adjacentNumbers.push(adjacentNumberOnRight)

  return adjacentNumbers

}


function findAdjacentNumbers(line, charIndex, direction) {
  const lineArray = line.split('')
  let number = []
  let nextCharIndex = charIndex + direction
  let nextChar = line[nextCharIndex]

  while (isNumber(nextChar)) {
    number.push(nextChar)
    nextCharIndex += direction
    nextChar = line[nextCharIndex]
  }

  if (direction == '-1') number.reverse()
  return number.length ? Number(number.join('')) : null

}



function identifyNumber(line, numberLineIndex) {
  const lineArray = line.split('')
  let initialNumberIndex = numberLineIndex
  let nextCharIndex = numberLineIndex - 1
  let nextChar = line[nextCharIndex]

  // Find initial index
  while (isNumber(nextChar)) {
    initialNumberIndex = nextCharIndex
    nextCharIndex--
    nextChar = line[nextCharIndex]
  }

  // Find hole number
  let number = line[initialNumberIndex]
  nextCharIndex = initialNumberIndex + 1
  nextChar = line[nextCharIndex]
  while (isNumber(nextChar)) {
    number += nextChar
    nextCharIndex++
    nextChar = line[nextCharIndex]
  }


  return Number(number)

}


function updateFinalResult(adjacentNumbers) {
  finalResult += adjacentNumbers[0] * adjacentNumbers[1]
}



module.exports = { findAdjacentNumbers, identifyNumber }

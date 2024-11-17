const fs = require("fs");
const readline = require("readline");
const fileStream = fs.createReadStream("puzzle.txt");
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let lineNumber = 1

function checkCharIsNumber(char) {
  return /^[0-9]*$/.test(char);
}

function checkCharIsDod(char) {
  return char === '.';
}

function getTypeOfChar(char) {
  if (checkCharIsNumber(char)) return 'number'
  if (checkCharIsDod(char)) return 'dod'
  return 'symbol'
}


function getCurrentLine(line) {
  const lineLength = line.length
  let charIndex = 0
  const numbers = []
  const lineSymbols = []

  while (charIndex < lineLength) {
    let char = line.charAt(charIndex)
    let type = getTypeOfChar(char)

    if (type === 'dod') {
      charIndex++
      continue
    }
    if (type === 'symbol') {
      lineSymbols.push(charIndex)
      charIndex++
      continue
    }
    if (type === 'number') {
      let fullNumber = []
      do {
        fullNumber.push(
          {
            number: char,
            index: charIndex
          })
        charIndex++
        char = line.charAt(charIndex)
        type = getTypeOfChar(char)
      } while (type === 'number' && charIndex < lineLength);

      numbers.push(fullNumber)
    }
  }
  return {
    lineNumbers: numbers,
    lineSymbols
  }
}


let totalPartNumbers = 0

const historical = {
  previous: { lineSymbols: [], lineNumbers: [] },
  current: { lineSymbols: [], lineNumbers: [] },
  next: { lineSymbols: [], lineNumbers: [] },
}

function checkWithCurrentLine() {
  historical.current.lineSymbols.forEach(symbolIndex => {
    const newLine = historical.current.lineNumbers.map(lineNumber => {
      let isAdjacent = false
      let fullNumber = ''
      lineNumber.forEach(digit => {
        fullNumber += digit.number
        if (digit.index - 1 == symbolIndex) isAdjacent = true
        if (digit.index == symbolIndex) isAdjacent = true
        if (digit.index + 1 == symbolIndex) isAdjacent = true
      });

      if (isAdjacent) {
        totalPartNumbers += Number(fullNumber)
        return null
      }
      return lineNumber
    }).filter(Boolean)


    historical.current.lineNumbers = newLine
  })
}

function checkWithPreviousLine() {
  historical.previous.lineSymbols.forEach(symbolIndex => {
    const newLine = historical.current.lineNumbers.map(lineNumber => {
      let isAdjacent = false
      let fullNumber = ''
      lineNumber.forEach(digit => {
        fullNumber += digit.number
        if (digit.index - 1 == symbolIndex) isAdjacent = true
        if (digit.index == symbolIndex) isAdjacent = true
        if (digit.index + 1 == symbolIndex) isAdjacent = true
      });

      if (isAdjacent) {

        totalPartNumbers += Number(fullNumber)

        return null
      }
      return lineNumber

    }).filter(Boolean)

    historical.current.lineNumbers = newLine
  })

}
function checkPreviousLineWithCurrentLine() {
  historical.current.lineSymbols.forEach(symbolIndex => {


    const newLine = historical.previous.lineNumbers.map(lineNumber => {
      let isAdjacent = false
      let fullNumber = ''
      lineNumber.forEach(digit => {
        fullNumber += digit.number
        if (digit.index - 1 == symbolIndex) isAdjacent = true
        if (digit.index == symbolIndex) isAdjacent = true
        if (digit.index + 1 == symbolIndex) isAdjacent = true
      });

      if (isAdjacent) {

        totalPartNumbers += Number(fullNumber)

        return null
      }
      return lineNumber
    }).filter(Boolean)

    historical.current.lineNumbers = newLine
  })

}


rl.on("line", (line) => { 
  historical.current = getCurrentLine(line)
  checkWithCurrentLine()
  checkWithPreviousLine()
  checkPreviousLineWithCurrentLine()
  historical.previous = historical.current

  lineNumber++
});

rl.on("close", () => {
  console.log("Finished reading the file. Solution:", totalPartNumbers);
});

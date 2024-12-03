const { readEntireFile } = require('../../utils')


function scanCorruptedMemory(corruptedMemoryFile) {
    const regExForRealMemoryMulAndDos = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g

    const realMemoryMul = corruptedMemoryFile.match(regExForRealMemoryMulAndDos)
    const result = executeRealMullsInLine(realMemoryMul)
    return result
}

function executeRealMullsInLine(elementsInLine) {
    let lineResult = 0
    let mullEnabled = true
    const regExForDigits = /\d{1,3},\d{1,3}/g

    elementsInLine.forEach(element => {
        if (element === 'do()') mullEnabled = true
        if (element === "don't()") mullEnabled = false
        if (element !== 'do()' && element !== "don't()" && mullEnabled) {
            let digits = element.match(regExForDigits)[0].split(',')
            lineResult += (Number(digits[0]) * Number(digits[1]))
        }
    })

    return lineResult
}

const corruptedMemoryFile = readEntireFile('puzzle.txt')
const result = scanCorruptedMemory(corruptedMemoryFile)
console.log('All the added mulls results in: ', result);
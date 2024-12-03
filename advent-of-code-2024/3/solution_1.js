const { readFile } = require('../../utils')


function scanCorruptedMemory(corruptedMemoryLines) {
    const regExForRealMemoryMul = /mul\(\d{1,3},\d{1,3}\)/g
    let result = 0

    corruptedMemoryLines.forEach(line => {
        const realMemoryMul = line.match(regExForRealMemoryMul)
        const lineResult = executeRealMullsInLine(realMemoryMul)
        result += lineResult

    });

    return result
}

function executeRealMullsInLine(mullsInLine) {
    let lineResult = 0
    const regExForDigits = /\d{1,3},\d{1,3}/g

    mullsInLine.forEach(mull => {
        let digits = mull.match(regExForDigits)[0].split(',')
        lineResult += (Number(digits[0]) * Number(digits[1]))
    })

    return lineResult
}

const corruptedMemoryLines = readFile('puzzle.txt')
const result = scanCorruptedMemory(corruptedMemoryLines)
console.log('All the added mulls results in: ', result);
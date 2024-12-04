const { readFile } = require('../../utils')


function searchForXmasString(wordSearch) {
    let totalHits = 0
    let horizontalHits = 0
    let verticalHits = 0
    let diagonalHits = 0

    wordSearch.forEach((line, index) => {
        horizontalHits += findHorizontalHits(line)
        verticalHits += findVerticalHits(index, wordSearch)
        diagonalHits += findDiagonalHits(index, wordSearch)
    });

    return horizontalHits + verticalHits + diagonalHits
}

function findHorizontalHits(line) {
    const xmasRegex = /XMAS/g
    const samxRegex = /SAMX/g

    let resultForward = 0
    let resultBackwards = 0

    const matchListForward = line.match(xmasRegex)
    const matchListBackwards = line.match(samxRegex)

    resultForward = matchListForward ? matchListForward.length : 0
    resultBackwards = matchListBackwards ? matchListBackwards.length : 0
    return resultForward + resultBackwards
}

function findVerticalHits(lineIndex, data) {
    const lineLength = data[lineIndex].length
    let result = 0

    for (let charIndex = 0; charIndex < lineLength; charIndex++) {
        const verticalDown = getVerticalString(lineIndex, charIndex, data)
        if (verticalDown == "XMAS" || verticalDown == "SAMX") result++
    }

    return result
}

function getVerticalString(lineIndex, charIndex, data) {
    const xmasLength = 4
    // First char is in the current line so the maxLength is (xmasLength - 1)
    if (!data[lineIndex + (xmasLength - 1)]) return ''
    return data[lineIndex][charIndex] + data[lineIndex + 1][charIndex] + data[lineIndex + 2][charIndex] + data[lineIndex + 3][charIndex];
}

function findDiagonalHits(lineIndex, data) {
    const lineLength = data[lineIndex].length
    let result = 0
    for (let charIndex = 0; charIndex < lineLength; charIndex++) {
        const diagonalDownRight = getGetDiagonalString(lineIndex, charIndex, data, "DOWN_RIGHT")
        const diagonalDownLeft = getGetDiagonalString(lineIndex, charIndex, data, "DOWN_LEFT")

        if (diagonalDownRight === "XMAS" || diagonalDownRight === "SAMX") result++
        if (diagonalDownLeft === "XMAS" || diagonalDownLeft === "SAMX") result++
    }

    return result
}

function getGetDiagonalString(lineIndex, charIndex, data, direction) {
    const xmasLength = 4
    if (direction == "DOWN_RIGHT") {
        if (!data[lineIndex + (xmasLength - 1)] || !data[lineIndex + (xmasLength - 1)][charIndex + (xmasLength - 1)]) return ''
        return data[lineIndex][charIndex] + data[lineIndex + 1][charIndex + 1] + data[lineIndex + 2][charIndex + 2] + data[lineIndex + 3][charIndex + 3]
    }

    if (direction == "DOWN_LEFT") {
        if (!data[lineIndex + (xmasLength - 1)] || !data[lineIndex + (xmasLength - 1)][charIndex - (xmasLength - 1)]) return ''
        return data[lineIndex][charIndex] + data[lineIndex + 1][charIndex - 1] + data[lineIndex + 2][charIndex - 2] + data[lineIndex + 3][charIndex - 3];
    }

    throw new Error("Direction not found");
}


const wordSearch = readFile("puzzle.txt")
const result = searchForXmasString(wordSearch)
console.log('The amount of times XMAS is written is: ', result);

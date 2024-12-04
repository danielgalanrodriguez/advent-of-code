const { readFile } = require('../../utils')


function searchForMasInXShape(wordSearch) {
    let totalHits = 0

    // For each line:
    wordSearch.forEach((line, lineIndex) => {
        // For each char in line:
        line.split('').forEach((char, charIndex) => {
            const [diagonalDownRightHit, diagonalDownLeftHit] = findDiagonalHits(lineIndex, charIndex, wordSearch)
            if (diagonalDownRightHit && diagonalDownLeftHit) totalHits++
        })
    });

    return totalHits
}

function findDiagonalHits(lineIndex, charIndex, data) {
    const lineLength = data[lineIndex].length
    let hitRight = false
    let hitLeft = false

    const diagonalDownRight = getGetDiagonalString(lineIndex, charIndex, data, "DOWN_RIGHT")
    const diagonalDownLeft = getGetDiagonalString(lineIndex, charIndex + 2, data, "DOWN_LEFT")

    if (diagonalDownRight === "MAS" || diagonalDownRight === "SAM") hitRight = true
    if (diagonalDownLeft === "MAS" || diagonalDownLeft === "SAM") hitLeft = true

    return [hitRight, hitLeft]
}

function getGetDiagonalString(lineIndex, charIndex, data, direction) {
    const masLength = 3
    if (direction == "DOWN_RIGHT") {
        if (!data[lineIndex + (masLength - 1)] || !data[lineIndex + (masLength - 1)][charIndex + (masLength - 1)]) return ''
        return data[lineIndex][charIndex] + data[lineIndex + 1][charIndex + 1] + data[lineIndex + 2][charIndex + 2]
    }

    if (direction == "DOWN_LEFT") {
        if (!data[lineIndex + (masLength - 1)] || !data[lineIndex + (masLength - 1)][charIndex - (masLength - 1)]) return ''
        return data[lineIndex][charIndex] + data[lineIndex + 1][charIndex - 1] + data[lineIndex + 2][charIndex - 2];
    }

    throw new Error("Direction not found");
}


const wordSearch = readFile("puzzle.txt")
const result = searchForMasInXShape(wordSearch)
console.log('The amount of times XMAS is written as an X shape is: ', result);

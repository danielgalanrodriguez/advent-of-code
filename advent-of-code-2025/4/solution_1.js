const { readFile } = require('../../utils')

const diagram = readFile('puzzle.txt')
const paperRoll = '@'
let numberOfRollsWithFewerThan4Adjacent = 0

function isPaperRoll(element) {
    return element == paperRoll
}

diagram.forEach((row, rowNumber) => {
    row.split('').forEach((element, elementNumber) => {
        if (!isPaperRoll(element)) return;

        const numberOfAdjacentRolls = getNumberOfAdjacentRolls(rowNumber, elementNumber)
        if (numberOfAdjacentRolls < 4) numberOfRollsWithFewerThan4Adjacent++
    })

})


function getNumberOfAdjacentRolls(rowNumber, elementNumber) {

    const isFirstRow = rowNumber == 0
    const isLastRow = rowNumber == diagram.length - 1
    const isFirstElement = elementNumber == 0
    const isLastElement = elementNumber == diagram[rowNumber].length - 1

    let numberOfAdjacentRolls = 0

    // Row above element. First row does not have anything above.
    if (!isFirstRow) {
        // element on the left. First element does not have anything on th left.
        if (!isFirstElement && isPaperRoll(diagram[rowNumber - 1][elementNumber - 1])) numberOfAdjacentRolls++

        // element on the center
        if (isPaperRoll(diagram[rowNumber - 1][elementNumber])) numberOfAdjacentRolls++

        // element on the right. Last element does not have anything on th right.
        if (!isLastElement && isPaperRoll(diagram[rowNumber - 1][elementNumber + 1])) numberOfAdjacentRolls++
    }

    // Element row
    // element on the left. First element does not have anything on th left.
    if (!isFirstElement && isPaperRoll(diagram[rowNumber][elementNumber - 1])) numberOfAdjacentRolls++

    // element on the right. Last element does not have anything on th right.
    if (!isLastElement && isPaperRoll(diagram[rowNumber][elementNumber + 1])) numberOfAdjacentRolls++


    // Row below element. Last row does not have anything below.
    if (!isLastRow) {
        // element on the left. First element does not have anything on th left.
        if (!isFirstElement && isPaperRoll(diagram[rowNumber + 1][elementNumber - 1])) numberOfAdjacentRolls++

        // element on the center
        if (isPaperRoll(diagram[rowNumber + 1][elementNumber])) numberOfAdjacentRolls++

        // element on the right. Last element does not have anything on th right.
        if (!isLastElement && isPaperRoll(diagram[rowNumber + 1][elementNumber + 1])) numberOfAdjacentRolls++
    }

    return numberOfAdjacentRolls
}

console.log('Result:', numberOfRollsWithFewerThan4Adjacent)
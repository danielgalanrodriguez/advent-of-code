const { readFile } = require('../../utils')

const diagram = readFile('puzzle.txt')
const paperRoll = '@'
let numberOfRemovedRolls = 0

function isPaperRoll(element) {
    return element == paperRoll
}

function removeAccessiblePaperRolls() {
    diagram.forEach((row, rowNumber) => {
        row.split('').forEach((element, elementNumber) => {
            if (!isPaperRoll(element)) return;

            const numberOfAdjacentRolls = getNumberOfAdjacentRolls(rowNumber, elementNumber)
            const isRollAccessible = numberOfAdjacentRolls < 4
            if (isRollAccessible) {
                // Remove paper roll from diagram
                const updatedRow = diagram[rowNumber].split('')
                updatedRow[elementNumber] = '.'
                diagram[rowNumber] = updatedRow.join('')

                // Update number
                numberOfRemovedRolls++
            }
        })

    })
}

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

let haveAllAccessibleRollsBeenRemoved = false
let iterations = 0

while (!haveAllAccessibleRollsBeenRemoved) {
    iterations++
    let prevAdjacentRolls = numberOfRemovedRolls
    removeAccessiblePaperRolls()
    haveAllAccessibleRollsBeenRemoved = prevAdjacentRolls == numberOfRemovedRolls
}

console.log('iterations: ', iterations);
console.log('Result:', numberOfRemovedRolls)

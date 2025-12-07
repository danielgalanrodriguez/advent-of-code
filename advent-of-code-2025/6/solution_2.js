const { readFile } = require('../../utils')

/**
 * Approach:
 * Get the start and end positions of the operators, it marks the limits of the problems (start and end columns).
 * For all operants:
 *      Get all numbers:
 *          For all numbers:
 *              Get all digits of the number.
 *      Return total
 * Return grand total 
*/

const workSheet = readFile('puzzle.txt')
const operatorsInfo = getOperatorsInformation()

function getOperatorsInformation() {
    // Last row of the worksheet
    const operatorsRow = workSheet[workSheet.length - 1]
    const operatorsPosition = []

    // Go through all chars in the row. If it is an operator. Save data.
    for (let i = 0; i < operatorsRow.length; i++) {
        const char = operatorsRow[i];
        if (char != ' ') {
            const prevOperator = operatorsPosition[operatorsPosition.length - 1]
            // Skip the first one
            if (i > 0) prevOperator.endPosition = i - 2
            operatorsPosition.push({ operator: char, position: i })
        }
    }

    // Set end for last operator
    const lastOperator = operatorsPosition[operatorsPosition.length - 1]
    lastOperator.endPosition = operatorsRow.length - 1
    return operatorsPosition
}

// Process all problems in worksheet
let grandTotal = 0
const maxDigitsOfANumber = workSheet.length - 2
operatorsInfo.forEach((operatorInfo) => {
    grandTotal += resultOfProblem(operatorInfo)
})


function resultOfProblem(operatorInfo) {
    const numbers = []
    let indexProcessed = operatorInfo.position
    let amountOfNumbersProcessed = 0

    // Process all numbers. (all columns from the problem's start till the end)
    while (indexProcessed <= operatorInfo.endPosition) {
        numbers[amountOfNumbersProcessed] = ''
        let digitPosition = 0
        let currentNumber = workSheet[digitPosition][indexProcessed]

        // Get all digits of a number
        while (digitPosition <= maxDigitsOfANumber) {
            // Update only if the string is actually a digit
            if (!isNaN(parseInt(currentNumber))) {
                numbers[amountOfNumbersProcessed] += currentNumber
            }
            digitPosition++
            currentNumber = workSheet[digitPosition][indexProcessed]
        }

        indexProcessed++
        amountOfNumbersProcessed++
    }

    const result = numbers
        .map(number => parseInt(number))
        .reduce((acc, number) => {
            if (operatorInfo.operator == '+') return acc + number
            return acc == 0 ? 1 * number : acc * number
        }, 0)

    return result
}

console.log('grandTotal: ', grandTotal);
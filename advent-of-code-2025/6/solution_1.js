const { readFile } = require('../../utils')

const workSheet = readFile('puzzle.txt')

// Parse each row string to an array and remove extra empty spaces.
const workSheetMatrix = workSheet.map(problemRow => problemRow.split(' ').filter(Boolean))

// The last item is the operation
const amountOfNumbersPerProblem = workSheet.length - 1
const firstRowOfProblems = workSheetMatrix[0]
const numberOfProblems = firstRowOfProblems.length

// Process all problems in worksheet
let problem = 0
let grandTotal = 0
while (problem < numberOfProblems) {
    grandTotal += resultOfProblem(problem)
    problem++
}


function resultOfProblem(problemNumber) {
    const numbers = []
    let numbersProcessed = 0
    let operant = null

    while (!operant) {
        const currentNumber = workSheetMatrix[numbersProcessed][problemNumber]
        const isOperant = isNaN(parseInt(currentNumber))

        if (!isOperant) numbers.push(parseInt(currentNumber))
        else operant = currentNumber

        numbersProcessed++
    }

    const result = numbers.reduce((acc, number) => {
        if (operant == '+') return acc + number
        return acc == 0 ? 1 * number : acc * number
    }, 0)

    return result
}

console.log('grandTotal: ', grandTotal);
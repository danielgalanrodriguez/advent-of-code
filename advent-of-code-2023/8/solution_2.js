const fs = require('fs')
const file = fs.readFileSync('puzzle.txt', { encoding: 'utf8' })
const fileByLine = file.split(/\r?\n/)
let instructions = null
let elements = []
let steps = 0


function getElements() {
    let elementsToProcess;
    [instructions, , ...elementsToProcess] = fileByLine
    elements = elementsToProcess.map(element => {
        const elementToProcess = element.split("=")
        const instruction = elementToProcess[0].trim()
        const lastLetter = instruction.slice(-1)
        const directions = elementToProcess[1].trim().split(",")
        const left = directions[0].trim().replace("(", "")
        const right = directions[1].trim().replace(")", "")
        return {
            instruction,
            lastLetter,
            L: left,
            R: right,
        }
    })
}

function findAllInitialPositions(params) {
    return elements.filter(e => e.lastLetter == "A")
}

function processInstructions(initialPositions) {
    let currentPositions = initialPositions
    
    while (!isFinalPath(currentPositions)) {
        for (const direction of instructions.split("")) {
            steps++
            currentPositions = currentPositions.map(position => {
                return findPosition(position[direction])
                
            });
            if (steps % 1000000 == 0) console.log('Current step',new Intl.NumberFormat().format(steps))
            if (isFinalPath(currentPositions)) break;
        }
    }

}

function findPosition(instruction) {
    const index = elements.findIndex(element => element.instruction === instruction)
    return elements[index]
}

function isFinalPath(positions) {
    const nodesNotFinished = positions.filter(element => element.lastLetter !== "Z")
    return !Boolean(nodesNotFinished.length)
}

getElements()
console.log('Current step', steps);
const initialPositions = findAllInitialPositions()
processInstructions(initialPositions)
console.log('Final node found. Result:', steps);
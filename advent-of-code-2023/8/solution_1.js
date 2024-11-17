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
        const directions = elementToProcess[1].trim().split(",")
        const left = directions[0].trim().replace("(", "")
        const right = directions[1].trim().replace(")", "")
        return {
            instruction,
            L: left,
            R: right,
        }
    })
}

function processInstructions(initialPosition) {
    let currentPosition = initialPosition
    
    for (const direction of instructions.split("")) {
        steps++
        currentPosition = findPosition(currentPosition[direction])
        if(currentPosition.instruction === "ZZZ") break; 
        
    }
    if(currentPosition.instruction !== "ZZZ") return processInstructions(currentPosition)
}

function findPosition(instruction) {
    const index = elements.findIndex(element => element.instruction === instruction)
    return elements[index]
}

getElements()
const initialPosition = findPosition("AAA")
processInstructions(initialPosition)
console.log('Final node found. Result:', steps);
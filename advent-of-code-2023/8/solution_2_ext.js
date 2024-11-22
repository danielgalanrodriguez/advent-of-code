const fs = require('fs')
const file = fs.readFileSync('puzzle.txt', { encoding: 'utf8' })
const fileByLine = file.split(/\r?\n/)
const instructions = fileByLine[0]
const elements = populateElements(fileByLine.slice(2))
let initialPositions = getInitialPositions()
console.log('positions: ', initialPositions);
const shortestPathForEachPosition = initialPositions.map((p) => getShortestPath(p))
console.log('All final paths found. Steps:', shortestPathForEachPosition);
console.log('The result will be the Least Common Multiple of all those steps.');

// TODO: Maybe you want to implement an algorithm to calculate the LCM
//const result = minimumCommonMultiple(shortestPathForEachPosition)
//console.log('MCM calculation finished.Result:', result);


function populateElements(elementsToProcess) {
    const elements = {}
    elementsToProcess.map(e => {
        const node = e.split(' ')[0]
        const L = e.split('(')[1].split(',')[0]
        const R = e.split('(')[1].split(',')[1].split(')')[0].trim()
        elements[node] = { L, R }
    })
    return elements
}

function getInitialPositions() {
    let initialPositions = []
    Object.keys(elements).map(node => {
        if (node[2] === 'A') initialPositions.push(node)
    })

    return initialPositions
}

function getShortestPath(position){
        let index = 0
        let steps = 0
        const initialPosition = position
    
        while (!isFinalPosition(position)) {
            position = elements[position][instructions[index]]
            steps++
            index++
            if (index === instructions.length) index = 0
        }
        return steps
}

function isFinalPosition(position) {
    const positionEndsWithZ = position[2] === 'Z'
    return positionEndsWithZ
}

function minimumCommonMultiple(numbers){
// If you fancy :)
}
const { readFile } = require('../../utils')

const diagram = readFile('puzzle.txt')
const diagramMatrix = diagram.map(row => row.split(''))
const lastDiagramRow = diagramMatrix.length
const maxElementsPerRow = diagramMatrix[0].length

// Process first row.
const startBeamPosition = diagramMatrix[0].findIndex(element => element == 'S')
const beamPositions = { [startBeamPosition]: true }

// Start from second row. Don't process last row.
let currentRow = 1
let beamSplits = 0
while (currentRow < lastDiagramRow) {
    moveBeams(currentRow)
    currentRow++
}

function moveBeams(position) {
    Object.keys(beamPositions).forEach(beamPositionKey => {
        const beamPosition = parseInt(beamPositionKey)
        const newBeamPosition = diagramMatrix[position][beamPosition]
        // Nothing to do if it is an empty space
        if (isEmptySpace(newBeamPosition)) return

        beamSplits++
        // Delete position for current beam and split
        delete beamPositions[beamPositionKey]
        const leftNewBeam = beamPosition - 1
        const rightNewBeam = beamPosition + 1

        // With an object, we do not care about repeated ones. 
        // The property is only created once and if repeated, it will just be overwritten
        // Do care about falling outside the diagram. Only add new beans that fall inside.
        if (leftNewBeam >= 0) beamPositions[leftNewBeam] = true
        if (rightNewBeam < maxElementsPerRow) beamPositions[rightNewBeam] = true
    })
}

function isEmptySpace(char) {
    return char == '.'
}

console.log('result:', beamSplits);
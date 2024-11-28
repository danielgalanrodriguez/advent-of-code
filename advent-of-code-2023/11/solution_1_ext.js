const fs = require('fs')
const file = fs.readFileSync('puzzle.txt', { encoding: 'utf8' })
const universe = file.split(/\r?\n/)


function isGalaxy(char) {
    return char === '#'
}

function expandUniverse(expansionRatio) {
    const expandedY = universe.map((line, index) => line.split('').every(elem => !isGalaxy(elem)) ? index : null).filter(e => e !== null)
    let expandedX = []

    const universeLength = universe.length
    const lineLength = universe[0].length

    for (let index = 0; index < lineLength; index++) {
        let galaxyFound = false
        let universeIndex = 0
        while (!galaxyFound && universeIndex < universeLength) {
            galaxyFound = isGalaxy(universe[universeIndex][index])
            universeIndex++
        }
        if (!galaxyFound) expandedX.push(index)
    }

    return { expandedX, expandedY , expansionRatio}
}

function findNextGalaxy(universeIndex = 0, lineIndex = 0) {
    let line = universe[universeIndex]
    let currentLineIndex = lineIndex
    let currentUniverseIndex = universeIndex
    let elementToStudy = line[currentLineIndex]

    while (!isGalaxy(elementToStudy) && currentUniverseIndex < universe.length) {
        // move to the next element
        currentLineIndex++
        
        // Move to next universe element and reset line index
        if (currentLineIndex >= line.length) {
            currentUniverseIndex++
            line = universe[currentUniverseIndex]
            currentLineIndex = 0
        }
        
        // Update element
        elementToStudy = line?.[currentLineIndex]

    } 

    if (isGalaxy(elementToStudy)) return { universeIndex: currentUniverseIndex, lineIndex: currentLineIndex }
    return null
}

function findAllGalaxies() {
    let galaxies = []
    let nextGalaxy = findNextGalaxy()
    while (nextGalaxy) {
        galaxies.push(nextGalaxy)
        nextGalaxy = findNextGalaxy(nextGalaxy.universeIndex, nextGalaxy.lineIndex + 1)
    }
    return galaxies
}

function findMinimumDistanceToGalaxy(originGalaxy, destinyGalaxy, expandedUniverse) {
    // const stepsX = Math.abs(destinyGalaxy.lineIndex - originGalaxy.lineIndex)
    // const stepsY = Math.abs(destinyGalaxy.universeIndex - originGalaxy.universeIndex)
    const stepsX = getSteps(originGalaxy.lineIndex, destinyGalaxy.lineIndex, expandedUniverse.expandedX, expandedUniverse.expansionRatio)
    const stepsY = getSteps(originGalaxy.universeIndex, destinyGalaxy.universeIndex, expandedUniverse.expandedY, expandedUniverse.expansionRatio)
    return stepsX + stepsY
}

function getSteps(origin, destiny, expandedUniverseDimension, expansionRatio) {
    let orderedOrigin = origin < destiny ? origin : destiny
    let orderedDestiny = origin < destiny ? destiny : origin
    orderedOrigin++
    let steps = 0

    while (orderedOrigin <= orderedDestiny) {
        steps++
        if (expandedUniverseDimension.includes(orderedOrigin)) {
            steps+= (expansionRatio - 1)
        }
        orderedOrigin++
    }

    return steps
}

function getGalaxiesMinimumDistances(galaxies,expansionRatio) {
    const expandedUniverse = expandUniverse(expansionRatio)
    let minimumDistances = []

    galaxies.forEach(galaxy => {
        let nextGalaxy = findNextGalaxy(galaxy.universeIndex, galaxy.lineIndex + 1)
        
        while (nextGalaxy) {
            minimumDistances.push(findMinimumDistanceToGalaxy(galaxy, nextGalaxy, expandedUniverse));
            nextGalaxy = findNextGalaxy(nextGalaxy.universeIndex, nextGalaxy.lineIndex + 1)
        }
    })

    return minimumDistances
}

function enhancedDistanceCalculation(expansionRatio){
    const galaxies = findAllGalaxies()
    const minimumDistances = getGalaxiesMinimumDistances(galaxies,expansionRatio)
    const solution = minimumDistances.reduce((acc, curr) => acc + curr, 0)
    
    console.log('solution: ', solution);
}

enhancedDistanceCalculation(2)


module.exports = { enhancedDistanceCalculation }
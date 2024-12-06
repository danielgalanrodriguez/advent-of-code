const { readFile } = require("../../utils")

const areaMap = readFile("puzzle.txt")

const guardCoordinates = findGuardsInitialPosition(areaMap)
const visitedPositions = predictGuardsRoute(guardCoordinates, areaMap)
const totalUniqueVisitedPositions = Object.keys(visitedPositions).reduce((acc, key) => acc + visitedPositions[key].length, 0)
console.log('The total amount of unique visited positions is: ', totalUniqueVisitedPositions);

function findGuardsInitialPosition(areaMap) {
    let guardPosition = null
    let currentPosition = null
    let lineIndex = 0
    let charIndex = 0
    const lineLength = areaMap[0].length
    const mapLength = areaMap.length

    while (!guardPosition && lineIndex < mapLength) {
        currentPosition = areaMap[lineIndex][charIndex]
        if (isGuard(currentPosition)) guardPosition = [lineIndex, charIndex]

        charIndex++
        if (charIndex > lineLength) { lineIndex++; charIndex = 0 }
    }

    return guardPosition
}

function isGuard(char) {
    return char === "^"
}

function predictGuardsRoute(guardCoordinates, areaMap) {
    // Guard is facing up
    const initialDirection = [-1, 0]

    let [lineIndex, charIndex] = guardCoordinates
    let visitedPositions = { [lineIndex]: [charIndex] }
    let direction = [...initialDirection]

    let nextPosition = calculateNextPosition([lineIndex, charIndex], initialDirection, areaMap)

    while (nextPosition) {
        direction = [...nextPosition.direction]
        lineIndex = nextPosition.coordinates[0]
        charIndex = nextPosition.coordinates[1]

        if (!visitedPositions[lineIndex] || !visitedPositions[lineIndex].includes(charIndex)) {
            visitedPositions[lineIndex] ? visitedPositions[lineIndex].push(charIndex) : visitedPositions[lineIndex] = [charIndex]
        }
        nextPosition = calculateNextPosition([lineIndex, charIndex], direction, areaMap)
    }

    return visitedPositions
}

function calculateNextPosition([lineIndex, charIndex], direction, areaMap) {
    let nextLine = areaMap[lineIndex + direction[0]]
    if (!nextLine) return null

    let nextPosition = nextLine[charIndex + direction[1]]
    if (!nextPosition) return null

    while (isObstacle(nextPosition)) {
        direction = changeLineDirection(direction)

        nextLine = areaMap[lineIndex + direction[0]]
        if (!nextLine) return null

        nextPosition = nextLine[charIndex + direction[1]]
        if (!nextPosition) return null
    }

    lineIndex += direction[0]
    charIndex += direction[1]
    let coordinates = [lineIndex, charIndex]

    return { coordinates, direction }
}

function isObstacle(char) {
    return char === "#"
}

function changeLineDirection([lineDirection, charDirection]) {
    // Going up, turn right
    if (lineDirection == -1) {
        return [0, 1]
    }

    // Going right, go down
    if (charDirection == 1) {
        return [1, 0]
    }

    // Going down, turn right again (go left)
    if (lineDirection == 1) {
        return [0, -1]
    }

    // Going left, turn up
    if (charDirection == -1) {
        return [-1, 0]
    }

    throw new Error("Impossible direction!");
}

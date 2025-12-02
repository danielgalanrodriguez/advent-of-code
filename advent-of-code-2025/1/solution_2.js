const { readFile } = require("../../utils")

const instructions = readFile('./puzzle.txt')


let start = 50
let password = 0


function parseStep(step) {
    const direction = step[0]
    const distance = step.slice(1)

    return { direction, distance: parseInt(distance) }
}

// Starts NOT 0 ends NOT 0
// Starts 0 ends NOT 0
// Starts NOT 0 ends 0
instructions.forEach((step, i) => {
    const { direction, distance } = parseStep(step)
    const numberOfLaps = Math.trunc(distance / 100)
    password += numberOfLaps

    // The key is to work with the remaining distance
    const remainingDistance = distance % 100

    let endPosition = direction == 'L' ?
        (start - remainingDistance) :
        (start + remainingDistance)

    // Position correction if it falls beyond the dial limits
    if (endPosition < 0) endPosition += 100
    if (endPosition > 99) endPosition -= 100


    if (direction == 'L') {
        // Has crossed 0:
        // Ex: Starts 10, finishes 90. Path 10,9,8,...,0,...,92,91,90
        if (endPosition > start) {
            // Don't count if started at 0
            // Ex: Started 0 Finishes 90. Has not crossed, it started from 0.
            start != 0 && (password += 1)
        }
    } else {
        // Has crossed 0:
        // Ex: Starts 90, finishes 10. Path 91,92,93,...,0,...,8,9,10
        // Don't count if ends at 0
        // Ex: Starts 90 ends 0. Has not crossed, it has landed on 0.
        if (endPosition != 0 && endPosition < start) { password += 1 }
    }

    // Has Landed on 0
    // Don't count if started at 0
    // Ex: Starts 0 ends 0. It's just one full lap. Already counted
    if (start != 0 && endPosition == 0) password += 1

    start = endPosition
});

console.log('password', password);
const { readFile } = require("../../utils")

const instructions = readFile('./puzzle.txt')
let start = 50
let password = []

function parseStep(step) {
    const direction = step[0]
    const distance = parseInt(step.slice(1))

    return { direction, distance }
}

instructions.forEach(step => {
    const { direction, distance } = parseStep(step)
    let newPosition = direction == 'L' ?
        (start - distance) % 100 :
        (start + distance) % 100

    if (newPosition < 0) newPosition += 100
    if (newPosition == 0) password.push(newPosition)

    start = newPosition
});

console.log('password', password.length);


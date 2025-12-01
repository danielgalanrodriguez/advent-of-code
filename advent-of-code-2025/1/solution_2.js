const { readFile } = require("../../utils")

const instructions = readFile('./example_data.txt')


let start = 50
let password = []


function parseStep(step) {
    const direction = step[0]
    const distance = step.slice(1)

    return { direction, distance: parseInt(distance) }
}


instructions.forEach(step => {
    const { direction, distance } = parseStep(step)
    const numberOfLaps = Math.trunc(distance / 100)
    numberOfLaps > 0 && password.push(numberOfLaps)

    let newPosition = direction == 'L' ?
        (start - distance) % 100 :
        (start + distance) % 100

    if (direction == 'L') {
        if (newPosition < 0) {
            newPosition += 100;
            start != 0 && password.push(1)
        }
    } else {
        if (newPosition != 0 && start != 0 && start > newPosition) password.push(1)
    }


    if (newPosition == 0) password.push(1)

    start = newPosition
});
const result = password.reduce((acc, value) => acc + value, 0)
console.log('password: ', password.length);
console.log('password', result);

// 6288 --> too hight
const fs = require('fs')
const file = fs.readFileSync('puzzle.txt', { encoding: 'utf8' })
const fileByLine = file.split(/\r?\n/)
const instructions = fileByLine[0]
const elements = {}
const initialPosition = "AAA"
const finalPosition = "ZZZ"

populateElements(fileByLine.slice(2))

let position = initialPosition
let index = 0
let steps = 0
while (position !== finalPosition) {
    position = elements[position][instructions[index]]
    steps++
    index++
    if (index === instructions.length) index = 0
}

console.log('Final node found. Result:', steps);


function populateElements(elementsToProcess) {
 elementsToProcess.map(e => {
    const node = e.split(' ')[0]
    const L = e.split('(')[1].split(',')[0]
    const R = e.split('(')[1].split(',')[1].split(')')[0].trim()
    elements[node] = { L, R }
})
}
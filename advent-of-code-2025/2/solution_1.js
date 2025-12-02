const { readEntireFile } = require('../../utils')

const idRanges = readEntireFile('puzzle.txt').split(',')
let totalInvalidRanges = 0

idRanges.forEach(range => {
    const [start, end] = range.split('-').map(e => parseInt(e))

    for (let index = start; index <= end; index++) {
        const id = index.toString()

        // Skip number with odd number of digits. Can't have a repeated sequence
        if (id.length % 2 != 0) continue

        const sequenceLength = id.length / 2
        const sequence1 = id.slice(0, sequenceLength)
        const sequence2 = id.slice(sequenceLength)

        if (parseInt(sequence1) == parseInt(sequence2)) totalInvalidRanges += index
    }


});

console.log('result:', totalInvalidRanges);


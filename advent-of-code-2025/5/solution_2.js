const { readEntireFile } = require('../../utils')

const database = readEntireFile('puzzle.txt')
const rangeOfIngredients = database.split('\n\n')[0].split('\n')

const processedRangeOfIngredients = rangeOfIngredients.map((range) => {
    const [rangeStart, rangeEnd] = range.split('-')
    return {
        start: parseInt(rangeStart),
        end: parseInt(rangeEnd),
    }
})

// Sort ranges from smaller to bigger start
const sortedRangeOfIngredients = processedRangeOfIngredients.toSorted((a, b) => {
    return a.start - b.start
})

let totalFreshIngredients = 0
let prevRange = null
sortedRangeOfIngredients.forEach(range => {
    if (!prevRange) {
        // Do not forget that the start is inclusive. We need to count it :)
        totalFreshIngredients = range.end - range.start + 1
        prevRange = { ...range }
        return
    }

    // Compare the end of the current range with the end of the prev range.
    // If the end of the current range is <= means that it falls inside the prev range.
    // We can skip it.
    if (range.end <= prevRange.end) {
        // But don't update the range end. We want to keep the biggest one. 
        // Otherwise we'll count double if the next iteration has a bigger end than this one.
        prevRange = { ...prevRange, start: range.start }
        return
    }

    // Compare start of the rage with the end of the prev range
    // If the start is <= means that part of the range falls into the prev range.
    // Take as start the next if from the end of the first range. (end + 1)
    let newStart = range.start
    if (range.start <= prevRange.end) newStart = prevRange.end + 1

    totalFreshIngredients = totalFreshIngredients + (range.end - newStart + 1)
    prevRange = { ...range }
});


console.log('total: ', totalFreshIngredients);


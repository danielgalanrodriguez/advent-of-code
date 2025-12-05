const { readEntireFile } = require('../../utils')

const database = readEntireFile('puzzle.txt')

let [rangeOfIngredients, availableIngredients] = database.split('\n\n')
rangeOfIngredients = rangeOfIngredients.split('\n')
availableIngredients = availableIngredients.split('\n')

// Process fresh ingredient ranges
const processedRangesOfIngredients = rangeOfIngredients.map(range => {
    let [rangeStart, rangeEnd] = range.split('-')
    return {
        rangeStart: parseInt(rangeStart),
        rangeEnd: parseInt(rangeEnd),
    }
});

let freshIngredientsInKitchen = 0
const amountOfRanges = rangeOfIngredients.length
// Process available ingredients
availableIngredients.forEach((availableIngredient) => {
    let amountOfRangesChecked = 0
    let isFresh = false

    while (!isFresh && amountOfRangesChecked < amountOfRanges) {
        const { rangeStart, rangeEnd } = processedRangesOfIngredients[amountOfRangesChecked]
        // Check if ingredient is fresh
        // if it falls in the range it is fresh. range start < ingredient < range end
        if (rangeStart <= availableIngredient && availableIngredient <= rangeEnd) {
            freshIngredientsInKitchen++
            isFresh = true
        }
        amountOfRangesChecked++
    }
})

console.log('Result: ', freshIngredientsInKitchen);
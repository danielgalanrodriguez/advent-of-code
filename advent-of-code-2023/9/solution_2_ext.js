const fs = require('fs')
const file = fs.readFileSync('puzzle.txt', { encoding: 'utf8' })
const fileByLine = file.split(/\r?\n/)
const valuesHistory = fileByLine.map(line => line.split(" ").map(num => Number(num)))


// For each value
// Calculate prediction 
// Store prediction
const predictions = valuesHistory.map(vh => getValuePrediction(vh))

// Add all predictions 
const summedPredictions = predictions.reduce((prev, current) => prev + current, 0)
console.log('All predictions calculated and summed. Result:', summedPredictions);

function getValuePrediction(valueHistory) {
    console.log('processing: ', valueHistory);
    const sequences = generateAllSequences(valueHistory)

    // Make prediction for previous sequence 
    return makePrediction(sequences)
}

function generateAllSequences(valueHistory) {
    let sequences = [valueHistory]
    // Create new sequence 
    sequences.push(createNewSequence(valueHistory))
    let lastSequence = sequences[sequences.length - 1]

    // Do I have enough information? -> new sequence contains only 0s
    while (!isFinalSequence(lastSequence)) {
        // No -> create new sequence from previous one, not the original one
        sequences.push(createNewSequence(lastSequence))
        lastSequence = sequences[sequences.length - 1]
    }
    return sequences
}

// Subtract pairs of values history[1]-history[0]
function createNewSequence(sequence) {
    let newSequence = []
    let index = 1
    while (index < sequence.length) {
        newSequence.push(sequence[index] - sequence[index-1])
        index++
    }
    return newSequence
}

function isFinalSequence(sequence) {
    return sequence.every(v => v === 0)
}

function makePrediction(sequences) {
    // Start bottom up
    let reversedSequences = sequences.reverse()
    
    let prediction = reversedSequences.reduce((prev,current) => {
        return current[0] - prev
    },0);

    return prediction
}
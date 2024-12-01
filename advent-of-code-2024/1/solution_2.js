const { readFile, sortNumberList } = require("../../utils")
const { getLocationIdsFromGroups } = require("./solution_1")

function getSimilarities(group1LocationIds, group2LocationIds) {
    const similarities = []
    group1LocationIds.forEach((group1LocationId, index) => {
        const group2LocationIdOccurrences = group2LocationIds.filter(e => e === group1LocationId).length
        similarities.push(group1LocationId * group2LocationIdOccurrences)
    })

    return similarities
}

// Read data
const locationIdsByLine = readFile('puzzle.txt');

// Get the 2 numbers
// Put numbers in list
const [group1LocationIds, group2LocationIds] = getLocationIdsFromGroups(locationIdsByLine)

// Find the distances
const similarities = getSimilarities(group1LocationIds, group2LocationIds)

// Get the results for the differences
const result = similarities.reduce((prev, curr) => prev + curr, 0)
console.log('The Total similarities of the 2 lists is: ', result);

module.exports = { getLocationIdsFromGroups }
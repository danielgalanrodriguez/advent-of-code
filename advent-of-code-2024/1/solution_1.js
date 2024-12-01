const { readFile, sortNumberList } = require("../../utils")

function getLocationIdsFromGroups(locationIdsList) {
    const group1LocationIds = []
    const group2LocationIds = []

    locationIdsList.forEach(element => {
        // Get ids and remove empty elements
        const [group1Id, group2Id] = element.split(' ').filter(Boolean);
        group1LocationIds.push(group1Id)
        group2LocationIds.push(group2Id)
    });
    return [group1LocationIds, group2LocationIds]
}

function getLocationDistances(group1LocationIds, group2LocationIds) {
    const distances = []
    group1LocationIds.forEach((group1LocationId, index) => {
        const group2LocationId = group2LocationIds[index]
        distances.push(Math.abs(group1LocationId - group2LocationId))
    })

    return distances
}

// Read data
const locationIdsByLine = readFile('puzzle.txt');

// Get the 2 numbers
// Put numbers in list
const [group1LocationIds, group2LocationIds] = getLocationIdsFromGroups(locationIdsByLine)

// Sort both lists
group1LocationIds.sort(sortNumberList)
group2LocationIds.sort(sortNumberList)


// Find the distances
const distances = getLocationDistances(group1LocationIds, group2LocationIds)

// Get the results for the differences
const result = distances.reduce((prev, curr) => prev + curr, 0)
console.log('The Total distance of the 2 lists is: ', result);

module.exports = { getLocationIdsFromGroups }
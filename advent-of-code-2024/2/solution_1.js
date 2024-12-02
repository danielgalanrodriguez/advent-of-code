const { readFile, sortNumberList } = require("../../utils")

function isReportSave(report) {
    let isReportSave = true
    let currentIndex = 1
    const reportTendency = getInitialReportTendency(report)

    while (isReportSave && currentIndex < report.length) {
        let level = report[currentIndex - 1]
        let nextLevel = report[currentIndex]
        let [stepTendency, stepDifference] = getLevelsInfo(level, nextLevel)

        if (stepTendency === null || stepTendency != reportTendency || stepDifference > 3) isReportSave = false
        currentIndex++
    }

    return isReportSave
}

function getInitialReportTendency(report) {
    let level = report[0]
    let nextLevel = report[1]
    const info = getLevelsInfo(level, nextLevel)
    return info[0]
}

function getLevelsInfo(level, nextLevel) {
    const difference = level - nextLevel
    let tendency = null
    if (difference < 0) tendency = "INCREASE"
    if (difference > 0) tendency = "DECREASE"

    return [tendency, Math.abs(difference)]
}

const reports = readFile('puzzle.txt')
let reportsSave = 0
reports.forEach(report => {
    if (isReportSave(report.split(' '))) reportsSave++
});

console.log('The number of save reports is:', reportsSave);


const { readFile, sortNumberList } = require("../../utils")

function isReportSave(report, faultyTolerance = true) {
    let currentIndex = 1
    const reportTendency = getInitialReportTendency(report)

    while (currentIndex < report.length) {
        let level = report[currentIndex - 1]
        let nextLevel = report[currentIndex]
        let [stepTendency, stepDifference] = getLevelsInfo(level, nextLevel)

        if (stepTendency === null || stepTendency != reportTendency || stepDifference > 3) {
            if (faultyTolerance) {
                // Test surroundings of the 2 unsafe levels
                const reportWithoutFaultyLevel1 = [...report]
                const reportWithoutFaultyLevel2 = [...report]
                const reportWithoutFaultyLevel3 = [...report]
                const reportWithoutFaultyLevel4 = [...report]

                reportWithoutFaultyLevel1.splice(currentIndex - 2, 1)
                reportWithoutFaultyLevel2.splice(currentIndex - 1, 1)
                reportWithoutFaultyLevel3.splice(currentIndex, 1)
                reportWithoutFaultyLevel4.splice(currentIndex + 1, 1)

                const isReportSaveWithoutLevel1 = isReportSave(reportWithoutFaultyLevel1, false)
                const isReportSaveWithoutLevel2 = isReportSave(reportWithoutFaultyLevel2, false)
                const isReportSaveWithoutLevel3 = isReportSave(reportWithoutFaultyLevel3, false)
                const isReportSaveWithoutLevel4 = isReportSave(reportWithoutFaultyLevel4, false)

                if (isReportSaveWithoutLevel1 || isReportSaveWithoutLevel2 || isReportSaveWithoutLevel3 || isReportSaveWithoutLevel4) return true
                else return false
            }
            else return false
        }
        currentIndex++
    }

    return true
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
    if (isReportSave(report.split(' ').map(s => Number(s)))) reportsSave++
    else failedReports.push(report)
});

console.log('The number of save reports with 1 level of error tolerance is:', reportsSave);

const { readFile } = require("../../utils")

function getDataFromInstructions(instructions) {
    const separationLineIndex = printInstructions.indexOf("")
    const orderingRules = instructions.slice(0, separationLineIndex)
    const pagesUpdates = instructions.slice(separationLineIndex + 1)
    return [orderingRules, pagesUpdates]
}

function reArrangeOrderingRules(orderingRules) {
    let rulesObject = {}

    orderingRules.forEach(rule => {
        const [page, pageThatShouldBePrintedAfter] = rule.split('|')

        if (rulesObject[page]) rulesObject[page].push(pageThatShouldBePrintedAfter)
        else rulesObject[page] = [pageThatShouldBePrintedAfter]
    })

    return rulesObject
}

function isUpdateValid(rules, pageUpdates) {
    let isUpdateValid = true
    const pages = pageUpdates.split(',')

    pages.forEach((page, index, pages) => {
        //  Check if page is in rules
        if (rules[page]) {
            // Get previous pages
            const pagesBeforeCurrentPage = pages.slice(0, index)
            // Check if any of the previous pages are in the rules (breaks the rules)
            if (pagesBeforeCurrentPage.some(pageToCheck => rules[page].includes(pageToCheck))) isUpdateValid = false
        }
    })

    return isUpdateValid
}

const printInstructions = readFile("puzzle.txt")
const [orderingRules, pagesUpdates] = getDataFromInstructions(printInstructions)
const reArrangedOrderingRules = reArrangeOrderingRules(orderingRules)
const correctOrders = pagesUpdates.filter(pagesUpdate => {
    return isUpdateValid(reArrangedOrderingRules, pagesUpdate)
});

const result = correctOrders.reduce((acc, pagesUpdate) => {
    const pagesArray = pagesUpdate.split(',')
    const middlePageIndex = Math.floor(pagesArray.length / 2)
    return acc + Number(pagesArray[middlePageIndex])
}, 0)

console.log('The sum of the middle page in all valid updates is: ', result);
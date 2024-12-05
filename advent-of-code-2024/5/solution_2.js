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

function fixIncorrectOrders(rules, pageA, pageB) {
    // No rules, don not care about the order
    if (!rules[pageA] && !rules[pageB]) return 0

    // Only pageA has rules, prioritise only pageA
    if (rules[pageA] && !rules[pageB]) {
        return rules[pageA].includes(pageB) ? -1 : 0
    }

    // Only pageB has rules, prioritise only pageB
    if (rules[pageB] && !rules[pageA]) {
        return rules[pageB].includes(pageA) ? 1 : 0
    }

    // Both have rules
    const shouldPageAPrintBeforePageB = rules[pageA].includes(pageB)
    const shouldPageBPrintBeforePageA = rules[pageB].includes(pageA)
    
    const impossibleOrder = shouldPageAPrintBeforePageB && shouldPageBPrintBeforePageA
    if (impossibleOrder) console.log('impossibleOrder: ', impossibleOrder);
    
    if (shouldPageAPrintBeforePageB) return -1
    if (shouldPageBPrintBeforePageA) return 1
    return 0
}

const printInstructions = readFile("puzzle.txt")
const [orderingRules, pagesUpdates] = getDataFromInstructions(printInstructions)
const reArrangedOrderingRules = reArrangeOrderingRules(orderingRules)
const incorrectPageOrders = pagesUpdates.filter(pagesUpdate => {
    return !isUpdateValid(reArrangedOrderingRules, pagesUpdate)
});

const correctedOrders = incorrectPageOrders.map(incorrectOrder => {
    return incorrectOrder.split(',').sort((a, b) => fixIncorrectOrders(reArrangedOrderingRules, a, b))
})

const result = correctedOrders.reduce((acc, pagesUpdate) => {
    const middlePageIndex = Math.floor(pagesUpdate.length / 2)
    return acc + Number(pagesUpdate[middlePageIndex])
}, 0)

console.log('After correcting the wrong updates. The sum of the middle page is: ', result);
const { readFile } = require('../../utils')

const batteryBanks = readFile('puzzle.txt')
const maxJoltagePerBank = []

function getMaxJoltage(bank) {
    let maxJoltage = 1
    let bankPosition = 0

    bank.forEach((batteryJoltage, i) => {
        let currentBatteryJoltage = parseInt(batteryJoltage)
        if (currentBatteryJoltage > maxJoltage) {
            maxJoltage = currentBatteryJoltage
            bankPosition = i
        }
    })

    return { maxJoltage, bankPosition }
}

batteryBanks.forEach(bank => {
    // Get the first max Joltage
    // The second Joltage has to come after the first on, so don't care about the last item in this first check.
    // It does not have any other Joltage behind so we cannot use it.
    const { maxJoltage: maxJoltage1, bankPosition } = getMaxJoltage(bank.split('').slice(0, -1))

    // Get the second max Joltage
    // The second Joltage has to come after the first on, so only care about anything after the first one.
    const { maxJoltage: maxJoltage2 } = getMaxJoltage(bank.split('').slice(bankPosition + 1))

    maxJoltagePerBank.push(`${maxJoltage1}${maxJoltage2}`)

});
const result = maxJoltagePerBank.reduce((acc, joltage) => acc + parseInt(joltage), 0)
console.log('result: ', result);
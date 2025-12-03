const { readFile } = require('../../utils')

const batteryBanks = readFile('puzzle.txt')
const numberOfBatteries = 12
const maxJoltagePerBank = []

function getMaxJoltage(bank, remainingNumberOfBatteries, rangeStart) {
    let maxJoltage = 1
    let maxJoltagePosition = rangeStart
    let currentPosition = rangeStart

    // Ex: 12 batteries remaining, we need at least 11 batteries after.
    // Remember: 0 based index :)
    const rangeEnd = bank.length - remainingNumberOfBatteries

    while (currentPosition <= rangeEnd) {
        let currentBatteryJoltage = parseInt(bank[currentPosition])
        if (currentBatteryJoltage > maxJoltage) {
            maxJoltage = currentBatteryJoltage
            maxJoltagePosition = currentPosition
        }
        currentPosition++
    }

    return { maxJoltage, maxJoltagePosition }
}

batteryBanks.forEach(bank => {
    const bankMaxJoltage = []
    let remainingNumberOfBatteries = numberOfBatteries

    // Get the first max Joltage
    // We need to get 12 batteries so at least we need 11 batteries after the first one. (-11)
    let maxJoltage
    let maxJoltagePosition = 0

    while (remainingNumberOfBatteries > 0) {
        // Get the rest of the max Joltages
        // The next Joltage has to come after the previous one, so only care about batteries after the previous one.
        ({ maxJoltage, maxJoltagePosition } = getMaxJoltage(bank.split(''), remainingNumberOfBatteries, maxJoltagePosition))

        bankMaxJoltage.push(maxJoltage)
        remainingNumberOfBatteries--
        maxJoltagePosition++
    }

    maxJoltagePerBank.push(bankMaxJoltage.join(''))
});
const result = maxJoltagePerBank.reduce((acc, joltage) => acc + parseInt(joltage), 0)
console.log('result: ', result);
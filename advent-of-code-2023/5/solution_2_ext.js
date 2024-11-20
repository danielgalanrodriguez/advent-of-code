const { isNumber } = require("../utils")
const fs = require('fs')
const file = fs.readFileSync('puzzle.txt', { encoding: 'utf8' })
const fileByLine = file.split(/\r?\n/)

const steps = {
  STEP_1: {
    name: 'seed-to-soil map:',
    instructions: null
  },
  STEP_2: {
    name: 'soil-to-fertilizer map:',
    instructions: null
  },
  STEP_3: {
    name: 'fertilizer-to-water map:',
    instructions: null
  },
  STEP_4: {
    name: 'water-to-light map:',
    instructions: null
  },
  STEP_5: {
    name: 'light-to-temperature map:',
    instructions: null
  },
  STEP_6: {
    name: 'temperature-to-humidity map:',
    instructions: null
  },
  STEP_7: {
    name: 'humidity-to-location map:',
    instructions: null
  },
}


getInstructionsForAllSteps()

// Grab seed ranges
const seedRanges = getSeeds()
// Sort seed range start from lower to higher
seedRanges.sort((a, b) => {
  return a.seedStart - b.seedStart
})
//console.log('seeds: ', seedRanges);
// seedRanges.forEach(sr => {
//   console.log('------------');
//   console.log('start', Intl.NumberFormat('en-es').format(sr.seedStart));
//   console.log('end', Intl.NumberFormat('en-es').format(sr.seedEnd));
//   console.log('seeds to cover:', Intl.NumberFormat('en-es').format(sr.range));

// })

let nearestLocation = null

const range = seedRanges[0]
let seed = range.seedStart

while (seed <= range.seedEnd) {
  console.log('nearestLocation: ', nearestLocation);
  console.log('seed: ', seed);
  // Step 1 Transform to: soil 
  const soil = translateToNextStep(steps.STEP_1.instructions, seed)

  // Step 2 Transform to: fertiliser 
  const fertiliser = translateToNextStep(steps.STEP_2.instructions, soil)

  // Step 3 Transform to: water 
  const water = translateToNextStep(steps.STEP_3.instructions, fertiliser)

  // Step 4 Transform to: light
  const light = translateToNextStep(steps.STEP_4.instructions, water)

  // Step 5 Transform to: temperature
  const temperature = translateToNextStep(steps.STEP_5.instructions, light)

  // Step 6 Transform to: humidity
  const humidity = translateToNextStep(steps.STEP_6.instructions, temperature)

  // Step 7 Transform to: location
  const location = translateToNextStep(steps.STEP_7.instructions, humidity)

  if (!nearestLocation) { nearestLocation = location }
  else {
    location < nearestLocation ? nearestLocation = location : null
  }
  console.log(location);
  seed++
}

// result
console.log('Nearest location is:', nearestLocation);
//console.log(getNearestLocation())
//console.log('seeds: ', seeds);

function getSeeds() {
  const seedInfo = fileByLine[0].split(" ")
  let seeds = []

  // First item is the text (remove), rest are the seeds
  seedInfo.shift()

  let index = 0
  while (index < seedInfo.length) {
    const seedStart = Number(seedInfo[index])
    const range = Number(seedInfo[index + 1])
    const seedEnd = seedStart + range - 1
    seeds.push({
      seedStart,
      seedEnd,
      range
    })
    index += 2
  }
  return seeds
}

function getInstructions(step) {
  let instructions = []
  const initialIndex = fileByLine.indexOf(step)
  let index = initialIndex + 1
  let line = fileByLine[index].split(" ")

  while (isNumber(line[0])) {

    const range = Number(line[2])
    const rangeLength = range - 1
    const targetStart = Number(line[0])
    const targetEnd = targetStart + rangeLength
    const originStart = Number(line[1])
    const originEnd = originStart + rangeLength

    instructions.push({
      originStart,
      originEnd,
      targetStart,
      targetEnd,
      range,
    })
    index++

    // Is end of file?
    if (index < fileByLine.length) { line = fileByLine[index].split(" ") }
    else { line = [] }
  }

  // console.log('instructions: ', instructions);
  return instructions
}

function getInstructionsForAllSteps() {
  steps.STEP_1.instructions = getInstructions(steps.STEP_1.name)
  steps.STEP_2.instructions = getInstructions(steps.STEP_2.name)
  steps.STEP_3.instructions = getInstructions(steps.STEP_3.name)
  steps.STEP_4.instructions = getInstructions(steps.STEP_4.name)
  steps.STEP_5.instructions = getInstructions(steps.STEP_5.name)
  steps.STEP_6.instructions = getInstructions(steps.STEP_6.name)
  steps.STEP_7.instructions = getInstructions(steps.STEP_7.name)

}

function translateToNextStep(instructions, origin) {
  let translatedStep = origin
  let instructionsIndex = 0

  while (translatedStep == origin && instructionsIndex < instructions.length) {
    const i = instructions[instructionsIndex]
    if (i.originStart <= origin && origin <= i.originEnd) {
      const offset = origin - i.originStart
      translatedStep = i.targetStart + offset
    }

    instructionsIndex++
  }

  return translatedStep
}

function getNearestLocation() {
  let nearestLocation = seeds[0].location

  seeds.forEach(seed => {
    if (seed.location < nearestLocation) nearestLocation = seed.location
  })

  return nearestLocation
}
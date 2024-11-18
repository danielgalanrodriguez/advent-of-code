const { isNumber } = require("../utils")
const fs = require('fs')
const file = fs.readFileSync('puzzle.txt', { encoding: 'utf8' })
const fileByLine = file.split(/\r?\n/)

const steps = {
  STEP_1: 'seed-to-soil',
  STEP_2: 'soil-to-fertilizer',
  STEP_3: 'fertilizer-to-water',
  STEP_4: 'water-to-light',
  STEP_5: 'light-to-temperature',
  STEP_6: 'temperature-to-humidity',
  STEP_7: 'humidity-to-location',
}

// Grab seeds
const seeds = getSeeds()

// Transform to: soil 
let instructions = getInstructions(`${steps.STEP_1} map:`)
seeds.forEach(seed => {
  seed.soil = translateToNextStep(instructions, seed.number)
});

// Transform to: fertiliser 
instructions = getInstructions(`${steps.STEP_2} map:`)
seeds.forEach(seed => {
  seed.fertiliser = translateToNextStep(instructions, seed.soil)
});

// Transform to: water 
instructions = getInstructions(`${steps.STEP_3} map:`)
seeds.forEach(seed => {
  seed.water = translateToNextStep(instructions, seed.fertiliser)
});
// Transform to: light
instructions = getInstructions(`${steps.STEP_4} map:`)
seeds.forEach(seed => {
  seed.light = translateToNextStep(instructions, seed.water)
});
// Transform to: temperature
instructions = getInstructions(`${steps.STEP_5} map:`)
seeds.forEach(seed => {
  seed.temperature = translateToNextStep(instructions, seed.light)
});
// Transform to: humidity
instructions = getInstructions(`${steps.STEP_6} map:`)
seeds.forEach(seed => {
  seed.humidity = translateToNextStep(instructions, seed.temperature)
});
// Transform to: location
instructions = getInstructions(`${steps.STEP_7} map:`)
seeds.forEach(seed => {
  seed.location = translateToNextStep(instructions, seed.humidity)
});

// result
console.log(getNearestLocation())
//console.log('seeds: ', seeds);

function getSeeds() {
  const seedInfo = fileByLine[0].split(" ")

  // First item is the text (remove), rest are the seeds
  seedInfo.shift()
  return seedInfo.map(seedNumber => ({ number: Number(seedNumber) }))
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

function translateToNextStep(instructions, origin) {
  let translatedStep = origin
  let instructionsIndex = 0

  while (translatedStep == origin && instructionsIndex < instructions.length){
    const i = instructions[instructionsIndex]
    if(i.originStart <= origin && origin <= i.originEnd) {
      const offset = origin - i.originStart
      translatedStep = i.targetStart + offset
     }

     instructionsIndex++
  }

  return translatedStep
}

function getNearestLocation(){
  let nearestLocation = seeds[0].location

  seeds.forEach(seed => {
    if(seed.location < nearestLocation) nearestLocation = seed.location
  })

  return nearestLocation
}
const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs')
const file = fs.readFileSync('test_data_copy.txt', { encoding: 'utf8' })
const testHands = file.split(/\r?\n/)

const { identifyHand } = require('./solution_1_ext')

describe('Test hand identification', () => {
  testHands.forEach(hand => {
    const [cards, bid, result] = hand.split(" ")
    assert.equal(identifyHand(cards), result, `Testing ${result}-${cards}`);

  });


});


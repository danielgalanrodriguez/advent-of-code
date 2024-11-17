const { describe, it } = require('node:test');
const assert = require('node:assert');

const { findAdjacentNumbers, identifyNumber } = require('./solution_2_ext')

describe('Test adjacent numbers in same line', () => {
  let line = ""

  it('should find no adjacent numbers', () => {
    line = '.2.*.2....'
    assert.equal(findAdjacentNumbers(line, 3, -1), null, 'Alone center left');
    assert.equal(findAdjacentNumbers(line, 3, 1), null, 'Alone center right');


    line = '*....2....'
    assert.equal(findAdjacentNumbers(line, 0, -1), null, 'Alone first left');
    assert.equal(findAdjacentNumbers(line, 0, 1), null, 'Alone first right');

    line = '.........*'
    assert.equal(findAdjacentNumbers(line, 9, -1), null, 'Alone last left');
    assert.equal(findAdjacentNumbers(line, 9, 1), null, 'Alone last right');
  });

  it('should find an adjacent number on the left', () => {
    line = '123*......'
    assert.equal(findAdjacentNumbers(line, 3, -1), 123, 'First left');

    line = '......123*'
    assert.equal(findAdjacentNumbers(line, 9, -1), 123, 'Last left');


    line = '....123*..'
    assert.equal(findAdjacentNumbers(line, 7, -1), 123, 'Center left');
  });

  it('should find an adjacent number on the right', () => {
    line = '*123......'
    assert.equal(findAdjacentNumbers(line, 0, 1), 123, 'First right');

    line = '......*123'
    assert.equal(findAdjacentNumbers(line, 6, 1), 123, 'Last right');

    line = '....*123..'
    assert.equal(findAdjacentNumbers(line, 4, 1), 123, 'Center right');
  });
});

describe('Test adjacent numbers in other line', () => {
  it('should find an adjacent number on other line', () => {
    line = '12345678.....'
    //     '...*......'
    assert.equal(identifyNumber(line, 3), 12345678, 'Gear in center of the number');

    line = '12345678.....'
    //     '*.........'
    assert.equal(identifyNumber(line, 0), 12345678, 'Gear in start of the number and line');

    line = '12345678.....'
    //     '.......*..'
    assert.equal(identifyNumber(line, 7), 12345678, 'Gear in end of the number');
  });
});
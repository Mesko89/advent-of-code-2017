const knotHash = require('./knotHash');

function multiplyFirstTwo(array) {
  return array[0] * array[1];
}

module.exports = {
  part1: (inputLines, base = 256) => multiplyFirstTwo(
    knotHash.calculateHash(inputLines[0].split(/,\s*/).map(v => parseInt(v)), 1, base)
  ),
  part2: (inputLines, base = 256) => knotHash(inputLines[0], base)
    .map(value => value.toString(16).padStart(2, '0')).join(''),
  knotHash
}
function parseGenerators(lines, factors, numberCheckers) {
  function createGenerator(startValue, factor, checkNumber) {
    let currentValue = startValue;
    const modulo = 2147483647;
    const generate = () => (currentValue * factor) % modulo;
    return () => {
      do {
        currentValue = generate();
      } while (!checkNumber(currentValue));
      return currentValue;
    };
  }
  return lines.map(line => {
    const [_, generatorName, startValueResult] = line.match(/Generator (\w+) starts with (\d+)/);
    return createGenerator(
      parseInt(startValueResult), 
      factors[generatorName],
      numberCheckers[generatorName]
    );
  });
}

function countPairs(generators, totalPairsToConsider) {
  function isGoodPair(number1, number2) {
    return number1 % 65536 === number2 % 65536;
  }
  return Array.from({ length: totalPairsToConsider })
    .filter(() => {
      const number1 = generators[0]();
      const number2 = generators[1]();
      return isGoodPair(number1, number2);
    })
    .length;
}

module.exports = {
  part1: (inputLines, totalPairsToConsider = 40e6) => countPairs(
    parseGenerators(inputLines, {
      'A': 16807,
      'B': 48271
    }, {
      'A': () => true,
      'B': () => true
    }),
    totalPairsToConsider
  ),
  part2: (inputLines, totalPairsToConsider = 5e6) => countPairs(
    parseGenerators(inputLines, {
      'A': 16807,
      'B': 48271
    }, {
      'A': number => number % 4 === 0,
      'B': number => number % 8 === 0
    }),
    totalPairsToConsider
  )
}
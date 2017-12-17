function findNewIndex(currentIndex, length, steps) {
  return (currentIndex + length + steps) % length;
}

function spinLock(steps, continueTill) {
  const memory = [0];
  let currentIndex = 0;
  let valueToInsert = 1;
  do {
    currentIndex = findNewIndex(currentIndex, memory.length, steps) + 1;
    memory.splice(currentIndex, 0, valueToInsert++);
  } while (valueToInsert <= continueTill);
  return memory;
}

function optimizedSpinLock(steps, continueTill) {
  let valueAfterZero = undefined;
  let currentIndex = 0;
  let length = 1;
  let valueToInsert = 1;
  do {
    currentIndex = findNewIndex(currentIndex, length, steps) + 1;
    if (currentIndex === 1) {
      valueAfterZero = valueToInsert;
    }
    length++;
    valueToInsert++;
  } while (valueToInsert <= continueTill);
  return valueAfterZero;
}

module.exports = {
  part1: (inputLines, continueTill = 2017) => {
    const memory = spinLock(parseInt(inputLines[0]), continueTill);
    const index = memory.findIndex(v => v === continueTill);
    return memory[(index + 1) % memory.length];
  },
  part2: (inputLines, continueTill = 50000000) => optimizedSpinLock(
    parseInt(inputLines[0]),
    continueTill
  )
}

function simulateJumps(instructions, getNextInstructionValue) {
  const values = Array.from(instructions);
  let pointer = 0;
  let steps = 0;
  do {
    const jumpValue = values[pointer];
    values[pointer] = getNextInstructionValue(values[pointer]);
    pointer += jumpValue;
    steps++;
  } while (pointer >= 0 && pointer < values.length);
  return steps;
}

module.exports = {
  part1: (inputLines) => simulateJumps(
    inputLines.map(v => parseInt(v)),
    instructionValue => instructionValue + 1
  ),
  part2: (inputLines) => simulateJumps(
    inputLines.map(v => parseInt(v)),
    instructionValue => instructionValue >= 3 
      ? (instructionValue - 1)
      : (instructionValue + 1)
  )
}
const instructionRx = /(\w+) (inc|dec) (-?\d+) if ((\w+).*)/;

function createRegisters(onChange = () => {}) {
  const state = {};
  const get = (register) => state[register] || 0;
  const set = (register, value) => {
    state[register] = value;
    onChange.call(null, value, register);
  };
  return { state, get, set };
}

function runProgram(instructions, registers) {
  instructions.forEach((instruction) => {
    const [_, register, command, by, exp, expRegister] = instruction.match(instructionRx);
    if (!eval(exp.replace(expRegister, registers.get(expRegister)))) return;
    switch (command) {
      case 'inc':
        registers.set(register, registers.get(register) + parseInt(by));
        break;
      case 'dec':
        registers.set(register, registers.get(register) - parseInt(by));
        break;
    }
  });
  return registers;
}

module.exports = {
  part1: (inputLines) => Object.values(runProgram(
      inputLines, 
      createRegisters()
    ).state)
    .reduce((currentMax, value) => {
      if (currentMax < value) return value;
      return currentMax;
    }, Number.MIN_SAFE_INTEGER),
  part2: (inputLines) => {
    let currentMax = Number.MIN_SAFE_INTEGER;
    const changedHandler = (value) => {
      if (currentMax < value) currentMax = value;
    }
    Object.values(runProgram(inputLines, createRegisters(changedHandler)));
    return currentMax;
  }
}
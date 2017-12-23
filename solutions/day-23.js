const delay = timeInMs => new Promise(res => setTimeout(res, timeInMs));

function parseProgram(instructions) {
  const toCommand = (line) => {
    const matches = line.match(/^(\w{3})\s*(\w)\s*(-?\d+|\w)?$/);
    return {
      command: matches[1],
      args: matches.slice(2).filter(v => typeof v !== 'undefined')
    };
  }
  return instructions.map(toCommand);
}

function runProgram(program, registry = {}) {
  const getFromRegistry = register => registry[register] || (registry[register] = 0);
  const getValue = val => /\d+/.test(val) ? parseInt(val) : getFromRegistry(val);
  const setValue = (register, val) => registry[register] = getValue(val);

  let pointer = 0;
  const instructions = {
    set: (X, Y) => setValue(X, Y),
    sub: (X, Y) => setValue(X, getValue(X) - getValue(Y)),
    mul: (X, Y) => setValue(X, getValue(X) * getValue(Y)),
    jnz: (X, Y) => {
      if (getValue(X) !== 0) {
        pointer += getValue(Y) - 1;
      }
    }
  }
  const stats = Object.keys(instructions).reduce((map, command) => {
    map[command] = 0;
    return map;
  }, {});

  while (program[pointer]) {
    instructions[program[pointer].command](...program[pointer].args);
    stats[program[pointer].command]++;
    pointer++;
  }
  stats.registry = registry;
  return stats;
}

function isPrime(value) {
  for (let i = 2; i < Math.sqrt(value); i++) {
    if ((value / i) === Math.floor(value / i)) {
      return false;
    }
  }
  return true;
}

module.exports = {
  part1: (inputLines) => {
    const program = parseProgram(inputLines);
    const stats = runProgram(program);
    return stats.mul;
  },
  part2: () => {
    const b = 108400;
    const c = 125400;
    let h = 0;
    Array.from({ length: (c - b) / 17 + 1 }).forEach((_, i) => {
      const value = i * 17 + b;
      if (!isPrime(value)) {
        h++;
      }
    });
    return h;
  }
}

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

async function runProgram(program, send, receives, registry = {}) {
  const getFromRegistry = register => registry[register] || (registry[register] = 0);
  const getValue = val => /\d+/.test(val) ? parseInt(val) : getFromRegistry(val);
  const setValue = (register, val) => registry[register] = getValue(val);

  let running = true;
  let pointer = 0;
  const instructions = {
    snd: (X) => send(getValue(X)),
    set: (X, Y) => setValue(X, Y),
    add: (X, Y) => setValue(X, getValue(X) + getValue(Y)),
    mul: (X, Y) => setValue(X, getValue(X) * getValue(Y)),
    mod: (X, Y) => setValue(X, getValue(X) % getValue(Y)),
    rcv: async (X) => {
      const value = await receives();
      if (value === false) {
        running = false;
      } else {
        setValue(X, value);
      }
    },
    jgz: (X, Y) => {
      if (getValue(X) > 0) {
        pointer += getValue(Y) - 1;
      }
    }
  }

  while (running && program[pointer]) {
    await instructions[program[pointer].command](...program[pointer].args);
    pointer++;
  }
}

module.exports = {
  part1: async (inputLines) => {
    const program = parseProgram(inputLines);
    let lastFrequency = undefined;
    await runProgram(
      program,
      frequency => lastFrequency = frequency,
      () => false
    );
    return lastFrequency;
  },
  part2: async (inputLines) => {
    const program = parseProgram(inputLines);
    const MAX_RECEIVE_RETRIES = 10;
    const receiver = (queue) => async () => {
      let retries = 0;
      if (queue.length === 0) {
        while (queue.length === 0) {
          if (retries >= MAX_RECEIVE_RETRIES) return false;
          retries++;
          await delay(1);
        }
      }
      return queue.shift();
    };
    let lastFrequency = undefined;
    let timesSend = [0, 0];
    let queues = [[], []];
    let p1 = runProgram(
      program,
      value => {
        timesSend[0]++;
        queues[1].push(value)
      },
      receiver(queues[0]),
      { p: 0 }
    );
    let p2= runProgram(
      program,
      value => {
        timesSend[1]++;
        queues[0].push(value)
      },
      receiver(queues[1]),
      { p: 1 }
    );
    await Promise.all([p1, p2]);
    return timesSend[1];
  }
}

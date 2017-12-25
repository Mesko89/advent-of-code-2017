function parseTuringMachine(inputLines) {
  const moveLeft = currentPosition => currentPosition - 1;
  const moveRight = currentPosition => currentPosition + 1;
  const writeOne = (tape, position) => tape.set(position, 1);
  const writeZero = (tape, position) => tape.set(position, 0);
  const nextState = state => () => state;

  const [startState] = inputLines[0].match(/state (\w)\.$/).slice(1);
  const [totalSteps] = inputLines[1].match(/after (\d+) steps\.$/).slice(1);
  const states = {};
  for (let i = 2; i < inputLines.length; i += 9) {
    const [state] = inputLines[i + 0].match(/In state (\w):/).slice(1);
    
    const [valueToWriteIfZero] = inputLines[i + 2].match(/Write the value (\d)./).slice(1);
    const [moveToIfZero] = inputLines[i + 3].match(/Move one slot to the (right|left)./).slice(1);
    const [continueToIfZero] = inputLines[i + 4].match(/Continue with state (\w)./).slice(1);

    const [valueToWriteIfOne] = inputLines[i + 6].match(/Write the value (\d)./).slice(1);
    const [moveToIfOne] = inputLines[i + 7].match(/Move one slot to the (right|left)./).slice(1);
    const [continueToIfOne] = inputLines[i + 8].match(/Continue with state (\w)./).slice(1);
    
    states[state] = {
      '0': {
        write: valueToWriteIfZero === '1' ? writeOne : writeZero,
        move: moveToIfZero === 'right' ? moveRight : moveLeft,
        nextState: nextState(continueToIfZero)
      },
      '1': {
        write: valueToWriteIfOne === '1' ? writeOne : writeZero,
        move: moveToIfOne === 'right' ? moveRight : moveLeft,
        nextState: nextState(continueToIfOne)
      }
    };
  }

  return {
    startState,
    totalSteps: parseInt(totalSteps),
    states
  }
}

function runTuringMachine(turingMachine) {
  const tape = {};
  tape.get = (position) => tape[position] || 0;
  tape.set = (position, value) => tape[position] = value;

  let cursor = 0;
  let currentState = turingMachine.startState;
  while (turingMachine.totalSteps--) {
    const state = turingMachine.states[currentState];
    const value = tape.get(cursor);
    state[value].write(tape, cursor);
    cursor = state[value].move(cursor);
    currentState = state[value].nextState();
  }
  return tape;
}

module.exports = {
  part1: (inputLines) => {
    const turingMachine = parseTuringMachine(inputLines);
    const tape = runTuringMachine(turingMachine);
    return Object.values(tape).filter(v => v === 1).length;
  },
  part2: (inputLines) => {
  }
}

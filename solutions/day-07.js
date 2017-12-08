const programRegex = /^(\w+) \((\d+)\)(?: -> (.*)$)?/;

function parsePrograms(programsInput) {
  const programs = {};
  programsInput.forEach(programInput => {
    const matches = programInput.match(programRegex);
    const name = matches[1];
    const weight = parseInt(matches[2]);
    const holding = matches[3] ? matches[3].split(', ') : [];
    programs[name] = { name, weight, holding };
  });
  return programs;
}

function findRoot(programs) {
  function isRoot(program) {
    return Object.keys(programs)
      .every(name => name === program.name ||
        !programs[name].holding.includes(program.name)
      );
  }
  return Object.values(programs)
    .find(program => isRoot(program));
}

function calculateWeightForPrograms(programs) {
  function getProgramWeight(program) {
    if (program.holding.length === 0) {
      return program.weight;
    } else {
      return program.holding.reduce((totalWeight, name) => {
        return totalWeight + getProgramWeight(programs[name]);
      }, program.weight);
    }
  }
  Object.values(programs)
    .forEach((program) => {
      program.calculatedWeight = getProgramWeight(program);
    });
  return programs;
}

function findUnbalanced(programs) {
  return Object.values(programs)
    .filter((program) => {
      if (program.holding.length === 0) return false;
      return program.holding
        .some(name => programs[name].calculatedWeight !== programs[program.holding[0]].calculatedWeight);
    })
    .reduce((minCalculatedWeightProgram, program) => {
      if (minCalculatedWeightProgram === null) return program;
      if (minCalculatedWeightProgram.calculatedWeight > program.calculatedWeight) {
        return program;
      }
      return minCalculatedWeightProgram;
    }, null);
}

function getNewWeightForHoldingProgramOf(program, programs) {
  const weightCounts = program.holding.reduce((counts, name) => {
    counts[programs[name].calculatedWeight] = (counts[programs[name].calculatedWeight] || 0) + 1;
    return counts;
  }, {})
  const programToCorrect = program.holding
    .map(name => programs[name])
    .find(p => program.holding
      .every(name => name === p.name ||
        p.calculatedWeight !== programs[name].calculatedWeight
      )
    );
  const otherProgram = program.holding
    .map(name => programs[name])
    .find(p => p.name !== programToCorrect.name);
  const delta = otherProgram.calculatedWeight - programToCorrect.calculatedWeight;
  return programToCorrect.weight + delta;
}

// Complicated solution, but whatever ... bad start, refactor to use proper tree structure

module.exports = {
  part1: (inputLines) => findRoot(parsePrograms(inputLines)).name,
  part2: (inputLines) => {
    const programs = calculateWeightForPrograms(parsePrograms(inputLines));
    const unbalancedProgram = findUnbalanced(programs);
    return getNewWeightForHoldingProgramOf(unbalancedProgram, programs);
  }
}
const pipeRx = /^(\d+)\s+<-> (.*)$/;
function parseGraph(pipes) {
  const programPipes = { '0': [] };
  const getProgramPipes = (program) => programPipes[program] || (programPipes[program] = []);

  pipes
    .map(pipe => pipe.match(pipeRx).slice(1))
    .map(matches => ({ from: matches[0], to: matches[1].split(/,\s*/)}))
    .forEach(({ from, to }) => {
      to.forEach((toProgram) => {
        getProgramPipes(from).push(toProgram);
        getProgramPipes(toProgram).push(from);
      })
    });
  
  return programPipes;
}

function getGroups(programPipes) {
  const visited = Object.keys(programPipes).reduce((map, k) => {
    map[k] = false;
    return map;
  }, {});
  const groups = {};
  
  Object.keys(visited).forEach((program) => {
    if (visited[program]) return;
    groups[program] = [];
    (function markVisited(nonVisitedProgram) {
      if (visited[nonVisitedProgram]) return;
      groups[program].push(nonVisitedProgram);
      visited[nonVisitedProgram] = true;
      programPipes[nonVisitedProgram].forEach(markVisited);
    })(program);
  });

  return groups;
}

function totalConnectedTo(programPipes, programId) {
  return Object.values(getGroups(programPipes))
    .filter(group => group.includes(programId))
    [0].length;
}

module.exports = {
  part1: (inputLines) => totalConnectedTo(parseGraph(inputLines), '0'),
  part2: (inputLines) => Object.keys(getGroups(parseGraph(inputLines))).length
}
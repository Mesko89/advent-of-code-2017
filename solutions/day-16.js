const DEFAULT_PROGRAMS = 'abcdefghijklmnop';

const commandCreators = {
  's': (spin) => (programs) => programs
    .slice(programs.length - spin)
    .concat(programs.slice(0, programs.length - spin)),
  // 'x': (pos1, pos2) => (programs) => {
  //   const temp = programs[pos1];
  //   programs[pos1] = programs[pos2];
  //   programs[pos2] = temp;
  //   return programs;
  // },
  'x': (pos1, pos2) => (programs) => programs.map((program, i) => {
    if (i === pos1) return programs[pos2];
    if (i === pos2) return programs[pos1];
    return program;
  }),
  'p': (program1, program2) => (programs) => programs.map((program) => {
    if (program === program1) return program2;
    if (program === program2) return program1;
    return program;
  })
}

function parseCommands(input) {
  return input.split(',')
    .map((commandString) => {
      const commandParts = commandString
        .match(/(x|s|p)(?:(?:(\d+)\/(\d+))|(?:(\w)\/(\w))|(\d+))/)
        .filter(v => typeof v !== 'undefined')
        .map(v => isNaN(parseInt(v)) ? v : parseInt(v));
      return commandCreators[commandParts[1]](...commandParts.slice(2));
    });
}

function dance(commands, programs) {
  programs = Array.from(programs);
  return commands.reduce((currentPrograms, command) => command(currentPrograms), programs).join('');
}

module.exports = {
  part1: (inputLines, programs = DEFAULT_PROGRAMS) => dance(
    parseCommands(inputLines[0]), 
    programs
  ),
  part2: (inputLines, programs = DEFAULT_PROGRAMS, times = 1e9) => {
    const commands = parseCommands(inputLines[0]);
    const cache = {};
    while (times--) {
      if (programs in cache) {
        programs = cache[programs];
      } else {
        cache[programs] = dance(commands, programs);
        programs = cache[programs];
      }
    }
    return programs;
  }
}
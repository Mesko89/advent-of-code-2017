const fs = require('fs');

function loadInput(file) {
  return new Promise((resolve, reject) => fs.readFile(file, (err, contents) => {
    if (err) return reject(err);
    return resolve(contents.toString());
  }))
}

const days = Array.from({ length: 12 }).map((_, i) => (i + 1).toString().padStart(2, '0'));

async function bootstrap() {
  try {
    const inputs = await Promise.all(days.map(async d => {
      return (await loadInput(`./inputs/${d}.txt`))
        .split(/[\r\n]+/)
        .filter(r => Boolean(r));
    }));
    const parts = days.map(d => require(`./solutions/day-${d}`));
    const solutions = parts.map((p, i) => [p.part1(inputs[i]), p.part2(inputs[i])]);
    for (let i = 0; i < solutions.length; i++) {
      console.log(`Solutions for day "${days[i]}":`);
      const p1Solution = await solutions[i][0];
      console.log(`  Part 1: ${p1Solution}`);
      const p2Solution = await solutions[i][1];
      console.log(`  Part 2: ${p2Solution}`);
    }
  } catch (ex) {
    console.error(ex);
  }
}

bootstrap();

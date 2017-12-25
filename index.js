const fs = require('fs');

function loadInput(file) {
  return new Promise((resolve, reject) => fs.readFile(file, (err, contents) => {
    if (err) return reject(err);
    return resolve(contents.toString());
  }))
}

const days = process.argv.length > 2 
  ? process.argv.slice(2)
  : Array.from({ length: 25 }).map((_, i) => (i + 1).toString().padStart(2, '0'));

async function bootstrap() {
  try {
    const inputs = await Promise.all(days.map(async d => {
      return (await loadInput(`./inputs/${d}.txt`))
        .split(/[\r\n]+/)
        .filter(r => Boolean(r));
    }));
    const parts = days.map(d => require(`./solutions/day-${d}`));
    for (let i = 0; i < parts.length; i++) {
      console.log(`Solutions for day "${days[i]}":`);
      const p1Solution = await parts[i].part1(inputs[i]);
      console.log(`  Part 1: ${p1Solution}`);
      const p2Solution = await parts[i].part2(inputs[i])
      console.log(`  Part 2: ${p2Solution}`);
    }
  } catch (ex) {
    console.error(ex);
  }
}

bootstrap();

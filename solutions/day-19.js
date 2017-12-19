
const directions = {
  N: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  W: { x: -1, y: 0 }
};

function getWordFromMaze(grid, position, direction) {
  const move = (position, direction) => ({ 
    x: position.x + direction.x, 
    y: position.y + direction.y 
  });
  const findNewDirection = (position, direction) => {
    return Object
      .values(directions)
      .find(dir => dir.x !== direction.x &&
        dir.y !== direction.y &&
        /[|\-\w]/i.test(charAt(move(position, dir)))
      );
  };
  const charAt = ({ x, y }) => grid[y] && grid[y][x];

  let canMove = true;
  let output = '';
  let steps = 0;
  while (canMove) {
    position = move(position, direction);
    steps++;
    
    const char = charAt(position);
    if (!char || char === ' ') break;

    if (/[^ |\-+\s]/.test(char)) {
      output += char;
    } else if (char === '+') {
      direction = findNewDirection(position, direction);
    }
  }
  return { output, steps };
}

module.exports = {
  part1: (inputLines) => getWordFromMaze(inputLines, {
    x: Array.from(inputLines[0]).findIndex(s => s === '|'),
    y: 0
  }, directions.S).output,
  part2: (inputLines) => getWordFromMaze(inputLines, {
    x: Array.from(inputLines[0]).findIndex(s => s === '|'),
    y: 0
  }, directions.S).steps
}

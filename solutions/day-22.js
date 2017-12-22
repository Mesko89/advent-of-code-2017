const Nodes = { 
  infected: '#',
  clean: '.',
  weakened: 'W',
  flagged: 'F'
};

const Directions = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

Directions.up.toLeft = Directions.left;
Directions.up.toRight = Directions.right;
Directions.up.reverse = Directions.down;
Directions.down.toLeft = Directions.right;
Directions.down.toRight = Directions.left;
Directions.down.reverse = Directions.up;
Directions.left.toLeft = Directions.down;
Directions.left.toRight = Directions.up;
Directions.left.reverse = Directions.right;
Directions.right.toLeft = Directions.up;
Directions.right.toRight = Directions.down;
Directions.right.reverse = Directions.left;

function parseGrid(inputLines) {
  const grid = {};
  grid.set = ({ x, y }, value) => grid[`${x},${y}`] = value;
  grid.get = ({ x, y }) => grid[`${x},${y}`] || Nodes.clean;
  inputLines.forEach((row, i) => {
    Array.from(row).forEach((value, j) => {
      const x = j - Math.floor(row.length / 2);
      const y = i - Math.floor(inputLines.length / 2);
      grid.set({ x, y }, value);
    });
  });
  return grid;
}

function simulateVirus(grid, totalBursts) {
  let totalInfected = 0;
  let currentDirection = Directions.up;
  let currentPosition = { x: 0, y: 0 };
  const move = ({ x, y }, direction) => ({ x: x + direction.x, y: y + direction.y });
  while (totalBursts--) {
    const currentNode = grid.get(currentPosition);
    currentDirection = currentNode === Nodes.infected
      ? currentDirection.toRight
      : currentDirection.toLeft;
    if (currentNode === Nodes.infected) {
      grid.set(currentPosition, Nodes.clean);
    } else {
      grid.set(currentPosition, Nodes.infected);
      totalInfected++;
    }
    currentPosition = move(currentPosition, currentDirection);
  }
  return totalInfected;
}

function simulateEvolvedVirus(grid, totalBursts) {
  let totalInfected = 0;
  let currentDirection = Directions.up;
  let currentPosition = { x: 0, y: 0 };
  const move = ({ x, y }, direction) => ({ x: x + direction.x, y: y + direction.y });
  const getNewDirection = (currentDirection, node) => {
    if (node === Nodes.clean) return currentDirection.toLeft;
    if (node === Nodes.weakened) return currentDirection;
    if (node === Nodes.infected) return currentDirection.toRight;
    if (node === Nodes.flagged) return currentDirection.reverse;
  };
  const getNewState = (node) => {
    if (node === Nodes.clean) return Nodes.weakened;
    if (node === Nodes.weakened) return Nodes.infected;
    if (node === Nodes.infected) return Nodes.flagged;
    if (node === Nodes.flagged) return Nodes.clean;
  };
  while (totalBursts--) {
    const currentNode = grid.get(currentPosition);
    currentDirection = getNewDirection(currentDirection, currentNode);
    grid.set(currentPosition, getNewState(currentNode));
    if (currentNode === Nodes.weakened) {
      totalInfected++;
    }
    currentPosition = move(currentPosition, currentDirection);
  }
  return totalInfected;
}

module.exports = {
  part1: (inputLines, totalBursts = 10000) => {
    const grid = parseGrid(inputLines);
    return simulateVirus(grid, totalBursts);
  },
  part2: (inputLines, totalBursts = 10000000) => {
    const grid = parseGrid(inputLines);
    return simulateEvolvedVirus(grid, totalBursts);
  }
}

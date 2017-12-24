const DEFAULT_GRID = [
  Array.from('.#.'),
  Array.from('..#'),
  Array.from('###')
];

function parseTransformations(inputLines) {
  function rotate(grid) {
    const rows = grid.split('/');
    if (rows.length === 2) {
      return `${rows[1][0]}${rows[0][0]}/${rows[1][1]}${rows[0][1]}`;
    } else {
      return `${rows[2][0]}${rows[1][0]}${rows[0][0]}/` +
       `${rows[2][1]}${rows[1][1]}${rows[0][1]}/` +
       `${rows[2][2]}${rows[1][2]}${rows[0][2]}`;
    }
  }
  function flip(grid) {
    const rows = grid.split('/');
    if (rows.length === 2) {
      return `${rows[1][0]}${rows[1][1]}/${rows[0][0]}${rows[0][1]}`;
    } else {
      return `${rows[2][0]}${rows[2][1]}${rows[2][2]}/` +
       `${rows[1][0]}${rows[1][1]}${rows[1][2]}/` +
       `${rows[0][0]}${rows[0][1]}${rows[0][2]}`;
    }
  }
  return inputLines.reduce((transformationMap, line) => {
    let [_, from, to] = line.match(/(.*) => (.*)/);    
    for (let i = 0; i < 4; i++) {
      if (!(from in transformationMap)) {
        transformationMap[from] = to;
      }
      let from2 = flip(from);
      if (!(from2 in transformationMap)) {
        transformationMap[from2] = to;
      }
      from = rotate(from);
    }
    return transformationMap;
  }, {});
}

function transform(grid, transformations) {
  const newGrid = [];
  const divideBy = grid.length % 2 === 0 ? 2 : 3;
  for (let j = 0; j < grid.length / divideBy; j++) {
    Array.from({ length: divideBy + 1 }).forEach(() => newGrid.push([]));
    for (let i = 0; i < grid[0].length; i += divideBy) {
      let x = j * divideBy;
      let from = (divideBy === 2) 
        ? `${grid[x+0][i+0]}${grid[x+0][i+1]}/${grid[x+1][i+0]}${grid[x+1][i+1]}`
        : (
          `${grid[x+0][i+0]}${grid[x+0][i+1]}${grid[x+0][i+2]}/` +
          `${grid[x+1][i+0]}${grid[x+1][i+1]}${grid[x+1][i+2]}/` + 
          `${grid[x+2][i+0]}${grid[x+2][i+1]}${grid[x+2][i+2]}`
        );
      let to = transformations[from].split('/');
      to.forEach((line, k) => {
        newGrid[j * to.length + k] = [...newGrid[j * to.length + k], ...line];
      });
    }
  }
  return newGrid;
}

function transformNTimes(grid, transformations, times) {
  while (times--) {
    grid = transform(grid, transformations);
  }
  return grid;
}

function countOn(grid) {
  return grid.reduce((totalOn, row) => {
    return totalOn + row.filter(v => v === '#').length;
  }, 0);
}

module.exports = {
  part1: (inputLines, iterations = 5, grid = DEFAULT_GRID) => {
    const transformations = parseTransformations(inputLines);
    grid = transformNTimes(grid, transformations, iterations);
    return countOn(grid);
  },
  part2: (inputLines, iterations = 18, grid = DEFAULT_GRID) => {
    const transformations = parseTransformations(inputLines);
    grid = transformNTimes(grid, transformations, iterations);
    return countOn(grid);
  }
}

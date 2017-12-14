const knotHash = require('./knotHash');

function generateGrid(input) {
  let i = 0;
  let grid = [];
  do {
    const hash = knotHash(`${input}-${i}`)
      .map(v => v.toString(2).padStart(8, '0')).join('');
    grid.push(hash);
  } while (++i < 128)
  return grid;
}

function countSquares(input) {
  const grid = generateGrid(input);
  return grid.reduce((totalSquares, row) => {
    return totalSquares + Array.from(row).filter(v => v === '1').length;
  }, 0);
}

function countGroups(input) {
  const grid = generateGrid(input);
  let groupId = 0;
  const assignedGroups = {};
  const setGroupId = (x, y, groupId) => assignedGroups[`${x},${y}`] = groupId;
  const getGroupId = (x, y) => assignedGroups[`${x},${y}`];
  const getField = (x, y) => grid[y] && grid[y][x];

  function spreadGroup(x, y, groupId) {
    if (getField(x, y) !== '1') return;
    if (getGroupId(x, y)) return;
    setGroupId(x, y, groupId);
    spreadGroup(x - 1, y, groupId);
    spreadGroup(x + 1, y, groupId);
    spreadGroup(x, y - 1, groupId);
    spreadGroup(x, y + 1, groupId);
  }

  grid.forEach((row, y) => {
    Array.from(row).forEach((field, x) => {
      if (field === '1' && !getGroupId(x, y)) {
        spreadGroup(x, y, ++groupId);
      }
    });
  })

  return groupId;
}

module.exports = {
  part1: (inputLines) => countSquares(inputLines[0]),
  part2: (inputLines) => countGroups(inputLines[0])
}
const possibleSteps = {
  n: { x: -1, y: 1, z: 0 },
  ne: { x: 0, y: 1, z: -1 },
  se: { x: 1, y: 0, z: -1 },
  s: { x: 1, y: -1, z: 0 },
  sw: { x: 0, y: -1, z: 1 },
  nw: { x: -1, y: 0, z: 1 }
};
const move = (position, step) => ({
  x: position.x + possibleSteps[step].x,
  y: position.y + possibleSteps[step].y,
  z: position.z + possibleSteps[step].z,
});

const distance = (position) => (
  Math.abs(position.x) +
  Math.abs(position.y) +
  Math.abs(position.z)
) / 2;

function calculateDistance(steps) {
  let currentPosition = { x: 0, y: 0, z: 0 };
  steps.forEach(step => {
    currentPosition = move(currentPosition, step);
  });
  return distance(currentPosition);
}

function calculateFurthestDistance(steps) {
  let currentPosition = { x: 0, y: 0, z: 0 };
  let currentMaxDistance = 0;
  steps.forEach(step => {
    currentPosition = move(currentPosition, step);
    const currentDistance = distance(currentPosition);
    if (currentDistance > currentMaxDistance) {
      currentMaxDistance = currentDistance;
    }
  });
  return currentMaxDistance;
}

module.exports = {
  part1: (inputLines) => calculateDistance(inputLines[0].split(/\s*,\s*/)),
  part2: (inputLines) => calculateFurthestDistance(inputLines[0].split(/\s*,\s*/))
}
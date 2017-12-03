function calculateDistance(fromCell) {
  if (fromCell === 1) return 0;
  
  function getBounds(number) {
    let i = 1;
    let lowerBound = 2;
    let upperBound = 9;
    while (number > upperBound) {
      i += 2;
      lowerBound = Math.pow(i, 2) + 1;
      upperBound = Math.pow(i+2, 2);
    }
    return { baseSquareNumber: i + 2, N: (i+1)/2, lowerBound, upperBound };
  }

  const bounds = getBounds(fromCell);
  const minDistanceBase = bounds.lowerBound + bounds.N - 1;
  const minDistance = bounds.N;
  const numberIndex = (fromCell - minDistanceBase + 2 * bounds.N) % (2 * bounds.N);

  if (numberIndex <= bounds.N) {
    return minDistance + numberIndex;
  } else {
    return minDistance + (2 * bounds.N - numberIndex);
  }
}

function getFirstLargerThan(thisValue) {
  const matrix = {};
  const directions = { 
    RIGHT: { x: 1, y: 0 },
    LEFT: { x: -1, y: 0 },
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 } 
  };
  directions.RIGHT.next = directions.UP;
  directions.UP.next = directions.LEFT;
  directions.LEFT.next = directions.DOWN;
  directions.DOWN.next = directions.RIGHT;
  
  let currentPosition = { x: 0, y: 0 };
  let currentDirection = directions.RIGHT;
  let currentValue = 1;
  
  const getValue = pos => matrix[`${pos.x},${pos.y}`];
  const setValue = (pos, value) => matrix[`${pos.x},${pos.y}`] = value;
  const move = (pos, direction) => ({ 
    x: pos.x + direction.x,
    y: pos.y + direction.y
  });
  const shouldTurn = (pos, direction) => getValue(move(pos, direction.next)) === undefined;
  const calculateValue = (pos) => {
    const neighbors = [-1, 0, 1].reduce((current, x) => {
      return current.concat([-1, 0, 1].map(y => ({ x: pos.x + x, y: pos.y + y })));
    }, []).filter(p => p.x !== pos.x || p.y !== pos.y);
    return neighbors
      .map(pos => getValue(pos))
      .filter(v => Boolean(v))
      .reduce((current, value) => current + value, 0);
  };

  setValue(currentPosition, 1);
  currentPosition = move(currentPosition, currentDirection);

  do {
    currentValue = calculateValue(currentPosition);
    setValue(currentPosition, currentValue);
    if (shouldTurn(currentPosition, currentDirection)) {
      currentDirection = currentDirection.next;
    }
    currentPosition = move(currentPosition, currentDirection);
  } while (currentValue <= thisValue);
  return currentValue;
}

module.exports = {
  part1: (inputLines) => calculateDistance(parseInt(inputLines, 10)),
  part2: (inputLines) => getFirstLargerThan(parseInt(inputLines[0]))
}
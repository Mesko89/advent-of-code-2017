function parsePins(inputLines) {
  return inputLines
    .map((line, id) => ({ 
      id,
      pins: line.split('/').map(v => parseInt(v))
    }));
}

function arrayEq(arr1, arr2) {
  return arr1.every((v, i) => v === arr2[i]);
}

function arrayLast(arr) { return arr[arr.length - 1]; }

function getBridges(components) {
  // function calculateScore(bridges) {
  //   return bridges.reduce((total, bridge) => total + bridge.pins.reduce((total, p) => total + p, 0), 0);
  // }
  function getAvailableComponents(bridge) {
    return components
      .filter(component => !bridge.find(b => b.component.id === component.id))
      .filter(component => component.pins.includes(arrayLast(bridge).nextConnection));
  }
  function getNextConnection(connection, pins) {
    const freePins = pins.filter(p => p !== connection);
    if (freePins.length === 0) return pins[0];
    return freePins[0];
  }

  let currentBridges = components
    .filter(p => p.pins.includes(0))
    .map(p => [{ 
      component: p,
      connection: 0,
      nextConnection: getNextConnection(0, p.pins)
    }]);
  const foundBridges = [];
  let totalNewBridges = 0;
  do {
    totalNewBridges = 0
    currentBridges = currentBridges.reduce((newBridges, bridge) => {
      const available = getAvailableComponents(bridge);
      if (available.length === 0) {
        foundBridges.push(bridge);
      } else {
        available.forEach(component => {
          const connection = arrayLast(bridge).nextConnection;
          newBridges.push([...bridge, {
            component,
            connection,
            nextConnection: getNextConnection(connection, component.pins)
          }]);
          totalNewBridges++;
        });
      }
      return newBridges;
    }, []);
  } while(totalNewBridges > 0);
  return foundBridges;
}

function getBridgeScore(bridge) {
  return bridge.reduce((total, connection) => {
    return total + connection.component.pins.reduce((a, b) => a + b, 0);
  }, 0);
}

function getBestScore(bridges) {
  let maxScore = 0;
  bridges.forEach(bridge => {
    const bridgeScore = getBridgeScore(bridge);
    if (bridgeScore > maxScore) {
      maxScore = bridgeScore;
    }
  })
  return maxScore;
}

function getLongestBridges(bridges) {
  const maxLength = bridges.reduce((max, bridge) => bridge.length > max ? bridge.length : max, 0);
  return bridges.filter(bridge => bridge.length === maxLength);
}

module.exports = {
  part1: (inputLines) => {
    const pins = parsePins(inputLines);
    const bridges = getBridges(pins);
    return getBestScore(bridges);
  },
  part2: (inputLines) => {
    const pins = parsePins(inputLines);
    const bridges = getBridges(pins);
    return getBestScore(getLongestBridges(bridges));
  }
}

const firewallRx = /(\d+): (\d+)/;
function parseFirewalls(firewallConfigurations) {
  return firewallConfigurations
    .map(firewall => firewall.match(firewallRx).slice(1))
    .map(firewall => ({ 
      depth: parseInt(firewall[0]),
      range: parseInt(firewall[1])
    }));
}

function getCaughtFirewalls(firewalls, waitDelay = 0) {
  function isCaught(firewall) {
    const stepsToBeTop = (range) => (range - 2) * 2 + 2;
    return (firewall.depth + waitDelay) % stepsToBeTop(firewall.range) === 0;
  }
  return firewalls.filter(firewall => isCaught(firewall));
}

function calculateSeverity(firewalls, waitDelay = 0) {
  return getCaughtFirewalls(firewalls, waitDelay)
    .reduce((totalSeverity, firewall) => {
      return totalSeverity + firewall.depth * firewall.range;
    }, 0);
}

function calculateDelay(firewalls) {
  let i = -1;
  let caughtFirewalls = [];
  do {
    i++;
    caughtFirewalls = getCaughtFirewalls(firewalls, i);
  } while (caughtFirewalls.length);
  return i;
}

module.exports = {
  part1: (inputLines) => calculateSeverity(parseFirewalls(inputLines)),
  part2: (inputLines) => calculateDelay(parseFirewalls(inputLines))
}
const containingGroupRx = /^{(.*)}$/;
const cleanCanceledRx = /!./g;
const locateGarbageRx = /<(.*?)>/g;
const garbageGroupRx = /<(.*?)>/;

function removeCanceled(stream) { return stream.replace(cleanCanceledRx, ''); }
function removeGarbage(stream) { return stream.replace(locateGarbageRx, ''); }

function streamScore(stream, currentScore = 1) {
  stream = removeGarbage(removeCanceled(stream));
  let score = 0;
  let level = 0;
  return Array.from(stream).reduce((score, character) => {
    if (character === '{') {
      level++;
      return score + level;
    } else if (character === '}') {
      level--;
    }
    return score;
  }, 0);
}

function countGarbage(stream) {
  stream = removeCanceled(stream);
  const garbageGroups = stream.match(locateGarbageRx)
    .map(group => group.match(garbageGroupRx).slice(1));
  return garbageGroups
    .reduce((total, group) => total + group.reduce((t, garbage) => t + garbage.length, 0), 0);
}

module.exports = {
  part1: (inputLines) => streamScore(inputLines[0]),
  part2: (inputLines) => countGarbage(inputLines[0])
}
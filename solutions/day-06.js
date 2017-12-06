function redistribute(banks, shouldStopFn, getReturnValue) {
  function getMaxValueIndex(distribution) {
    let currentMax = 0;
    return distribution
      .reduce((maxIndex, value, i) => {
        if (currentMax < value) {
          currentMax = value;
          return i;
        }
        return maxIndex;
      }, -1);
  }
  function redistributeValuesFrom(distribution, index) {
    const newDistribution = Array.from(distribution);
    let currentValue = distribution[index];
    newDistribution[index] = 0;
    while (currentValue--) {
      index = (index + 1) % distribution.length;
      newDistribution[index]++;
    }
    return newDistribution;
  }

  let currentDistribution = Array.from(banks);
  while (!shouldStopFn(currentDistribution)) {
    const maxValueIndex = getMaxValueIndex(currentDistribution);
    currentDistribution = redistributeValuesFrom(currentDistribution, maxValueIndex);
  }
  return getReturnValue();
}

const hash = distribution => distribution.join('.');
const part1Distributions = {};
let part1Steps = 0;
const part2Distributions = {};
let part2Steps = 0;
let part2Return = -1;

module.exports = {
  part1: (inputLines) => redistribute(
    inputLines[0].split(/\s/).map(v => parseInt(v)),
    distribution => {
      const distributionHash = hash(distribution);
      if (distributionHash in part1Distributions) return true;
      part1Distributions[distributionHash] = true;
      part1Steps++;
      return false;
    },
    () => part1Steps
  ),
  part2: (inputLines) => redistribute(
    inputLines[0].split(/\s/).map(v => parseInt(v)),
    distribution => {
      const distributionHash = hash(distribution);
      if (distributionHash in part2Distributions) {
        if (part2Distributions[distributionHash] === 0) {
          part2Distributions[distributionHash] = part2Steps;
        } else {
          part2Return = part2Steps - part2Distributions[distributionHash];
          return true;
        }
      } else {
        part2Distributions[distributionHash] = 0;
      }
      part2Steps++;
      return false;
    },
    () => part2Return
  )
}
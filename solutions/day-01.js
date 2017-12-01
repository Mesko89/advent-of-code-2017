const defaultCompareWithIndex = (index, length) => ((index + 1) % length);

function solveCaptcha(captcha, getCompareIndex = defaultCompareWithIndex) {
  return Array.from(captcha).reduce((sum, number, i, captchaArray) => {
    if (
      number === captchaArray[getCompareIndex(i, captchaArray.length)]
    ) {
      return sum + parseInt(number);
    } else {
      return sum;
    }
  }, 0);
}

module.exports = {
  part1: (inputLines) => solveCaptcha(inputLines[0]),
  part2: (inputLines) => solveCaptcha(inputLines[0], (index, length) => {
    return (index + length / 2) % length;
  })
}
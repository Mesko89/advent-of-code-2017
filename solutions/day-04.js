
function isValid(passphrase) {
  return passphrase
    .split(/\s+/)
    .every((word, i, words) => !words.slice(i+1).includes(word));
}

function isValidExtraSecure(passphrase) {
  function countChars(word) {
    return Array.from(word)
      .reduce((charMap, char) => {
        if (!(char in charMap)) {
          charMap[char] = 0;
        }
        charMap[char]++;
        return charMap;
      }, {})
  }
  function wordsAreSimilar(word1, word2) {
    const toHash = (map) => Object.keys(map)
      .sort()
      .map(key => `${key}${map[key]}`)
      .reduce((string, val) => string + val, '');
    return toHash(countChars(word1)) === toHash(countChars(word2));
  }
  return passphrase
    .split(/\s+/)
    .every((word, i, words) => !words
      .slice(i+1)
      .some(wordToCompare => wordsAreSimilar(word, wordToCompare))
    );
}

module.exports = {
  part1: (inputLines) => inputLines.filter(isValid).length,
  part2: (inputLines) => inputLines.filter(isValidExtraSecure).length
}
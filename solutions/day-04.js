
function isValid(passphrase) {
  return passphrase
    .split(/\s+/)
    .every((word, i, words) => !words.slice(i+1).includes(word));
}

function isValidExtraSecure(passphrase) {
  function wordsAreSimilar(word1, word2) {
    const sortWord = (word) => Array.from(word).sort().join('');
    return sortWord(word1) === sortWord(word2);
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
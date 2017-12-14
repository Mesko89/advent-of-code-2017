function getSublist(list, currentPosition, length) {
  if (currentPosition + length < list.length) {
    return list.slice(currentPosition, currentPosition + length);
  } else {
    return list.slice(currentPosition)
      .concat(list.slice(0, length - (list.length - currentPosition)));
  }
}

function calculateHash(lengths, times = 1, base = 256) {
  const list = Array.from({ length: base }).map((_, i) => i);
  let skipLength = 0;
  let currentPosition = 0;
  while (times--) {
    lengths.forEach((length) => {
      let subList = getSublist(list, currentPosition, length)
        .reverse();
      subList.forEach((value, i) => {
        list[(i + currentPosition) % list.length] = value;
      });
      currentPosition = (currentPosition + length + skipLength) % list.length;
      skipLength++;
    });
  }
  return list;
}

function calculateSparseHash(hash) {
  let i = 0;
  const sparseHash = [];
  while (i < hash.length) {
    sparseHash.push(eval(hash.slice(i, i + 16).join('^')));
    i += 16;
  }
  return sparseHash;
}

function knotHash(input, base = 256) {
  const lengths = Array.from(input)
    .map(char => char.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);
  const hash = calculateHash(lengths, 64, base);
  return calculateSparseHash(hash);
}

knotHash.calculateHash = calculateHash;

module.exports = knotHash;
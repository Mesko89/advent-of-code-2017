const { part1, part2 } = require('./day-04');

describe('Day 04 - Part 1', () => {

  it('returns 1 for 1 valid passphrase', () => {
    expect(part1(['aa bb cc dd ee'])).toBe(1);
  });

  it('return 0 for no valid passphrase', () => {
    expect(part1(['aa bb cc dd aa'])).toBe(0);
  });

  it('returns 2 for 2 valid passphrases', () => {
    expect(part1([
      'aa bb cc dd ee',
      'aa bb cc dd aa',
      'aa bb cc dd aaa'
    ])).toBe(2);
  });

});


describe('Day 04 - Part 2', () => {

  it('returns 1 for 1 valid passphrase', () => {
    expect(part2(['abcde fghij'])).toBe(1);
  });

  it('return 0 for no valid passphrase', () => {
    expect(part2(['abcde xyz ecdab'])).toBe(0);
  });

  it('returns 3 for 3 valid passphrases', () => {
    expect(part2([
      'abcde fghij',
      'abcde xyz ecdab',
      'a ab abc abd abf abj',
      'iiii oiii ooii oooi oooo',
      'oiii ioii iioi iiio'
    ])).toBe(3);
  });
});
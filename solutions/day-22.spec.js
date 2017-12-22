const { part1, part2 } = require('./day-22');

describe('Day 22 - Part 1', () => {

  it('works for smaller problem', () => {
    expect(part1([
      '..#',
      '#..',
      '...'
    ], 7)).toBe(5);
  });

});

describe('Day 22 - Part 2', () => {

  it('works for smaller problem', () => {
    expect(part2([
      '..#',
      '#..',
      '...'
    ], 100)).toBe(26);
  });

});
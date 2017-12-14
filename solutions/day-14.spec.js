const { part1, part2 } = require('./day-14');

describe('Day 14 - Part 1', () => {

  it('return correct number of squares for "flqrgnkx"', () => {
    expect(part1([
      'flqrgnkx'
    ])).toBe(8108);
  });

});

describe('Day 14 - Part 2', () => {

  it('return correct number of regions for "flqrgnkx"', () => {
    expect(part2([
      'flqrgnkx'
    ])).toBe(1242);
  });
  
});
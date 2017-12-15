const { part1, part2 } = require('./day-15');

describe('Day 15 - Part 1', () => {

  it('return correct number of pairs for A=65 and B=8921', () => {
    expect(part1([
      'Generator A starts with 65',
      'Generator B starts with 8921'
    ], 1e6)).toBe(12);
  });

});

describe('Day 15 - Part 2', () => {

  it('return correct number of pairs for A=65 and B=8921"', () => {
    expect(part2([
      'Generator A starts with 65',
      'Generator B starts with 8921'
    ], 1e6)).toBe(75);
  });
  
});
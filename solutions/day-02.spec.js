const { part1, part2 } = require('./day-02');

describe('Day 02 - Part 1', () => {

  it('can solve simple inputs', () => {
    expect(part1([
      '5 1 9 5',
      '7 5 3',
      '2 4 6 8'
    ])).toBe(18);
  });

});


describe('Day 02 - Part 2', () => {
  it('can solve simple inputs', () => {
    expect(part2([
      '5 9 2 8',
      '9 4 7 3',
      '3 8 6 5'
    ])).toBe(9);
  });
});
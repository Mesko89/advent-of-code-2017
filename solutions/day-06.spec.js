const { part1, part2 } = require('./day-06');

describe('Day 06 - Part 1', () => {

  it('works for simple problem', () => {
    expect(part1(['0 2 7 0'])).toBe(5);
  });

});


describe('Day 06 - Part 2', () => {

  it('works for simple problem', () => {
    expect(part2(['0 2 7 0'])).toBe(4);
  });

});
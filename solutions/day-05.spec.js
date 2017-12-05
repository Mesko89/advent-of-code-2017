const { part1, part2 } = require('./day-05');

describe('Day 05 - Part 1', () => {

  it('works for simple problem', () => {
    expect(part1(['0', '3', '0', '1', '-3',])).toBe(5);
  });

});


describe('Day 05 - Part 2', () => {

  it('works for simple problem', () => {
    expect(part2(['0', '3', '0', '1', '-3',])).toBe(10);
  });

});
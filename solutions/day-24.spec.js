const { part1, part2 } = require('./day-24');

describe('Day 24 - Part 1', () => {

  it('works for smaller problem', () => {
    expect(part1([
      '0/2',
      '2/2',
      '2/3',
      '3/4',
      '3/5',
      '0/1',
      '10/1',
      '9/10'
    ])).toBe(31);
  });

});

describe('Day 24 - Part 2', () => {

  it('works for smaller problem', () => {
    expect(part2([
      '0/2',
      '2/2',
      '2/3',
      '3/4',
      '3/5',
      '0/1',
      '10/1',
      '9/10'
    ])).toBe(19);
  });

});
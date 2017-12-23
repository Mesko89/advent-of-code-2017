const { part1, part2 } = require('./day-23');

describe('Day 23 - Part 1', () => {

  it('works for smaller problem', async () => {
    expect(await part1([
      'set a 2',
      'set b 2',
      'sub b 1',
      'mul a a',
      'jnz b -2'
    ])).toBe(2);
  });

});

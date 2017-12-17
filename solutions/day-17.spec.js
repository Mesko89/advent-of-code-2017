const { part1, part2 } = require('./day-17');

describe('Day 17 - Part 1', () => {

  it('works for smaller problem', () => {
    expect(part1(['3'], 9)).toBe(5);
  });

  it('works for bigger problem', () => {
    expect(part1(['3'])).toBe(638);
  });

});

describe('Day 17 - Part 2', () => {

  it('works for smaller problem size', () => {
    expect(part2(['3'], 9)).toBe(9);
  });
  
});
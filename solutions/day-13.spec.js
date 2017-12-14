const { part1, part2 } = require('./day-13');

describe('Day 13 - Part 1', () => {

  it('works for simple firewalls', () => {
    expect(part1([
      '0: 3',
      '1: 2',
      '4: 4',
      '6: 4'
    ])).toBe(24);
  });

});

describe('Day 13 - Part 2', () => {

  it('works for simple firewalls', () => {
    expect(part2([
      '0: 3',
      '1: 2',
      '4: 4',
      '6: 4'
    ])).toBe(10);
  });
  
});
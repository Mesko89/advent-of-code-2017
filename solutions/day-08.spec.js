const { part1, part2 } = require('./day-08');

describe('Day 08 - Part 1', () => {

  it('works for simple programs', () => {
    expect(part1([
      'b inc 5 if a > 1',
      'a inc 1 if b < 5',
      'c dec -10 if a >= 1',
      'c inc -20 if c == 10'
    ])).toBe(1);
  });

});

xdescribe('Day 08 - Part 2', () => {

  it('works for simple programs', () => {
    expect(part1([
      'b inc 5 if a > 1',
      'a inc 1 if b < 5',
      'c dec -10 if a >= 1',
      'c inc -20 if c == 10'
    ])).toBe(10);
  });

});
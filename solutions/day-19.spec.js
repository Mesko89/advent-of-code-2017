const { part1, part2 } = require('./day-19');

describe('Day 19 - Part 1', () => {

  it('works for smaller problem', () => {
    expect(part1([
      '     |          ',
      '     |  +--+    ',
      '     A  |  C    ',
      ' F---|----E|--+ ',
      '     |  |  |  D ',
      '     +B-+  +--+ '
    ])).toBe('ABCDEF');
  });

});

describe('Day 19 - Part 2', () => {

  it('works for smaller problem', () => {
    expect(part2([
      '     |          ',
      '     |  +--+    ',
      '     A  |  C    ',
      ' F---|----E|--+ ',
      '     |  |  |  D ',
      '     +B-+  +--+ '
    ])).toBe(38);
  });
  
});
const { part1, part2 } = require('./day-21');

describe('Day 21 - Part 1', () => {

  it('works for smaller problem', () => {
    expect(part1(
      [
        '../.# => ##./#../...',
        '.#./..#/### => #..#/..../..../#..#'
      ], 
      2
    )).toBe(12);
  });

});

xdescribe('Day 21 - Part 2', () => {

  it('works for smaller problem', () => {
    expect(part1([
      '     |          ',
      '     |  +--+    ',
      '     A  |  C    ',
      ' F---|----E|--+ ',
      '     |  |  |  D ',
      '     +B-+  +--+ '
    ])).toBe(38);
  });
  
});
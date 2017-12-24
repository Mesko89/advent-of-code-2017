const { part1, part2 } = require('./day-20');

describe('Day 20 - Part 1', () => {

  it('works for smaller problem', () => {
    expect(part1(
      [
        'p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>',
        'p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>',
      ]
    )).toBe(0);
  });

});

describe('Day 20 - Part 2', () => {

  it('works for smaller problem', () => {
    expect(part2([
      'p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>',
      'p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>',
      'p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>',
      'p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>'
    ])).toBe(1);
  });
  
});
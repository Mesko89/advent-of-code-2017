const { part1, part2 } = require('./day-11');

describe('Day 11 - Part 1', () => {

  it('works for ne', () => {
    expect(part1(['ne'])).toBe(1);
  });

  it('works for ne,ne,ne', () => {
    expect(part1(['ne,ne,ne'])).toBe(3);
  });

  it('works for ne,ne,sw,sw', () => {
    expect(part1(['ne,ne,sw,sw'])).toBe(0);
  });

  it('works for ne,ne,s,s', () => {
    expect(part1(['ne,ne,s,s'])).toBe(2);
  });

  it('works for se,sw,se,sw,sw', () => {
    expect(part1(['se,sw,se,sw,sw'])).toBe(3);
  });

});

describe('Day 11 - Part 2', () => {

  it('works for ne,ne,sw,sw', () => {
    expect(part2(['ne,ne,sw,sw'])).toBe(2);
  });

});
const { part1, part2 } = require('./day-12');

describe('Day 12 - Part 1', () => {

  it('works when there is no pipe for 0', () => {
    expect(part1(['1 <-> 2'])).toBe(1);
  });

  it('works when there is a pipe from 0', () => {
    expect(part1(['0 <-> 1'])).toBe(2);
  });

  it('works when there is a pipe not connected to 0', () => {
    expect(part1([
      '0 <-> 1',
      '2 <-> 3'
    ])).toBe(2);
  });

  it('works when there is a pipe connected to 0 through 1', () => {
    expect(part1([
      '0 <-> 1',
      '1 <-> 2'
    ])).toBe(3);
  });

  it('works when there is a pipe connected to itself', () => {
    expect(part1([
      '0 <-> 1',
      '1 <-> 1'
    ])).toBe(2);
  });

  it('works when there are multiple pipes connected to 0', () => {
    expect(part1([
      '0 <-> 1, 2'
    ])).toBe(3);
  });

});

describe('Day 12 - Part 2', () => {

  it('works for one connected group', () => {
    expect(part2([
      '0 <-> 1, 2'
    ])).toBe(1);
  });

  it('works for two connected groups', () => {
    expect(part2([
      '0 <-> 1',
      '2 <-> 3'
    ])).toBe(2);
  });
  
});
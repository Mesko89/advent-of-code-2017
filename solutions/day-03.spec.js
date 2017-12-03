const { part1, part2 } = require('./day-03');

describe('Day 03 - Part 1', () => {

  it('can solve for 1', () => {
    expect(part1(['1'])).toBe(0);
  });

  it('can solve for 3x3 square', () => {
    expect(part1(['3'])).toBe(2);
  });

  it('can solve for 5x5 square', () => {
    expect(part1(['10'])).toBe(3);
    expect(part1(['11'])).toBe(2);
    expect(part1(['12'])).toBe(3);
    expect(part1(['23'])).toBe(2);
  });

  it('can solve bigger numbers', () => {
    expect(part1(['1024'])).toBe(31);
  });

});


describe('Day 03 - Part 2', () => {
  it('can solve simple inputs', () => {
    expect(part2(['59'])).toBe(122);
  });
  // it('can solve simple inputs', () => {
  //   expect(part2([
  //     '5 9 2 8',
  //     '9 4 7 3',
  //     '3 8 6 5'
  //   ])).toBe(9);
  // });
});
const { part1, part2 } = require('./day-10');

describe('Day 10 - Part 1', () => {

  it('works with length 1', () => {
    expect(part1(['1'])).toBe(0);
  });

  it('works with length 255', () => {
    expect(part1(['256'])).toBe(64770);
  });

  it('works with length 255', () => {
    expect(part1(['256'])).toBe(64770);
  });

  it('works on simpler scale', () => {
    expect(part1(['3, 4, 1, 5'], 5)).toBe(12);
  });

});

fdescribe('Day 10 - Part 2', () => {

  it('works for empty string', () => {
    expect(part2([''])).toBe('a2582a3a0e66e6e86e3812dcb672a272');
  });
  
  it('works for "AoC 2017"', () => {
    expect(part2(['AoC 2017'])).toBe('33efeb34ea91902bb2f59c9920caa6cd');
  });

  it('works for "1,2,3"', () => {
    expect(part2(['1,2,3'])).toBe('3efbe78a8d82f29979031a4aa0b16a9d');
  });

  it('works for "1,2,4"', () => {
    expect(part2(['1,2,4'])).toBe('63960835bcdc130f0b66d7ff4f6a5a8e');
  });

});
const { part1, part2 } = require('./day-01.js');

describe('Day 01 - Part 1', () => {

  it('can solve simple inputs', () => {
    expect(part1(['1122'])).toBe(3);
  });

  it('can solve when all numbers are same', () => {
    expect(part1(['1111'])).toBe(4);
  });

  it('can solve when all numbers are different', () => {
    expect(part1(['1234'])).toBe(0);
  });

  it('can solve when last number is same as first one', () => {
    expect(part1(['91212129'])).toBe(9);
  });

});

describe('Day 01 - Part 2', () => {
  
    it('can solve simple inputs', () => {
      expect(part2(['1212'])).toBe(6);
    });
  
    it('can solve when all numbers are same', () => {
      expect(part2(['1221'])).toBe(0);
    });
  
    it('can solve when all numbers are different', () => {
      expect(part2(['123425'])).toBe(4);
    });
  
    it('can solve when last number is same as first one', () => {
      expect(part2(['123123'])).toBe(12);
    });

    it('can solve complex', () => {
      expect(part2(['12131415'])).toBe(4);
    });
  
  });
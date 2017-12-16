const { part1, part2 } = require('./day-16');

describe('Day 16 - Part 1', () => {

  it('works for spin', () => {
    expect(part1(['s3'], 'abcde')).toBe('cdeab');
  });

  it('works for exchange', () => {
    expect(part1(['x0/3'], 'abcde')).toBe('dbcae');
  });

  it('works for partner', () => {
    expect(part1(['pb/e'], 'abcde')).toBe('aecdb');
  });

});

describe('Day 16 - Part 2', () => {

  it('works for smaller dance repetitions', () => {
    expect(part2(['s1,x3/4,pe/b'], 'abcde', 2)).toBe('ceadb');
  });
  
});
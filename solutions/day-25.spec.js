const { part1, part2 } = require('./day-25');

describe('Day 25 - Part 1', () => {

  it('works for smaller problem', () => {
    expect(part1([
      'Begin in state A.',
      'Perform a diagnostic checksum after 6 steps.',
      'In state A:',
      '  If the current value is 0:',
      '    - Write the value 1.',
      '    - Move one slot to the right.',
      '    - Continue with state B.',
      '  If the current value is 1:',
      '    - Write the value 0.',
      '    - Move one slot to the left.',
      '    - Continue with state B.',
      'In state B:',
      '  If the current value is 0:',
      '    - Write the value 1.',
      '    - Move one slot to the left.',
      '    - Continue with state A.',
      '  If the current value is 1:',
      '    - Write the value 1.',
      '    - Move one slot to the right.',
      '    - Continue with state A.'
    ])).toBe(3);
  });

});

const { part1, part2 } = require('./day-18');

describe('Day 18 - Part 1', () => {

  it('works for smaller problem', async () => {
    expect(await part1([
      'set a 1',
      'add a 2',
      'mul a a',
      'mod a 5',
      'snd a',
      'set a 0',
      'rcv a',
      'jgz a -1',
      'set a 1',
      'jgz a -2'
    ])).toBe(4);
  });

});

describe('Day 18 - Part 2', () => {

  it('works for smaller problem', async () => {
    expect(await part2([
      'snd 1',
      'snd 2',
      'snd p',
      'rcv a',
      'rcv b',
      'rcv c',
      'rcv d'
    ])).toBe(3);
  });
  
});
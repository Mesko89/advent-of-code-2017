const { part1, part2 } = require('./day-09');

describe('Day 09 - Part 1', () => {

  it('works with one group only', () => {
    expect(part1(['{}'])).toBe(1);
  });

  it('works with multiple levels of group', () => {
    expect(part1(['{{{}}}'])).toBe(6);
  });

  it('can handle groups containing more than 1 group', () => {
    expect(part1(['{{},{}}'])).toBe(5);
  });

  it('ignores garbage', () => {
    expect(part1(['{<{},{},{{}}>}'])).toBe(1);
  });

  it('ignores garbage', () => {
    expect(part1(['{<{},{},{{}}>}'])).toBe(1);
  });

  it('cancels characters', () => {
    expect(part1(['{{<!>},{<!>},{<!>},{<a>}}'])).toBe(3);
  });
  
});

describe('Day 09 - Part 2', () => {

  it('works for empty garbage', () => {
    expect(part2(['{<>}'])).toBe(0);
  });

  it('works for simple garbage', () => {
    expect(part2(['{<random characters>}'])).toBe(17);
  });

  it('properly handles < characters', () => {
    expect(part2(['{<<<<>}'])).toBe(3);
  });

  it('properly ignores ! and canceled tokens', () => {
    expect(part2(['{<{!>}>}'])).toBe(2);
  });

  it('works for multiple garbage groups', () => {
    expect(part2(['{{<{}>},{<123>}}'])).toBe(5);
  });

});
import { SearchHighlightPipe } from './search-highlight.pipe';

describe('Search highlight pipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  let pipe = new SearchHighlightPipe();

  it('should transforms "Sudipta" to "S<b>ud</b>ipta"', () => {
    expect(pipe.transform('Sudipta', 'ud')).toBe('S<b>ud</b>ipta');
  });

  it('should transforms "Barack Obama" to "<b>B</b>arack O<b>b</b>ama"', () => {
    expect(pipe.transform('Barack Obama', 'b')).toBe('<b>B</b>arack O<b>b</b>ama');
  });
});

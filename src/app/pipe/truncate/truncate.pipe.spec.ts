import { TruncatePipe } from './truncate.pipe';

describe('Truncate pipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  let pipe = new TruncatePipe();

  it('should transforms "this is a not so long string" to "this is a not so lon..."', () => {
    expect(pipe.transform('this is a not so long string', ['20']))
      .toBe('this is a not so lon...');
  });
});

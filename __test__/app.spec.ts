describe('App Test', () => {
  const testText = 'Hello World!!';
  let expectText = 'Hello World!';
  it('Test1', () => {
    expect(expectText).not.toBe(testText);
  });
  it('Test2', () => {
    expectText = expectText + '!';
    expect(expectText).toBe(testText);
  });
});

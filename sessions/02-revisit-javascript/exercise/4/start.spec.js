import { getModifiedClassName, errorTagger, makeSandwich } from './start';

describe('getModifiedClassName', () => {
  test('adds modifier classes', () => {
    const modifiers = {
      hidden: false,
      collapsed: true,
      selected: true,
    };
    expect(getModifiedClassName('elm', modifiers)).toBe(
      'elm elm--collapsed elm--selected'
    );
  });
  test('handles if modifiers are undefined or null or empty object', () => {
    expect(getModifiedClassName('cmp')).toBe('cmp');
    expect(getModifiedClassName('cmp', null)).toBe('cmp');
    expect(getModifiedClassName('cmp', {})).toBe('cmp');
  });
  test('handles if modifiers is not an object', () => {
    expect(getModifiedClassName('cmp', 20)).toBe('cmp');
    expect(getModifiedClassName('cmp', true)).toBe('cmp');
    expect(getModifiedClassName('cmp', [true])).toBe('cmp');
  });
});

describe('errorTagger', () => {
  test('wraps error items in span', () => {
    const errorOutput = errorTagger`This error has occured ${new Error(
      'I am groot'
    )}`;
    expect(errorOutput).toBe(
      'This error has occured <span class="error">I am groot</span>'
    );
  });
  test('does not wrap anything but errors', () => {
    const someOutput = errorTagger`I am just ${'someone'}, who may be ${new Error(
      'some error'
    )}, but definitely not ${new Error('this error')}. Peace!`;
    expect(someOutput).toBe(
      'I am just someone, who may be <span class="error">some error</span>, but definitely not <span class="error">this error</span>. Peace!'
    );
  });
});

describe('makeSandwich', () => {
  test('works fine when given the right ingredients', async () => {
    const sandwich = await makeSandwich(
      ['bread', 'mayonnaise'],
      ['cucumber', 'salami', 'broccoli', 'peas', 'bacon']
    );
    expect(sandwich.type).toBe('sandwich');
  });
  test('errors out when not given the right ingredients', async () => {
    expect.assertions(2);
    try {
      await makeSandwich(
        ['bread', 'bla bla'],
        ['cucumber', 'salami', 'broccoli', 'peas', 'bacon']
      );
    } catch (e) {
      expect(e instanceof Error).toBeTruthy();
    }
    try {
      await makeSandwich(
        ['bread', 'mayonnaise'],
        ['cucumber', 'no salami', 'broccoli', 'peas', 'bacon']
      );
    } catch (e) {
      expect(e instanceof Error).toBeTruthy();
    }
  });
});

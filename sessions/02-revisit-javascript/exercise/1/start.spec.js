import {
  safelyConvertToNumber,
  formatCurrency,
  getDiscountedValue,
  isFalsy,
  hasValue,
  getFirstAndLastNames,
  getValue,
} from './start';

describe('safelyConvertToNumber', () => {
  test('converts number properly', () => {
    expect(safelyConvertToNumber(10)).toBe(10);
    expect(safelyConvertToNumber(-10)).toBe(-10);
    expect(safelyConvertToNumber(-10.34)).toBe(-10.34);
    expect(safelyConvertToNumber(0.3)).toBe(0.3);
  });
  test('converts strings properly', () => {
    expect(safelyConvertToNumber('20')).toBe(20);
    expect(safelyConvertToNumber('2.35')).toBe(2.35);
    expect(safelyConvertToNumber('-2.35')).toBe(-2.35);
    expect(safelyConvertToNumber('-2')).toBe(-2);
    expect(safelyConvertToNumber('')).toBe(0);
  });
  test('converts symbols properly', () => {
    expect(safelyConvertToNumber(Symbol('blah'))).toBe(0);
  });
  test('converts other types properly', () => {
    expect(safelyConvertToNumber(true)).toBe(0);
    expect(safelyConvertToNumber(false)).toBe(0);
    expect(safelyConvertToNumber({})).toBe(0);
    expect(safelyConvertToNumber([])).toBe(0);
    expect(safelyConvertToNumber(null)).toBe(0);
    expect(safelyConvertToNumber(undefined)).toBe(0);
  });
});

describe('formatCurrency', () => {
  test('formats upto decimal point', () => {
    expect(formatCurrency(10.3333334, 2)).toBe(10.33);
    expect(formatCurrency(10.3333334, 4)).toBe(10.3333);
    expect(formatCurrency(23, 2)).toBe(23);
  });
  test('handles string like values', () => {
    expect(formatCurrency('10.566', 2)).toBe(10.57);
    expect(formatCurrency('-122.95', 2)).toBe(-122.95);
    expect(formatCurrency('', 2)).toBe(0);
  });
});

describe('getDiscountedValue', () => {
  test('calculates discounts properly', () => {
    expect(getDiscountedValue(100, 23)).toBe(77);
    expect(getDiscountedValue(100, 12.3345)).toBe(87.67);
  });
  test('handles string values', () => {
    expect(getDiscountedValue('119.95', '25')).toBe(89.96);
  });
});

describe('isFalsy', () => {
  test('marks boolean properly', () => {
    expect(isFalsy(false)).toBe(true);
    expect(isFalsy(true)).toBe(false);
  });
  test('applies coercions for non-boolean types', () => {
    expect(isFalsy(null)).toBe(true);
    expect(isFalsy(undefined)).toBe(true);
    expect(isFalsy(0)).toBe(true);
    expect(isFalsy(1)).toBe(false);
    expect(isFalsy(-1)).toBe(false);
    expect(isFalsy('')).toBe(true);
    expect(isFalsy('false')).toBe(false);
  });
});

describe('hasValue', () => {
  test('handles null and undefined', () => {
    expect(hasValue(null)).toBe(false);
    expect(hasValue(undefined)).toBe(false);
  });
  test('handles other types', () => {
    expect(hasValue(0)).toBe(true);
    expect(hasValue(10)).toBe(true);
    expect(hasValue(-10)).toBe(true);
    expect(hasValue('')).toBe(true);
    expect(hasValue('foo')).toBe(true);
    expect(hasValue(true)).toBe(true);
    expect(hasValue(false)).toBe(true);
    expect(hasValue({})).toBe(true);
    expect(hasValue([])).toBe(true);
  });
});

describe('getFirstAndLastNames', () => {
  test('handles empty string', () => {
    expect(getFirstAndLastNames('')).toEqual(['', '']);
  });
  test('handles names without surname', () => {
    expect(getFirstAndLastNames('Ross')).toEqual(['Ross', '']);
  });
  test('handles names with surname', () => {
    expect(getFirstAndLastNames('Ross Geller')).toEqual(['Ross', 'Geller']);
  });
  test('handles names with middlename', () => {
    expect(getFirstAndLastNames('Chandler Muriel Bing')).toEqual([
      'Chandler',
      'Muriel Bing',
    ]);
    expect(getFirstAndLastNames('Rachel K. Green')).toEqual([
      'Rachel',
      'K. Green',
    ]);
    expect(getFirstAndLastNames('A B C D')).toEqual(['A', 'B C D']);
  });
});

describe('getValue', () => {
  test('returns value from object if found', () => {
    expect(getValue({ foo: 'bar' }, 'foo', 'def')).toBe('bar');
    expect(getValue({ foo: false }, 'foo', 'def')).toBe(false);
  });
  test('returns default if not found', () => {
    expect(getValue({ foo: 'bar' }, 'biz', 'default')).toBe('default');
  });
  test('handles null and undefined', () => {
    expect(getValue(null, 'biz', 'default')).toBe('default');
    expect(getValue(undefined, 'biz', 'default')).toBe('default');
  });
  test('handles other types', () => {
    expect(getValue(10, 'biz', 'default')).toBe('default');
    expect(getValue('10', 'biz', 'default')).toBe('default');
    expect(getValue(true, 'biz', 'default')).toBe('default');
    expect(getValue([], 'biz', 'default')).toBe('default');
  });
});

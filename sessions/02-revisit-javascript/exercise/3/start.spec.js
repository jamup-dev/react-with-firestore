// Import exercises
import {
  insertItemAtIndex,
  reOrderArray,
  getEmails,
  addNumbers,
  reverseString,
  getUsersFromCountries,
} from './start';
// Import data
const users = require('../data');

describe('insertItemAtIndex', () => {
  test('inserts item at the given index', () => {
    const arr = [0, 1, 2, 3, 4, 5];
    expect(insertItemAtIndex(arr, 2, 99)).toEqual([0, 1, 99, 2, 3, 4, 5]);
    expect(insertItemAtIndex(arr, 0, 99)).toEqual([99, 0, 1, 2, 3, 4, 5]);
    expect(insertItemAtIndex(arr, 5, 99)).toEqual([0, 1, 2, 3, 4, 99, 5]);
    expect(insertItemAtIndex(arr, 6, 99)).toEqual([0, 1, 2, 3, 4, 5, 99]);
  });
  test('does not mutate the original array', () => {
    const arr = [0, 1, 2, 3, 4, 5];
    const newArr = insertItemAtIndex(arr, 0, 100);
    expect(arr).not.toBe(newArr);
  });
  test('checks for index and array length', () => {
    const arr = [0, 1, 2, 3, 4, 5];
    expect(() => {
      insertItemAtIndex(arr, -1, 100);
    }).toThrowError();
    expect(() => {
      insertItemAtIndex(arr, 7, 100);
    }).toThrowError();
    expect(() => {
      insertItemAtIndex(arr, 0, 100);
    }).not.toThrowError();
    expect(() => {
      insertItemAtIndex(arr, 6, 100);
    }).not.toThrowError();
  });
});

describe('reOrderArray', () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  test('works when from and to are equal', () => {
    const arrReordered = reOrderArray(arr, 3, 3);
    expect(arrReordered).not.toBe(arr);
    expect(arrReordered).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
  test('works when from is greater than to', () => {
    const arrReordered = reOrderArray(arr, 4, 2);
    expect(arrReordered).not.toBe(arr);
    expect(arrReordered).toEqual([0, 1, 4, 2, 3, 5, 6, 7, 8]);
    expect(reOrderArray(arr, 7, 0)).toEqual([7, 0, 1, 2, 3, 4, 5, 6, 8]);
    expect(reOrderArray(arr, 6, 5)).toEqual([0, 1, 2, 3, 4, 6, 5, 7, 8]);
    expect(reOrderArray(arr, 8, 0)).toEqual([8, 0, 1, 2, 3, 4, 5, 6, 7]);
  });
  test('works when from is less than to', () => {
    const arrReordered = reOrderArray(arr, 3, 7);
    expect(arrReordered).not.toBe(arr);
    expect(arrReordered).toEqual([0, 1, 2, 4, 5, 6, 7, 3, 8]);
    expect(reOrderArray(arr, 0, 8)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
    expect(reOrderArray(arr, 4, 5)).toEqual([0, 1, 2, 3, 5, 4, 6, 7, 8]);
    expect(reOrderArray(arr, 2, 7)).toEqual([0, 1, 3, 4, 5, 6, 7, 2, 8]);
  });
  test('throws error when out of bound', () => {
    expect(() => {
      reOrderArray(arr, 10, 1);
    }).toThrow();
    expect(() => {
      reOrderArray(arr, -10, 1);
    }).toThrow();
    expect(() => {
      reOrderArray(arr, 4, 10);
    }).toThrow();
    expect(() => {
      reOrderArray(arr, 4, -10);
    }).toThrow();
  });
});

describe('getEmails', () => {
  test('returns an array of strings', () => {
    const emails = getEmails(users);
    emails.forEach(email => {
      expect(typeof email).toBe('string');
    });
  });
  test('gets just the email', () => {
    const emails = getEmails(users);
    users.forEach(user => {
      expect(emails.includes(user.email)).toBeTruthy();
    });
  });
  test('does not alter the input array', () => {
    expect(getEmails(users)).not.toBe(users);
  });
});

describe('addNumbers', () => {
  test('adds any amount of numbers', () => {
    expect(addNumbers(1, 100, 99)).toBe(200);
  });
  test('handles string value of numbers', () => {
    expect(addNumbers(1, '2', 3, 4)).toBe(10);
  });
  test('handles incompatible types', () => {
    expect(addNumbers([], {}, null)).toBe(0);
  });
});

describe('reverseString', () => {
  test('does reverse a string', () => {
    expect(reverseString('scooby')).toBe('yboocs');
    expect(reverseString('shelly')).toBe('yllehs');
  });
});

describe('getUsersFromCountries', () => {
  test('gets users only from mentioned countries', () => {
    const countries = ['Liechtenstein', 'Cayman Islands', 'Australia'];
    const filteredUsers = getUsersFromCountries(users, countries);
    filteredUsers.forEach(user => {
      expect(countries.includes(user.address.country)).toBeTruthy();
    });
  });
  test('works with a single country too', () => {
    const filteredUsers = getUsersFromCountries(users, 'Latvia');
    filteredUsers.forEach(user => {
      expect(user.address.country).toBe('Latvia');
    });
  });
  test('does not alter the input array', () => {
    expect(getUsersFromCountries(users, 'Latvia')).not.toBe(users);
  });
});

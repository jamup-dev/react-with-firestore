/**
 * Inserts an item to an existing array at a particular position
 * shifting the rest of the items.
 *
 * This is a pure function and doesn't change the original
 * parameters.
 *
 * It should throw an error if index is less than 0
 * or greater than array.length
 *
 * @param {Array} arr Input array.
 * @param {number} index Index where to insert the item.
 * @param {any} item The item to insert.
 *
 * @return {Array} The new array with the item inserted.
 */
export function insertItemAtIndex(arr, index, item) {}

/**
 * Reorder an array by taking an existing item at an index
 * and put it at a new index, shifting the rest of the items.
 *
 * @param {Array} arr Input array.
 * @param {number} from Index of the item to reorder.
 * @param {number} to The new position where to insert it.
 */
export function reOrderArray(arr, from, to) {}

/**
 * Get the email from all users and return them as an array.
 *
 * @param {Array} data Data of users.
 * @returns {string[]} Array of emails.
 */
export function getEmails(data) {}

/**
 * Add any number of arguments passed to the function and return
 * the sum value.
 *
 * 🧸 - Use rest parameter.
 * 🧸 - Take into account if an argument is not a number.
 * 🧸 - Use array.reduce.
 *
 * @param {any[]} numbers Possibly numbers.
 * @returns {number} Summed up value or 0 if all NaN.
 */
export function addNumbers(...numbers) {}

/**
 * A function to reverse the characters of a string.
 *
 * 🧸 - Spread the string into array.
 * 🧸 - Use array methods to reverse it.
 *
 *
 * @param {string} str Input string.
 * @returns {string} Reversed string.
 */
export function reverseString(str) {}

/**
 * A function to filter users by countries.
 *
 * It takes multiple countries and filters out users who are from those countries.
 *
 * 🧸 - Use Array.of if countries is not an Array.
 * 🧸 - Use array.filter to filter array by a callback function
 * 🧸 - Use array.includes to make sure the address matches the countries.
 *
 * @param {Array} users Array of users object.
 * @param {string[]} countries Array of countries.
 * @return {Array} Filtered users who belong to the mentioned country.
 */
export function getUsersFromCountries(users, countries) {}

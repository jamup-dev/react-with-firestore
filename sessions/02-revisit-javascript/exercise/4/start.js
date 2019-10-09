/**
 * Get modified classname of an element based on modifiers.
 *
 * If we pass {hidden: true, collapsed: false} as modifiers and 'my-component'
 * as the base, then it should result into
 * 'my-component my-component--hidden'.
 *
 * So this function should create a qualified Modifier classname as per BEM
 * specification: http://getbem.com/naming/
 *
 * 🧸 - Check if `modifiers` is object literal and not array or null. If so, return the base.
 * 🧸 - Each key of the `modifiers` should act as the modifier class.
 *
 * @param {string} base Base class name.
 * @param {Object} modifiers Object with key value pair. If the value is true
 *                           it would add a modifier classname based on base.
 * @returns {string} Fully qualified BEM classname.
 */
export function getModifiedClassName(base, modifiers = {}) {}

/**
 * An template tag function to convert all Error into `<span class="error">error message</span>`
 * for nice display.
 *
 * It takes the template tag and wraps the `Error` object with the HTML. Everything
 * else stay as-is.
 *
 * So for
 * INPUT: errorTagger`I ${new Error('am')} groot.`
 * OUTPUT: 'I am <span class="error">am</span> groot.'
 *
 * @param {string[]} str String parts.
 * @param  {...any} values Value parts.
 * @returns {string} Highlighted HTML string.
 */
export function errorTagger(str, ...values) {}

// 💰 I advice you read these before taking on the promises
//     👍 https://hackernoon.com/javascript-promises-best-practices-anti-patterns-b32309f65551
//     👍 https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

/**
 * Prepare bread by spreading over the ingredients.
 *
 * We must pass bread and mayonnaise else the promise will fail.
 *
 * @param {string[]} items Items to prepare bread with.
 * @returns {Promise} Prepared bread.
 */
export function prepareBread(items) {}

/**
 * Prepare salad with ingredients.
 *
 * We must pass cucumber, salami and broccoli else the promise will reject.
 *
 * @param {string[]} items Salad items.
 * @returns {Promise} Salad.
 */
export function prepareSalad(items) {}

/**
 * Grill bread with salad.
 *
 * We must pass prepared-bread and salad else it will fail.
 *
 * @param {Object} preparedBread Prepared bread.
 * @param {Object} salad Prepared Salad.
 * @returns {Promise} Grilled bread with the salad.
 */
export function grillBread(preparedBread, salad) {}

/**
 * A function to make sandwich based on ingredients provided.
 *
 * 🧸 - Should prepare bread and salad in parallel.
 * 🧸 - Once done, grill the bread and salad together.
 * 🧸 - Finally return the Prepared sandwich.
 * 🧸 - Should throw an error if any of the function throws.
 * 💡 - A thing about async function or promise callback is
 *      any thrown exception are always treated as rejected promise.
 *      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#Return_value
 *
 * @param {string[]} breadItems Items for preparing the bread.
 * @param {string[]} saladItems Items for preparing the salad.
 * @returns {Promise<Object>} A promise to make the sandwich.
 */
export async function makeSandwich(breadItems, saladItems) {}

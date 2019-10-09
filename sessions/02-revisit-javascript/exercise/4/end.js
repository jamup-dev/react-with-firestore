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
export function getModifiedClassName(base, modifiers = {}) {
  if (
    typeof modifiers !== 'object' ||
    Array.isArray(modifiers) ||
    modifiers === null
  ) {
    return base;
  }
  return Object.keys(modifiers).reduce(
    (acc, modifier) =>
      modifiers[modifier] ? `${acc} ${base}--${modifier}` : acc,
    base
  );
}

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
export function errorTagger(str, ...values) {
  return str.reduce(
    (acc, cur, index) =>
      `${acc}${cur}${
        values[index] instanceof Error
          ? `<span class="error">${values[index].message}</span>`
          : values[index] || ''
      }`,
    ''
  );
}

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
export function prepareBread(items) {
  return new Promise((resolve, reject) => {
    if (!items.includes('bread') || !items.includes('mayonnaise')) {
      reject(new Error('Need bread and egg to prepare bread'));
    }
    const spreadWith = items.reduce(
      (acc, cur) => (cur === 'bread' ? acc : `${acc} ${cur}`),
      ''
    );
    resolve({
      type: 'prepared-bread',
      item: `bread spread with${spreadWith}`,
    });
  });
}

/**
 * Prepare salad with ingredients.
 *
 * We must pass cucumber, salami and broccoli else the promise will reject.
 *
 * @param {string[]} items Salad items.
 * @returns {Promise} Salad.
 */
export function prepareSalad(items) {
  return new Promise((resolve, reject) => {
    const minAcceptedIngredients = ['cucumber', 'salami', 'broccoli'];
    minAcceptedIngredients.forEach(item => {
      if (!items.includes(item)) {
        reject(new Error(`We need ${item} to prepare the salad`));
      }
    });
    resolve({
      type: 'salad',
      item: `salad of ${items.join(', ')}.`,
    });
  });
}

/**
 * Grill bread with salad.
 *
 * We must pass prepared-bread and salad else it will fail.
 *
 * @param {Object} preparedBread Prepared bread.
 * @param {Object} salad Prepared Salad.
 * @returns {Promise} Grilled bread with the salad.
 */
export function grillBread(preparedBread, salad) {
  return new Promise((resolve, reject) => {
    // We need the prepared bread and salad
    if (preparedBread.type !== 'prepared-bread') {
      reject(new Error('We need prepared Bread'));
    }
    if (salad.type !== 'salad') {
      reject(new Error('We need salad'));
    }
    resolve({
      type: 'sandwich',
      item: `grilled ${preparedBread.item} and ${salad.item}`,
    });
  });
}

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
export async function makeSandwich(breadItems, saladItems) {
  try {
    // 🧸 Prepare salad and bread in parallel
    const [bread, salad] = await Promise.all([
      prepareBread(breadItems),
      prepareSalad(saladItems),
    ]);
    // 🧸 Now grill it
    const sandwich = await grillBread(bread, salad);
    // 🧸 Return it
    return sandwich;
  } catch (e) {
    throw new Error(`Could not prepare sandwich. Error: ${e.message}`);
  }
}

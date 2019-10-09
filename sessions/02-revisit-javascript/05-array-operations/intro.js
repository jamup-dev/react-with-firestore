/* eslint-disable strict */
/* eslint-disable no-self-compare */
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */

// ? Why use strict
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

'use strict';

// ✅ What is an Array.

// 🎙️ An array is a special type of object in JavaScript
// 🎙️ Where all the keys are numeric and have one magic
// 🎙️ property called `length`.

// ✅ Creating an Array.

// 🎙️ Just like objects, Arrays can be created with
// 🎙️ Array constructor function
// eslint-disable-next-line no-array-constructor
const a = new Array();
a[0] = 'Scooby';
a[1] = 'Shelly';
a[2] = 'Hero';

// 🎙️ Or more conveniently using array literals
const b = ['Scooby', 'Shelly', 'Hero'];

// 🎙️ As a rule of thumb
//     👍 Always use array literals.

// ✅ Accessing items of array.

// 🎙️ With arrays, we always use bracket notation to access an item
// 🎙️ Through the bracket we pass in the index of the item.
console.log(a[1]);

// 🎙️ The index could also be a variable itself, but it has to be a number(integer).
const i = 2;
console.log(a[i]);

// 🎙️ If it is not a number, then JavaScript converts it
console.log(a['2']);

// 🎙️ A more practical example would be
for (let j = 0; j < a.length; j++) {
	console.log(a[j]);
}

// ✅ Length of an Array.

// 🎙️ Length of an array is always 1 more than the highest index in the array.
// 🎙️ It may often mean, the number of items in an array, but not neccesarily so.
// 🎙️ Consider this
console.log(a.length);
// 🎙️ The length is 3 because we have 3 items?
// 🎙️ Let's insert another item, but not at index 3
a[99] = 'Chaos';
// 🎙️ Now if we check the length
console.log(a.length);
// 🎙️ It is 100, ie, 1 more than highest index, which is 99.
// 🎙️ From index 3 to 98, we have just `undefined` items.

// ✅ Reference and Equality of array.

// 🎙️ Since array is basically object
console.log(typeof a);

// 🎙️ Reference and equality rules are same
// 🎙️ Variables are reference to array objects
const c = b;
c[c.length] = 'Chaos';
console.log(c, b);

// 🎙️ And they are equal, when both variables point to the same array reference
console.log(c === b);
// 🎙️ regardless of the shape
console.log([1] === [1]);

// ✅ Checking if an object is an array.

// 🎙️ To check if an something is an array
// 🎙️ we use Array.isArray
console.log(Array.isArray({}));
console.log(Array.isArray([]));
console.log(Array.isArray(null));

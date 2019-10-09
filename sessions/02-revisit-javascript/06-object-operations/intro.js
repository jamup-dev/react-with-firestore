/* eslint-disable strict */
/* eslint-disable no-self-compare */
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */

// ? Why use strict
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

'use strict';

// ✅ What is Object.

// 🎙️ In JavaScript everything (almost) is really an object.
// 🎙️ Can be thought of as simple collections of name-value pairs.
// 🎙️ name part is a JavaScript string.
// 🎙️ value part can be anything, from primitives, to objects to functions.

// ✅ Creating object.

// 🎙️ There are two ways to create an object.

// 🎙️ Using Object constructor function.
// eslint-disable-next-line no-new-object
const obj1 = new Object();
// 🎙️ or the convenient object literal
const obj2 = {};
console.log(obj1, obj2);

// 🎙️ Object literal can be used to initialize an object in its entirety.
// 🎙️ meaning, while declaring an object we can write in all the name-value pairs.

const obj = {
	id: '001',
	name: 'Swashata Ghosh',
	role: 'Developer',
	social: {
		facebook: 'swashata',
		twitter: 'swashata',
		linkedin: 'swashata',
	},
	hobby: ['tv series', 'marvel movies', 'dogs'],
	favorites: {
		tvSeries: ['Big Bang Theory', 'Friends'],
		movies: ['Inception', 'Iron Man'],
	},
};
console.log(obj);

// 🎙️ and that's why we will always use the object literal
// 🎙️and almost never the object constructor.

// ✅ Accessing properties of object.

// 🎙️ To access a name-value pair, we can use the dot notation
console.log(obj.id);

// 🎙️ Or the bracket notation
// eslint-disable-next-line dot-notation
console.log(obj['social']);

// 🎙️ If the value of a name-value pair is another object
// 🎙️ we can chain while accessing
console.log(obj.social.linkedin);

// 🎙️ We can use the bracket notation and also can mix them
// eslint-disable-next-line dot-notation
console.log(obj['favorites']['tvSeries']);
// eslint-disable-next-line dot-notation
console.log(obj.favorites['movies']);

// 🎙️ As a general rule of thumb
//     👍 Always prefer the dot notation.
//     👍 Use bracket notation if the access key (name) is a variable.
const hobbyKey = 'hobby';
console.log(obj[hobbyKey]);

// 🎙️ Here's a more practical example
Object.keys(obj).forEach(key => {
	console.log(obj[key]);
});

// 🎙️ Objects can also be created with constructor functions
// 🎙️ But we won't discuss that now, rather in the functions chapter.

// ✅ Reference variable.

// 🎙️ When we assign an object to a variable
// 🎙️ The variable holds what is called the memory reference of the object
// 🎙️ The bottom line is, if we assign the variable to another variable
// 🎙️ Then both the variables point to the same object
// 🎙️ Let's see in action
const scooby = { name: 'Scooby', age: 4 };
// 🎙️ We are thinking of creating a copy of scooby to shelly
const shelly = scooby;
// 🎙️ And change the properties
shelly.name = 'Shelly';
// 🎙️ At this point if we think
// 🎙️ scooby.name === 'Scooby'
// 🎙️ and
// 🎙️ shelly.name === 'Shelly'
// 🎙️ then that would be wrong.
// 🎙️ Because both variables `scooby` and `shelly` refer to the same object.
// 🎙️ So when we are changing through one variable
// 🎙️ The other variable being pointing to the same object
// 🎙️ catches the change as well.
console.log(shelly.name);
console.log(scooby.name);

// 🎙️ This is called reference variable
// 🎙️ and it is applicable to all non-primitive javascript types

// ✅ Equality of objects.

// 🎙️ Two variables are equal, if they point to the same object.
// 🎙️ So in the above code, both scooby and shelly point to the same object.
// 🎙️ Hence they are equal.
console.log(scooby === shelly);

// 🎙️ But if two variables point to different objects
// 🎙️ then regardless of the shape, two variables are not
// 🎙️ equal.

const objOne = { location: 'India' };
const objTwo = { location: 'India' };
console.log(objOne === objTwo);

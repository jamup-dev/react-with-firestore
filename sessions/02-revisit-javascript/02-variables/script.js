/* eslint-disable func-names */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable strict */

// 🎙️ Through out all the JavaScript files we will use "use strict"
// 🎙️ to take advantage of some new JavaScript debugging and catch
// 🎙️ some errors that otherwise would've been silent.
// ? Why use strict
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

'use strict';

// ✅ How do we declare variables in JavaScript

// 🎙️ In JavaScript, declaration of variable starts with the keywords
// 🎙️ `var`, `const` or `let`.
// 🎙️ `var` has been there since the beginning of JavaScript and only
// 🎙️ recently we have the concepts of `const` and `let`.
// 🎙️ So to declare a variable, named myVar
var myVar = 10;

// 🎙️ Or we could declare a variable whose value is meant to change
// 🎙️ in runtime with `let`. The concept is that the variable will be
// 🎙️ reassigned.
let thisVariableWillChange = 'Hello';
thisVariableWillChange += ' World';
console.log(thisVariableWillChange);

// 🎙️ If we intend not to reassign a variable, then we use `const`
const iAmNotGoingToChange = 'Dragons';

// 🎙️ If we try to reassign it, then JavaScript engine
// 🎙️ will throw an error.
try {
	iAmNotGoingToChange = 'Fire';
} catch (e) {
	console.log(e);
}

// ✅ What are different types of scopes, lexical, block, global.

// 🎙️ JavaScript variables, declared with `var` has lexical scope
// 🎙️ Meaning, the variable is visible throughout the outer function
// 🎙️ regardless of where it was defined.

(function() {
	// 🎙️ variable later is visible at this point
	// 🎙️ although it has not been declared
	console.log(later + 10);
	var later = 20;
})();

// 🎙️ The above is equivalent to something like this
(function() {
	var later; // 🎙️ We haven't assigned any value to `later` so it is undefined.
	console.log(later + 10);
	later = 20;
})();

try {
	(function() {
		// 🎙️ Since we are in strict mode, if variable later
		// 🎙️ was never defined, it would've thrown an error
		console.log(later + 10);
	})();
} catch (e) {
	console.log(e);
}

// 🎙️ This concept is called lexical scope
// 🎙️ This is possible in JavaScript because
// 🎙️ although JS falls under the category of 'dynamic' or 'interpreted' language
// 🎙️ it is actually a compiled language.
// 🎙️ The JS Runtime Engine of your browser or Nodejs
// 🎙️ compiles the `.js` file before executing it.
// 🎙️ So for lexical scopes, JS engine knows the scope of a variable declared with var
// 🎙️ regardless where it was declared.
// 🎙️ The scope is given throughout the function.
// 🎙️ Read more
// 🎙️ https://medium.com/@nickbalestra/javascripts-lexical-scope-hoisting-and-closures-without-mystery-c2324681d4be

// ✅ Why did we need `const` and `let`.

// 🎙️ The lexical scope is all good and powerful, but could be confusing.
// 🎙️ So new version of ECMAScript (ECMAScript 2015 or ES6) came up with
// 🎙️ block scoped variable declaration with `let` and `const`.
// 🎙️ Both have scopes with-in the block. The difference is
// 🎙️ With `let` we can reassign a variable but with `const` we cannot.

// 🎙️ Let's see the same example with `let`.
try {
	(function() {
		// 🎙️ Later is not defined here at all.
		console.log(later + 10);
		// From this line onwards, later is visible.
		let later = 10;
	})();
} catch (e) {
	console.log(e);
}

// 🎙️ For `for`, `while` loops, if we declare a variable with let, it is only
// 🎙️ visible inside the for loop

(function() {
	// 🎙️ Not before
	try {
		console.log(i);
	} catch (e) {
		console.log(e);
	}
	for (let i = 0; i < 10; i++) {
		console.log(i);
	}
	// 🎙️ Not after
	try {
		console.log(i);
	} catch (e) {
		console.log(e);
	}
})();

// ✅ Concept of variable reassignment and `const`.

// 🎙️ const is used to declare a variable
// 🎙️ where we are not supposed to re-assign it

(function() {
	// 🎙️ But in case of objects (and arrays), we can mutate the object
	const simpleObj = {};
	// 🎙️ So it's okay to do this
	simpleObj.name = 'Swashata';
	console.log(simpleObj);

	// 🎙️ But it is not okay to do this
	try {
		simpleObj = { name: 'Swashata' };
	} catch (e) {
		console.log(e);
	}
})();

// 🎙️ Why? Because we can not reassign it.

// 🎙️ So as a general rule of thumb
// 👍 Never use `var` anymore.
// 👍 Always prefer to use `const`.
// 👍 If we need to reassign a variable, then use `let`.

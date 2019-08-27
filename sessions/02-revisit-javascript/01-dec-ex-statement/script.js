/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

// ✅ Declaration initiates a value.

// 🎙️ Declaration is like creating a variable or function.
// 🎙️ Everything possibly starts with declaration.

/**
 * * JavaScript Declaration
 * - Declare variables.
 * - And that's it.
 */
// 🎙️ When declaring a variable, we use let, const or var
// 🎙️ Depending on scope and reassignability.
// 🎙️ Here we declare some primitives.
let a = 10;
const b = 20;
// 🎙️ We can also declare a function in a variable
// 🎙️ This is basically called a function expression.
// 🎙️ More on it later.
const func = function() {};

// 🎙️ But we usually declare a function with this syntax.
function mySweetFunc() {}

// ✅ Expression produces a value.

/**
 * * JavaScript Expression
 * - Produces a value.
 * - Like operation on variables.
 * - Arguments passed to a function.
 */
// 🎙️ Here we add a and b
a + b;
// 🎙️ Or we call a function
func('hello', 'world');

// 🎙️ Or a function expression
(function() {});

//  🎙️ Or a named function expression
(function foo() {
	// foo is visible only here
});
// 🎙️ The thing about function expression is, it is only visible to itself
// 🎙️ and not the outer world.
// 🎙️ So although foo is visible inside it
// 🎙️ foo is not visible here
console.log(typeof foo);

// 🎙️ Let's see another example
// 🎙️ We use a named function expression and store it in the variable factorial
// 🎙️ Notice that the function is recursive
// 🎙️ And it is visible inside it, ie, me is visible inside me.
const factorial = function me(x) {
	// me is visible here
	console.log(typeof me);
	return x <= 1 ? 1 : x * me(x - 1);
};
// 🎙️ but me is not visible here
console.log(typeof me);
console.log(factorial(1));

// ✅ Statement performs an action.

/**
 * * JavaScript Statements
 * - Roughly performs an action.
 * - Calling a function.
 * - if, while, for blocks.
 */

if (a) {
	console.log(b);
}
for (let i = 0; i < b; i++) {
	console.log(a);
}

// 🎙️ Wherever JavaScript expects a statement, you can also write an expression.
// 🎙️ We could go ahead and write here a statement
if (factorial(2) > 2) {
	console.log('Huh!');
}
// 🎙️ Or we could just write an expression
const ourFactorial = factorial(12);

// 🎙️ But not reverse, `if` can not become argument of a function.
// factorial(if(true) { /*something*/ });
// 🎙️ Above is syntax error

// ✅ Immediately invoked function expression (iffe).

// 🎙️ Only a function expression can be invoked immediately, not a function declaration
(function() {
	// do something
})(); // okay

// 🎙️ not okay
// function isItIffie() {}();

// Read more: http://2ality.com/2012/09/expressions-vs-statements.html

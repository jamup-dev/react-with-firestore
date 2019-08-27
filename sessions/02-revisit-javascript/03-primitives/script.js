/* eslint-disable strict */
/* eslint-disable no-self-compare */
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */

// ? Why use strict
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

'use strict';

// ✅ Number.

// 🎙️ Assignable with Number() or just as a literal.
// 🎙️ Could be an integer or a float.
// 🎙️ Internally is an object with many methods.
// 🎙️ double-precision 64-bit format IEEE 754 values (kill math).

// 🎙️ Integers and floats are just `number` is JavaScript
// 🎙️ They don't have any `typeof` difference
// integer
const anInt = 12;
console.log('​aNumber', typeof anInt, anInt);

// float
const aFloat = 8.123;
console.log('​aFloat', typeof aFloat, aFloat);

// 🎙️ Remember that double-precision 64-bit (head-bang) thing I said?
// 🎙️ It basically means, JavaScript can not do math with
// 🎙️ floating point numbers.
// kill math
console.log(0.1 + 0.2 === 0.3, 0.1 + 0.2);

// 🎙️ One way to go around this problem is
// 🎙️ Use `.toFixed` to get a round value
// 🎙️ And then cast the output String to number again
// 🎙️ Here we are simply using the + operator to cast it.
console.log(+(0.1 + 0.2).toFixed(2));

// 🎙️ The safest way to cast any variable to number is
// 🎙️ to pass it through Number built-in function.
// 🎙️ If the variable is not a number like, then it will
// 🎙️ result in NaN (not a number)
// Cast others to Number
const castedNumber = Number('20.22');
console.log('​castedNumber', castedNumber);
const anotherCastedNumber = Number.parseFloat('12.34');
console.log('​anotherCastedNumber', anotherCastedNumber);
console.log(Number(false));
console.log(Number(true));
// Works good for primitives only
console.log(Number({ foo: true }));

// ✅ String.

// 🎙️ Assignable with String() or a literal.
// 🎙️ Internally is an object with many methods.
// 🎙️ Has @@iterator method, hence is iterable.

// 🎙️ We just literally create a string with JavaScript
const aString = 'Hello World';
console.log('​aString', typeof aString, aString);

// 🎙️ String has one magic property `length`
// Length of a string
console.log(aString.length);

// 🎙️ And it also has many useful methods

// charCode of a character of a string
console.log(aString.charCodeAt(1));

// Convert to upper case
console.log(aString.toUpperCase());

// 🎙️ We can convert strings to array very easily
// 🎙️ Using many methods

// 🎙️ Firstly one using classic split
console.log(aString.split(''));

// 🎙️ And also with newer language features like

// 🎙️ Array.from
console.log(Array.from(aString));
// 🎙️ And spread into an array
console.log([...aString]);

// Iterate through a string
// 🎙️ String has iterator method implemented
console.log(aString[Symbol.iterator]);
// 🎙️ So we can use for..of loop against it
for (const ch of aString) {
	console.log(ch);
}
// 🎙️ for..of is a new JavaScript language feature
// 🎙️ that lets us iterate any object which has the @@iterate method.
// 🎙️ For details do visit this link
// 🎙️ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables

// Cast to String
// 🎙️ For number, we can use `.toString` on the number itself.
console.log((12).toString());
// 🎙️ Or we can pass the primitives directly to String built-in function
console.log(String(12.34));
console.log(String(true));

// 🎙️ Works good for primitives only
console.log(
	String({
		foo: 'bar',
	})
);

// ✅ Boolean.

// 🎙️ Assignable with Boolean or as literal true or false.
// 🎙️ Internally is an Object with only method valueOf.

// 🎙️ To create a boolean variable, we simply assign `true` or `false`.
const aBool = true;
console.log('​aBool', typeof aBool, aBool);
// 🎙️ We have one special method valueOf.
// 🎙️ I can't say that we use it too much.
console.log(aBool.valueOf());

// 🎙️ When casting other variables to boolean
// 🎙️ there are two rules to remember.
// 🎙️     1. false, 0, empty strings (""), NaN, null, and undefined all become false.
// 🎙️     2. All other values become true.
// 🎙️ Just like String and Number, we pass the value through built-in Boolean function.
console.log(Boolean(''));
console.log(Boolean('hello'));
console.log(Boolean([]));
console.log(Boolean({}));
console.log(Boolean(1));

// ✅ Symbol.

// 🎙️ Symbol is a new type of primitive added to JavaScript.
// 🎙️ Three things to remember about symbols are:
// 🎙️     1. Does not have a literal value.
// 🎙️     2. Is always unique.
// 🎙️     3. Mainly used to assign non-iterable unique properties to an object.

// 🎙️ We create symbol with built-in `Symbol` function
// 🎙️ And we pass in a string to the function and it is known as
// 🎙️ Symbol description.
const symOne = Symbol('My first symbol');
const symTwo = Symbol('My second symbol');

// 🎙️ typeof Symbol is always `symbol`.
console.log(typeof symOne);
console.log(typeof symTwo);

// 🎙️ No matter the description, symbols are never equal
console.log(symOne === symTwo);
// 🎙️ even with same description
console.log(Symbol('hello') === Symbol('hello'));

// 🎙️ Basic usage of Symbol is as object property.
const mySecretiveObj = {
	fName: 'Swashata',
	lName: 'Ghosh',
	[symOne]: 'Dragons',
	[symTwo]: 'Shenanigans',
};
// 🎙️ If we console log the object we get the Symbol properties
console.log(mySecretiveObj);
// 🎙️ But symbol properties are not found in regular or enumerable object keys
console.log(Object.keys(mySecretiveObj));
// 🎙️ Although if we have the symbol, we can access it directly
console.log(mySecretiveObj[symOne]);
// 🎙️ to get all symbol properties, use Object.getOwnpropertySymbols
console.log(Object.getOwnPropertySymbols(mySecretiveObj));
console.log(Object.getOwnPropertySymbols(mySecretiveObj)[0] === symOne);

// 🎙️ Symbols can not be cast
try {
	console.log(Number(Symbol('10')));
} catch (e) {
	console.log(e);
}

// 🎙️ Symbol can not be used to cast, like Boolean or Number or String
console.log(Symbol(12));
// 🎙️ It basically takes the string value
// 🎙️ of the parameter
console.log(Symbol({}));

// ✅ Others -> null, undefined.

// 🎙️ null is a deliberate non-value, i.e, set explicitly by the programmer.
// 🎙️ Internall null is an object, but has to properties and methods.
console.log(typeof null);

// 🎙️ undefined is uninitialized value,
// 🎙️ i.e, a varibale is declared, but no value has been given.
// 🎙️ The type of undfined is "undefined"
console.log(typeof undefined);

// 🎙️ Let's see them in action
let undefinedVariable;
// 🎙️ Since the variable is declared but no value is assigned
// 🎙️ it currently has a value `undefined`
// 🎙️ The type of the variable is also "undefined"
console.log(undefinedVariable, typeof undefinedVariable);
// 🎙️ But it is not null
console.log(undefinedVariable === null);
console.log(undefinedVariable === undefined);

// 🎙️ Now we can explicitly set it to null
undefinedVariable = null;
console.log(typeof undefinedVariable);
console.log(undefinedVariable === null);
console.log(undefinedVariable === undefined);

// 🎙️ null and undefined are loosely equal.
console.log(undefined == null);

// 🎙️ Both null and undefined are also falsy
console.log(null == 0);
console.log(null == 1);
console.log(null == false);
console.log(null == true);

console.log(undefined == 0);
console.log(undefined == 1);
console.log(undefined == true);
console.log(undefined == false);

// 🎙️ Hence, never use eqeq, always use eqeqeq
// 🎙️ if checking for unassigned or null value
let value;
console.log(value);
if (value === null || value === undefined) {
	value = 10;
}
console.log(value);

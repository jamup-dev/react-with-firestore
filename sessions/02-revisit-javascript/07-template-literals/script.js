/* eslint-disable prefer-template */
/* eslint-disable func-names */
/* eslint-disable no-useless-concat */
/* eslint-disable strict */
// ? Why use strict
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

'use strict';

// ✅ Introduction to template literals.

// 🎙️ Template literals are string literals allowing embedded expressions.
// 🎙️ Prior ES6 (ES2015) they were called "template strings".
// 🎙️ But we shall always call them "template literals" now.

// 🎙️ Template literals are enclosed by back-tick (``) instead of any quotes.
const iAmATemplateLiteral = `How cool is that?`;
console.log(iAmATemplateLiteral);

// 🎙️ If we need back-tick literally inside a template literal, we escape them
const whatIsTL = `String enclosed with \` (back-ticks)`;
console.log(whatIsTL);

// ✅ Multi-line strings.

// 🎙️ In JavaScript string literals, we couldn't do multiline strings
console.log(
	'Hello World\n' + 'looking sharp?\n' + 'this is really awesome?? right'
);

// 🎙️ But with template literals, we can just do
console.log(`Hello World
Looking sharp?
this is really awesome?? right`);

// ✅ Expression interpolation.

// 🎙️ We can embed expressions within a normal string
// 🎙️ The stringy value of the expression is taken.

// 🎙️ Consider the following example
(function() {
	const a = 5;
	const b = 10;
	console.log('b/a is ' + b / a + ' and b+a is ' + (b + a));
	// 🎙️ With expression interpolation we can simply put the expression
	// 🎙️ inside ${}
	// 🎙️ ${} is a placeholder and you can put any valid
	// 🎙️ javascript expression inside it.
	console.log(`b/a is ${b / a} and b+a is ${b + a}`);

	// 🎙️ Note that the stringy value of the expression is always considered
	// 🎙️ So by default, we can not do like
	console.log(
		`let's call a function expression ${function() {
			return 'hello';
		}} like this?`
	);
	// 🎙️ and expect the function to have been called
	// 🎙️ For usage like this, we have tagged template literals.

	// 🎙️ Also note, we can only put expressions inside the placeholder
	// 🎙️ not a statement.
	// console.log(`is it true? ${if (true) 'yes'}`);
	// 🎙️ The above will result in a syntax error
})();

// ✅ Nesting templates.

// 🎙️ We have seen we can not put conditional statement in the template literal
// 🎙️ placeholders. They accept only expressions.
// 🎙️ Luckily we have an expression alternative of if statement
// 🎙️ and that is ternary expression

// 🎙️ With the help of this and nesting capability
// 🎙️ we can easily create conditional strings

(function() {
	// 🎙️ Consider the following function
	/**
	 * Get BEM type class name of a component based on whether
	 * it is collapsed or not.
	 *
	 * @param {String} base Base class name of BEM.
	 * @param {Boolean} collapsed Whether it is collapsed.
	 */
	function getClassName(base, collapsed) {
		// 🎙️ So based on whether collapsed is true or not
		// 🎙️ We add a modifier class to it.
		return `${base} ${collapsed ? `${base}--collapsed` : ''}`;
	}
	console.log(getClassName('panel', true));
	console.log(getClassName('button', false));
})();

// ✅ Tagged template literals.

// 🎙️ Finally the most powerful tool we have with template literals
// 🎙️ is the tagged template literal.

// 🎙️ A tag is a function we use to parse a template literal.
// 🎙️ The first parameter of the function is array of string
// 🎙️ broken into pieces without the placeholders.
// 🎙️ The remaining parameters are the expressions inside placeholders.

// 🎙️ Let's consider a very trivial tag
(function() {
	function speedTag(string, speed) {
		let speedExp;
		if (speed > 90) {
			speedExp = 'very fast';
		} else if (speed > 70) {
			speedExp = 'fast';
		} else if (speed > 50) {
			speedExp = 'moderate';
		} else if (speed > 30) {
			speedExp = 'slow';
		} else {
			speedExp = 'slow';
		}
		return `${string[0]}${speedExp}${string[1] || ''}`;
	}
	console.log(speedTag`I was clocking ${100} speed at the highway`);
	console.log(speedTag`He is ${51}.`);

	// 🎙️ So for the string
	// `He is ${51}`
	// 🎙️ speedTag gets string parameter as
	// [
	// 	'He is ',
	// 	''
	// ]
	// 🎙️ and speed as 51
})();

// 🎙️ Now let's consider some practical example
(function() {
	// 🎙️ Let's write a tag that would
	// 🎙️ highlight the expressions
	function highlight(str, ...values) {
		console.log(str);
		console.log(values);
		// 🎙️ So string is one more than values
		// 🎙️ and the concatenation should be like
		// return (
		// 	str[0] +
		// 	values[0] +
		// 	str[1] +
		// 	values[1] +
		// 	str[2] +
		// 	values[2] +
		// 	str[3]
		// );
		// 🎙️ Notice that although the placeholder ends the literal
		// 🎙️ We still have an empty string at the end of str variable
		// 🎙️ So our target is to highlight it, i.e
		// 🎙️ Maybe wrap inside html `<span class="highlight"></span>
		// 🎙️ Let's make use of the array.reduce to do just that
		return str.reduce(
			(acc, cur, index) =>
				`${acc}${cur}${
					values[index]
						? `<span class="highlight">${values[index]}</span>`
						: ''
				}`,
			''
		);
	}
	console.log(
		highlight`I am really ${'enjoying'} the ${'JavaScript'} class. ${'yay'}`
	);
})();

// 🎙️ Let's see somewhat more real world example
// 🎙️ This concept will help you when you start using CSS-in-JS
// 🎙️ and styled-components
(function() {
	// 🎙️ Let's have a function
	// 🎙️ Which returns a tag function based on the passed data
	function getTagger(data) {
		// 🎙️ It is kind of like creating a context aware tag function
		// 🎙️ The tag function will check all the expressions
		// 🎙️ If the expression is a function, it will call the function
		// 🎙️ With the data provided.
		// 🎙️ Otherwise, it will just take the string value.
		return (str, ...values) =>
			str.reduce((acc, cur, index) => {
				let add = '';
				if (typeof values[index] === 'function') {
					add = values[index](data);
				} else if (values[index]) {
					add = String(values[index]);
				}
				return `${acc}${cur}${add}`;
			}, '');
	}
	// 🎙️ Let's create two tagger
	const tagScooby = getTagger({ name: 'Scooby', age: 4 });
	const tagShelly = getTagger({ name: 'Shelly', age: 1 });

	// 🎙️ Now depending on how we tag the template, we basically get different
	// 🎙️ results.
	console.log(
		tagScooby`My dog ${data => data.name} is ${data =>
			data.age} year${data => (data.age > 1 ? 's' : '')} old. ${'neat'}.`
	);
	console.log(
		tagShelly`My dog ${data => data.name} is ${data =>
			data.age} year${data => (data.age > 1 ? 's' : '')} old.`
	);
})();

// 🎙️ And that's all there is to know about tagged literals.

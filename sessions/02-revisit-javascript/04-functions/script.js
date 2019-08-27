/* eslint-disable no-proto */
/* eslint-disable func-names */
/* eslint-disable strict */

'use strict';

// ✅ Function declaration.

// 🎙️ We define parse time functions or function declarations like this
// Defining a function
// Parsetime
function parsetimeFunction() {
	return 1;
}
parsetimeFunction();

// ✅ Function parameters.

// 🎙️ Like any langauge functions can have parameters
// 🎙️ Also with default value.
function sayMyName(firstName, lastName, middleName = '') {
	console.log(firstName, middleName);
}
sayMyName('Ross', 'Geller');
sayMyName('Chandler', 'Bing', 'Muriel');

// ✅ Named and anonymous function expressions.

// 🎙️ But we can assign a function to a variable
// 🎙️ Remember we talked about function expression
// 🎙️ Now function expressions create a function (expressions create a value)
// 🎙️ here the value is a function and we store the function in a variable.
// 🎙️ This is what we call, runtime function, because it is created during the runtime.
// 🎙️ We can name the function or we can keep it anonymous.
// Assigning a function to a variable
const runtimeFunction = function() {
	return 1;
};
console.log(runtimeFunction());

// ✅ Arrow function.

// 🎙️ ES6 gives us another way to create a runtime anonymous function
// 🎙️ Which has different scope than regular functions.
// 🎙️ We call them arrow functions (or fat arrow function, because of = >)
// Arrow Functions
// Always runtime and anonymous
// eslint-disable-next-line arrow-body-style
const coolFunc = () => {
	return 1;
};

// 🎙️ So basically we don't write `function`, we put arguments inside parens
// 🎙️ and we keep the function body inside `=> {}`.
// 🎙️ One thing is, if it just returns something directly
// 🎙️ Or if there's no separate statements or expressions or declarations
// 🎙️ in the body, then instead of `=> { return something }`
// 🎙️ We could very much do (and shoud do) `=> something`. It is just syntactical sugar.
const addUp = (a, b) => a + b;
const divide = (a, b) => a / b;
console.log(addUp(2, 3));
console.log(divide(10, 3));

// ✅ Constructor functions.

// 🎙️ In JavaScript constructor functions look no different than regular functions
// 🎙️ Conventionally they are PascalCased, ie, starts with a capital letter.
// 🎙️ We don't call a constructor function directly, rather we instantiate with `new` keyword.
// 🎙️ Programmatically we can prevent a constructor function being called directly.
// 🎙️ When we instantiate a constructor function, it creates an Object
// 🎙️ Inside the constructor function and inside all methods of the function prototype
// 🎙️ `this` refers to the object we have created (ie, the instance object)
function Name(name) {
	// Prevent direct calling of this function
	if (!(this instanceof Name)) {
		throw new TypeError('Name can only be instantiated');
	}

	// ✅ Scope of this.

	// 🎙️ Notice `this` is not the function itself, rather the Object
	// 🎙️ created when we call `new Name('...')`.
	this.name = name;
}

// ✅ Prototypal inheritance.

// 🎙️ Now let's talk about prototypal inheritance
// 🎙️ You see, everything in javascript is an object, including numbers, strings, functions
// 🎙️ And they have, what we call, prototype property.
// 🎙️ Now each prototype property does have it's own prototype property and we call this thing prototype chain.
Name.prototype = {
	getFirstName() {
		return this.name.split(' ')[0];
	},
	getLastName() {
		return this.name.split(' ')[1];
	},
};
const swas = new Name('Swashata Ghosh');
// 🎙️ To check if some object has a property as it's own
// 🎙️ We use hasOwnProperty
// 🎙️ hasOwnProperty is defined in Object.prototype
// 🎙️ We could call swas.hasOwnProperty directly, but for some safety
// 🎙️ We are calling the function from Object.prototype and giving `swas` as its scope
console.log(Object.prototype.hasOwnProperty.call(swas, 'name'));
console.log(Object.prototype.hasOwnProperty.call(swas, 'getFirstName'));
// 🎙️ Although getFirstName doesn't exist directly, it is still accessible through prototype chain
console.log('getFirstName' in swas);
// 🎙️ So when we try to access `swas.getFirstName`, JS Engine lookup is like this
// 🎙️ 1. Does swas has getFirstName in its own property? NO
// 🎙️ 2. Is swas[[Prototype]] [swas.__proto__] not null? YES
// 🎙️ 3. Does swas.__proto__ has getFirstName? YES
console.log(swas.getFirstName());
console.log(swas.getLastName());
// 🎙️ Otherwise it would just return undefined
// 🎙️ Let's see how JavaScript Engine looks up the property in the prototype chain.
// 🎙️ 1. Does swas has someundefinedProperty in its own property? NO
// 🎙️ 2. Is swas[[Prototype]] [swas.__proto__] not null? YES
// 🎙️ 3. Does swas.__proto__ has someundefinedProperty? NO
// 🎙️ 4. Is swas[[Prototype]][[Prototype]] not null? YES
// 🎙️ 5. Does swas.__proto__.__proto__ has someundefinedProperty? NO
// 🎙️ 6. Is swas[[Prototype]][[Prototype]][[Prototype]] no null? NO
console.log(swas.someundefinedProperty);
console.log(swas.__proto__.__proto__.__proto__);

// 🎙️ Let's see prototypal inheritance in action
// 🎙️ We create another constructor function Person
// 🎙️ Which inherits prototypes from Name
// 🎙️ Well because all people have name
// Prorotypal inheritence
function Person(name, age, gender) {
	if (!(this instanceof Person)) {
		throw new TypeError('Name can only be instantiated');
	}
	this.name = name;
	this.age = age;
	this.gender = gender;
}

// 🎙️ Here we use Object.assign to create a new object
// 🎙️ Which has all enumerable properties and methods of Name.prototype
// 🎙️ And some methods which are specific to Person.
// 🎙️ It doesn't matter how you merge Name.prototype to Person.prototype
// 🎙️ It's only important that you do.
Person.prototype = Object.assign({}, Name.prototype, {
	getAge() {
		return this.age;
	},
	getGender() {
		return this.gender;
	},
	sayHi() {
		return `Hi, I am ${this.getFirstName()}, a ${this.getAge()} old ${this.getGender()}`;
	},
});

const me = new Person('Swashata Ghosh', 28, 'male');
console.log(me.sayHi());
console.log(Object.getOwnPropertyDescriptor(me, 'name'));
console.log(Object.getOwnPropertyDescriptor(me, 'getAge'));

// 🎙️ But the above has one problem.
// 🎙️ JavaScript allows us to change prototype in runtime.
// 🎙️ Although it is not a good idea, but if we were to add another method
// 🎙️ To Name, it would not come to Person.
// 🎙️ This is because we have used Object.assign to create a new object

// Change prototype of Name in runtime
Name.prototype.yell = function() {
	return this.name.toUpperCase();
};
console.log(swas.yell());

try {
	console.log(me.yell());
} catch (e) {
	// It fails
	console.log(e);
}

// 🎙️ Now this can be avoided by assigning an object to Person's prototype
// 🎙️ Whose prototype is Name's prototype!!!!!!!
// 🎙️ If you are lost, think of it like
// 🎙️ Prototype of Person is an object, say personPrototype
// 🎙️ personPrototype's prototype is Name.prototype
// 🎙️ How do we do that?, Using Object.create()
// 🎙️ Object.create is used to create an empty object with the passed in
// 🎙️ object as that empty object's prototype.
// 🎙️ So this is exactly what we want.

// 🎙️ Let's create a rectangle constructor function
function Reactangle(height, width) {
	this.height = height;
	this.width = width;
}
// 🎙️ Let's create some prototype for Reactangle, an area method
Reactangle.prototype = {
	area() {
		return this.height * this.width;
	},
};

// 🎙️ Let's create a Square function which we intend to inherit from Reactangle
function Square(length) {
	this.height = length;
	this.width = length;
}
// 🎙️ So we use Object.create to assign an empty object as Square.prototype
// 🎙️ But this empty object has React.prototype as its prototype
// 🎙️ Through prototype chaining, Square instances has now all methods
// 🎙️ and properties of Reactangle.
Square.prototype = Object.create(Reactangle.prototype);
// Notice Square.prototype is still an empty object
console.log(Square.prototype);
// But the prototype of Square.prototype is Rectangle.prototype
console.log(Reactangle.prototype.isPrototypeOf(Square.prototype));

// 🎙️ We now add new methods to the prototype like
Square.prototype.diagonal = function() {
	return +(Math.sqrt(2) * this.width).toFixed(2);
};

const shape = new Square(10);
console.log(shape.__proto__);
console.log(shape.diagonal());
console.log(shape.__proto__.__proto__);
console.log(shape.area());

// 🎙️ For our purpose, if we try to add something to Reactangle Prototype
// 🎙️ Then Square should inherit it
Reactangle.prototype.perimeter = function() {
	return 2 * (this.height + this.width);
};

// 🎙️ So now our Square also has perimeter
console.log(shape.perimeter());

// 🎙️ That's how we do inheritance in JavaScript
// 🎙️ In small application it may be of not utmost importance
// 🎙️ But as your application grows, it can become a way to share logic
// 🎙️ Among your modules.

// 🎙️ Infact, ES6 has introduced `class` to JavaScript
// 🎙️ But it is syntactic sugar around JavaScript's own prototypal inheritance.

// 🎙️ There's also another way to inherit prototype
// 🎙️ Say we have a Staff in a company
function Staff() {}
Staff.prototype = {
	init(fName, lName) {
		this.fName = fName;
		this.lName = lName;
	},
	getName() {
		return `${this.fName} ${this.lName}`;
	},
	checkIn() {
		return 'checking in';
	},
};
// 🎙️ Now we also have manager, who are also staff
function Manager() {}
// 🎙️ Here's the interesting thing
// 🎙️ We instantiate a new Staff object
// 🎙️ And set it as the prototype of Manager.
// 🎙️ Since the Staff object instance has all the Staff prototype
// 🎙️ So Manager gets them in its prototype chain.
Manager.prototype = new Staff();

// 🎙️ Now only managers can update the project status
// 🎙️ Right?
Manager.prototype.updateProjectStatus = function() {
	return 'updating project status';
};

// 🎙️ Let's take them for a test drive
const mrMayur = new Manager();
mrMayur.init('Mayur', 'Keshwani');
console.log(mrMayur.getName());
console.log(mrMayur.checkIn());
console.log(mrMayur.updateProjectStatus());

// 🎙️ And we can have runtime prototype methods
Staff.prototype.checkOut = function() {
	return 'checking out';
};

console.log(mrMayur.checkOut());

// 🎙️ So why I showed you all the weird ways of inheritance
// 🎙️ in JavaScript?
//     👍 Those are current standards.
//         https://bit.ly/2AU6I42
//     👍 Those are easy to understand what's going on.
// 🎙️ So which one to use?
//     👍 Use classes when you need inheritance.
//     👍 If you must use functions use the one with Object.create.

// ✅ Scope of `this` for arrow functions.

// 🎙️ Now some final things about arrow function
// 🎙️ Remember I told you, in constructor functions `this` refers to the
// 🎙️ Object we have created?
// 🎙️ Arrow functions are made in a way, that
// 🎙️ 1. They can never be constructor functions (you can not instantiate an arrow function, try it)
// 🎙️ 2. They don't have `this`. `this` simply refers to the outer block.

function IAMGroot() {
	this.name = 'Groot';
	this.actor = 'Vin Diesel';
	// this works, since the function expression is bound to Object's
	// property or prototype, this refers to the object itself
	this.sayActor = function sayActor() {
		return this.actor;
	};

	// 🎙️ But this does not
	// 🎙️ Notice we have an utility function inside our function expression
	this.sayActorFirstName = function() {
		// 🎙️ This utility function's `this` depends on how we call it.
		const someUtil = function() {
			console.log(this);
			return this.actor.split(' ')[0];
		};
		// 🎙️ Since we are calling it directly
		// 🎙️ And this is not bound to anything
		// 🎙️ `this` would be undefined for the utility function.
		return someUtil();
	};

	// 🎙️ Now this approach with arrow function will work
	this.sayActorLastName = function() {
		// 🎙️ Notice we are using an arrow function expression here
		// 🎙️ As I've said before, it is not just another anonymous function expression
		// 🎙️ Arrow function doesn't have `this` and `this` refers to the outer block
		const someUtil = () => {
			// 🎙️ So `this` is the `this` of sayActorLastName
			// 🎙️ ie, The instance object we create.
			console.log(this);
			return this.actor.split(' ')[1];
		};
		return someUtil();
	};
}
const groot = new IAMGroot();
console.log(groot.sayActor());
try {
	console.log(groot.sayActorFirstName());
} catch (e) {
	console.log(e);
}
console.log(groot.sayActorLastName());

// ✅ When to use arrow function.

// 🎙️ So when to use arrow functions?
// 🎙️ In callbacks, when
// 🎙️     1. We don't need the use of `this` at all.
// 🎙️     2. We need to use `this` of exactly the outer scope.
// 🎙️ In class properties, when
// 🎙️     1. It is to be passed as callback to another function of another scope (more on it later).

// 🎙️ When not to use arrow functions?
// 🎙️ 1. When the function needs its own `this`.
// 🎙️ 2. When the function is to be bound against some object.
// 🎙️ 3. When we are expecting to call it with `.call` signature.

function sayName(salutation, lName) {
	return `${salutation} ${this.fName} ${lName}`;
}
try {
	console.log(sayName('Mr', 'Ghosh'));
} catch (e) {
	console.log(e);
}

// ✅ Changing `this` of functions.

// 🎙️ And how do we change the `this` of any function?
// 🎙️ Using `call` or `apply`.

// 🎙️ Let's create an object ourselves and forcibly use it as `this` of sayName
const mySelf = {
	fName: 'Swashata',
};
// 🎙️ .call takes variable arguments
console.log(sayName.call(mySelf, 'Mr.', 'Ghosh'));
// 🎙️ .apply takes two arguments
console.log(sayName.apply(mySelf, ['Mr.', 'Ghosh']));

// 🎙️ There's another way, to forcibly bind a function
// 🎙️ Function.prototype.bind creates another function which is always bound
// 🎙️ to the passed in parameter.
const boundedSayName = sayName.bind(mySelf);
console.log(boundedSayName('Mr', 'Ghosh'));
// 🎙️ It doesn't matter how the bounded function is called
// 🎙️ We "try" to trick boundedSayName to think an empty object is its `this`
// 🎙️ But that won't work!
console.log(boundedSayName.call({}, 'Mr', 'Ghosh'));

// ✅ Rest parameters.

// 🎙️ Rest is a special syntax applied to arguments
// 🎙️ when defining (declaring or writing function expression)
// 🎙️ To store a variable number of arguments
function restSomeStuff(...stuff) {
	return stuff;
}
console.log(restSomeStuff(1, 2, 3, '4'));

// ✅ Spread parameters.

// 🎙️ Spread is a special syntax applied to arguments
// 🎙️ When calling a function (function statement)
// 🎙️ To convert arrays or array like objects (iterables)
// 🎙️ into separate function arguments.
function spreadSomeStuff(a, b, c, ...rest) {
	console.log(a);
	console.log(b);
	console.log(c);
	console.log(rest);
}
const forSpread = ['2', '4', true, 'function does not care', 'or does it??'];
spreadSomeStuff(...forSpread);
// 🎙️ The above is equivalent of calling the function like
spreadSomeStuff('2', '4', true, 'function does not care', 'or does it?');

// ✅ High order functions.

// 🎙️ It is basically a function, that
// 🎙️ 1. May take a function as input.
// 🎙️ 2. Always returns a function with some modified functionality.

// 🎙️ Example: Create a utility function
function greaterThan(num) {
	return function(val) {
		return val > num;
	};
	// 🎙️ We can and probably should use arrow function instead
	// 🎙️ Much more precise, but I don't want to burn your head right away
	// 🎙️ I am planning to burn it like 1 week later.
	// return val => val > num;
}

const greaterThan10 = greaterThan(10);
console.log(greaterThan10(20));
console.log(greaterThan10(9));

// 🎙️ Example: Modify functionality
function noisy(fn) {
	return function(...args) {
		console.log(`Called with ${JSON.stringify(args)}`);
		const val = fn(...args);
		console.log(`Returning value ${JSON.stringify(val)}`);
		return val;
	};
}
const noisyMin = noisy(Math.min);
console.log(noisyMin(1, 3, -1));

// ✅ Compose functions.

// We have set of users
const users = [
	{ name: 'Jeff', age: 14 },
	{ name: 'Jack', age: 19 },
	{ name: 'Milady', age: 22 },
];

// 🎙️ We have an utility function to get an array of user names
function getUserName(u) {
	return u.map(user => user.name);
}

// 🎙️ We have an utility function to get users whose age is greater than 18
function getUserWhoseAgeIsGreaterThan18(u) {
	return u.filter(user => user.age > 18);
}

// 🎙️ Another utility to compose multiple functions
const compose = (...functions) => args =>
	functions.reduceRight((arg, fn) => fn(arg), args);

// Create a compose function based on two utilities
const getUserNameWhoseAgeIsGreaterThan18 = compose(
	getUserName,
	getUserWhoseAgeIsGreaterThan18
);
console.log(getUserNameWhoseAgeIsGreaterThan18(users));

// 🎙️ And we are hopefully done with functions

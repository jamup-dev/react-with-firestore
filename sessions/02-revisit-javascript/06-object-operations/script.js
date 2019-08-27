/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/* eslint-disable strict */

'use strict';

// 🎙️ We have our sample data
const user = {
	fName: 'Reta',
	lName: 'Swaniawski',
	email: 'Reta67@hotmail.com',
	username: 'Reta89',
	joined: '2018-08-09T11:55:20.512Z',
	address: {
		streetAddress: '03273 Swaniawski Ramp',
		city: 'Flaviefort',
		state: 'Oregon',
		country: 'Paraguay',
		zip: '24626',
	},
};

// ✅ Shallow copy with `Object.assign`, ES spread operator.

// 🎙️ We have seen before objects are stored in variable as references
// 🎙️ So we can not simply copy them by reassigning to another variable.

// 🎙️ To copy an object we have several methods.
// 🎙️ The one we are interested in is the shallow copy
// 🎙️ Where only the top level properties of the object
// 🎙️ are copied to a new object.
// 🎙️ If the value of a property is another object
// 🎙️ Then the new shallow copied object gets its reference
// 🎙️ This concept is called shallow copy
// 🎙️ And in most of the cases this is what we would need.

// 🎙️ We can shallow copy using Object.assign
(function() {
	const userCopied = Object.assign({}, user);
	// 🎙️ copied and original do not have the same reference
	console.log(user === userCopied);
	// 🎙️ Let's change a primitive value
	userCopied.lName = 'Clark';
	console.log(user.lName, userCopied.lName);
	// 🎙️ But if we were to change a property which is an object
	// 🎙️ Like user.address or userCopied.address
	// 🎙️ Both being reference to the same object
	// 🎙️ It would change for both user and userCopied
	userCopied.address.city = 'London';
	console.log(userCopied.address.city, user.address.city);

	// 🎙️ If we need to change a property which is an object
	// 🎙️ We create another shallow copy of the property

	// 🎙️ This time let's see how we can do the same using ES spread operator
	userCopied.address = { ...user.address };

	// 🎙️ We can also pass-in multiple spread of object
	// 🎙️ And the result would be same as Object.assign
	userCopied.address = {
		...user.address,
		city: 'Ahmedabad',
		...{
			country: 'India',
			zip: '380059',
		},
	};
	console.log(userCopied.address);

	// 🎙️ So we have spread an object,
	// 🎙️ set a property directly
	// 🎙️ Then spread another object using the spread operator

	// 🎙️ One thing to know is, if we have same property across multiple
	// 🎙️ spreads, then the one that comes last, overrides the others
	const newObj = {
		...{
			name: 'Swashata',
		},
		name: 'Scooby',
		...{
			name: 'Shelly',
		},
	};
	console.log(newObj.name);
})();

// ✅ Object destructure.

// 🎙️ With ES6 we have a tool to get a property out of
// 🎙️ an object and store in a variable.

(function() {
	// 🎙️ Say we want to get fName and lName out of user
	const { fName, lName } = user;
	console.log(fName, lName);
	// 🎙️ So within the destructure statement
	// 🎙️ The name of the variable should be same as the property key
	// 🎙️ If we want to change the variable name, we can do so like
	const { fName: firstName, lName: lastName } = user;
	console.log(firstName, lastName);

	// 🎙️ We can provide some default value if the property isn't
	// 🎙️ present in the object
	const { fName: first = '', mName: middle = 'C', lName: last } = user;
	console.log(first, middle, last);

	// 🎙️ We also destructure deeply nested objects
	// 🎙️ For example if we want to get just the country
	const {
		address: { country = 'India' },
	} = user;
	console.log(country);
	// 🎙️ Note that the above destructure doesn't create a variable
	// 🎙️ named `address`. Only the terminal properties of the
	// 🎙️ destructure statement get created

	// 🎙️ And finally we can always mix them together
	const {
		email = '',
		username,
		address: { state, streetAddress = '' },
	} = user;
	console.log(email, username, state, streetAddress);
})();

// ✅ with ES rest.

// 🎙️ With ES6 rest operator, we can get rest of properties
// 🎙️ in a single variable through destructuring.
(function() {
	// 🎙️ We want to explicityly get fName, lName
	// 🎙️ and would like to store the rest of the
	// 🎙️ properties in `info`.
	const { fName, lName, ...info } = user;
	console.log(fName, lName);
	console.log(info);
	// 🎙️ So here info holds all properties not explicitly
	// 🎙️ destructured

	// 🎙️ It works for deeply nested destructuring too
	const {
		address: { country, ...addr },
	} = user;
	console.log(country);
	console.log(addr);
})();

// ✅ `const` and object mutation.

// 🎙️ We know we can not reassign a variable declared with `const`
// 🎙️ But if the variable is an object, then there's no stopping
// 🎙️ from changing the properties of the object
(() => {
	const myObj = {};
	// 🎙️ We can not reassign to the myObj variable
	// 🎙️ But we are free to change the current object properties
	myObj.fName = 'Swashata';
	myObj.lName = 'Ghosh';
	myObj.email = 's@swas.io';
	console.log(myObj);
})();

// ✅ Shorthand object property and methods.

// 🎙️ We have seen literal object notation is the best way
// 🎙️ to create an object in its entirety.

// 🎙️ ES6 has given us more shortcuts to create an object literal
(function() {
	const name = 'Swashata Ghosh';
	const email = 's@swas.io';
	// 🎙️ Given the known variables name and email
	// 🎙️ We can create an object like this
	const me = {
		// 🎙️ Instead of
		// name: name,
		name,
		email,
	};

	// 🎙️ If the property is a function, we can define it like
	const meV2 = {
		name,
		email,
		// 🎙️ Instead of
		// sayName: function() {},
		// 🎙️ We can
		sayName() {
			console.log(this.name);
		},
	};
	meV2.sayName();

	// 🎙️ Lastly if the property name is a variable
	// 🎙️ ie, the property name is something stored in variable
	// 🎙️ Then instead of something like
	const propName = 'age';
	const meV3 = {};
	meV3[propName] = 28;

	// 🎙️ We can do it during declaration
	const meV4 = {
		[propName]: 28,
	};
	console.log(meV4);

	// 🎙️ We've seen this before with Symbols
})();

// ✅ Scope of `this` in object methods.

// 🎙️ We have briefly seen the usage of `this` in an object method
// 🎙️ not created with constructor function
// 🎙️ Let's talk about it in details
(function() {
	// 🎙️ Let's create an object literal
	const profile = {
		fName: 'Reta',
		lName: 'Swaniawski',
		email: 'Reta67@hotmail.com',
		username: 'Reta89',
		// 🎙️ And add some methods
		sayName() {
			// 🎙️ Here `this` refers to the object itself
			// 🎙️ And this scope only works with direct object methods
			return [this.fName, this.lName].join(' ');
		},
		// 🎙️ If we have some nested object
		address: {
			streetAddress: '03273 Swaniawski Ramp',
			city: 'Flaviefort',
			state: 'Oregon',
			country: 'Paraguay',
			zip: '24626',
			// 🎙️ And a method in the nested object
			sayCountry() {
				// 🎙️ Here `this` refers to the `profile.address` object
				// 🎙️ not the `profile` object directly
				return this.country;
			},
		},
	};

	// 🎙️ To make sure the methods get proper scope
	// 🎙️ We have to call them out on the objects directly
	console.log(profile.sayName());
	console.log(profile.address.sayCountry());
})();

// ✅ Looping with `Object.keys`.

// 🎙️ The best method to loop an object today is to get it's own properties
// 🎙️ And loop the keys

// 🎙️ Enumerable properties are usually those created via simple assignment
// 🎙️ or with Object.defineProperty and setting the enumerable flag to true
// 🎙️ or something similar in the prototype chain.

// 🎙️ In most of the cases we simply want to loop over object's own properties
// 🎙️ and not all the enumerable ones.

// 🎙️ Read this for more information
// 🎙️ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties

(function() {
	// 🎙️ Let's create an object with some useful methods
	const userMethods = {
		sayName() {
			return [this.fName, this.lName].join(' ');
		},
		sayAddress() {
			const { streetAddress, city, state, country } = this.address;
			return [streetAddress, city, state, country].join(', ');
		},
	};

	// 🎙️ Now if we can assign the object above in the prototype chain
	// 🎙️ of `user` object, then we can use them directly.
	// 🎙️ So let's do that

	// 🎙️ Create a shallow copy of the user, coz we don't want to mess with
	// 🎙️ original data

	// 🎙️ So first we create an object with userMethods in its prototype
	const userV2 = Object.create(userMethods);
	// 🎙️ Then we assign all properties of user to userV2
	Object.assign(userV2, user);
	// 🎙️ So we have created a V2.0 of user
	// 🎙️ Which has all the properties of user
	// 🎙️ And also userMethods in its prototype
	// 🎙️ So we can
	console.log(userV2.sayName());
	console.log(userV2.sayAddress());

	// 🎙️ If we were to loop with for..in
	// eslint-disable-next-line guard-for-in
	for (const i in userV2) {
		// 🎙️ Here we get all the prototype properties too
		console.log(i);
		// 🎙️ which we don't really need.
		// 🎙️ So we can type guard it with
		if (Object.hasOwnProperty.call(userV2, i)) {
			console.log(i);
		}
	}

	// 🎙️ Or we can use Object.keys instead
	console.log(Object.keys(userV2));
	Object.keys(userV2).forEach(key => {
		console.log(userV2[key]);
	});

	// 🎙️ Or we can use Object.entries
	// 🎙️ which gives us an iterator
	const entries = Object.entries(userV2);
	for (const item of entries) {
		console.log(item);
	}
	// 🎙️ So item is an array where the first element is the key of the object
	// 🎙️ and the second is the value
	// 🎙️ In array destructuring, we will see how we can destructure item
	// 🎙️ directly for better access.
})();

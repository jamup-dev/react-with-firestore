/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/* eslint-disable strict */

'use strict';

// 🎙️ Let's see some old and some new useful array methods.

// 🎙️ But first let's import some data
const data = [
	{
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
	},
	{
		fName: 'Aileen',
		lName: 'Jakubowski',
		email: 'Aileen.Jakubowski72@gmail.com',
		username: 'Aileen_Jakubowski',
		joined: '2018-10-10T08:05:42.137Z',
		address: {
			streetAddress: '584 Anderson Manors',
			city: 'New Clotilde',
			state: 'Massachusetts',
			country: 'Samoa',
			zip: '94311',
		},
	},
	{
		fName: 'Marianna',
		lName: 'Nader',
		email: 'Marianna_Nader65@gmail.com',
		username: 'Marianna_Nader',
		joined: '2018-05-21T14:41:46.229Z',
		address: {
			streetAddress: '502 Ankunding Ville',
			city: 'North Tanya',
			state: 'New Jersey',
			country: 'Liechtenstein',
			zip: '93819-7250',
		},
	},
	{
		fName: 'Cody',
		lName: 'Raynor',
		email: 'Cody_Raynor46@yahoo.com',
		username: 'Cody77',
		joined: '2018-10-30T15:09:41.741Z',
		address: {
			streetAddress: '243 Beier Port',
			city: 'Stehrberg',
			state: 'Alabama',
			country: 'Uruguay',
			zip: '32853-0737',
		},
	},
	{
		fName: 'Kelli',
		lName: 'Beatty',
		email: 'Kelli.Beatty54@gmail.com',
		username: 'Kelli_Beatty',
		joined: '2018-08-10T07:28:00.044Z',
		address: {
			streetAddress: '934 Celine Creek',
			city: 'Windlerchester',
			state: 'Massachusetts',
			country: 'Cayman Islands',
			zip: '25990-6987',
		},
	},
	{
		fName: 'Micah',
		lName: 'Mante',
		email: 'Micah_Mante@hotmail.com',
		username: 'Micah_Mante52',
		joined: '2018-03-23T17:34:15.098Z',
		address: {
			streetAddress: '27018 Eliseo Row',
			city: 'South Caden',
			state: 'New Mexico',
			country: 'Australia',
			zip: '54631',
		},
	},
	{
		fName: 'Price',
		lName: 'Kutch',
		email: 'Price.Kutch@yahoo.com',
		username: 'Price_Kutch',
		joined: '2018-12-14T20:44:56.607Z',
		address: {
			streetAddress: '60261 Nya Fork',
			city: 'Keiratown',
			state: 'Mississippi',
			country: 'Greece',
			zip: '77884-2567',
		},
	},
	{
		fName: 'Clyde',
		lName: 'Friesen',
		email: 'Clyde.Friesen@gmail.com',
		username: 'Clyde46',
		joined: '2018-11-17T07:42:49.990Z',
		address: {
			streetAddress: "308 O'Reilly Springs",
			city: 'Annamaehaven',
			state: 'Maryland',
			country: 'Latvia',
			zip: '72534',
		},
	},
	{
		fName: 'Geoffrey',
		lName: 'Reinger',
		email: 'Geoffrey.Reinger@gmail.com',
		username: 'Geoffrey26',
		joined: '2018-05-23T00:38:18.678Z',
		address: {
			streetAddress: '856 Laverna Junctions',
			city: 'New Vincehaven',
			state: 'Rhode Island',
			country: 'Turks and Caicos Islands',
			zip: '49469-0401',
		},
	},
	{
		fName: 'Julien',
		lName: 'Luettgen',
		email: 'Julien.Luettgen@hotmail.com',
		username: 'Julien_Luettgen36',
		joined: '2018-07-31T12:43:39.847Z',
		address: {
			streetAddress: '71385 Runolfsdottir Falls',
			city: 'Jasonview',
			state: 'Kansas',
			country: 'Luxembourg',
			zip: '47527',
		},
	},
	{
		fName: 'Jordan',
		lName: 'Fisher',
		email: 'Jordan45@gmail.com',
		username: 'Jordan_Fisher',
		joined: '2018-08-15T00:48:44.792Z',
		address: {
			streetAddress: '81153 Tillman Keys',
			city: 'Lake Lethaburgh',
			state: 'Oregon',
			country: 'Solomon Islands',
			zip: '04623',
		},
	},
];

// ✅ Shallow copy with ES spread operator and `array.prototype.slice`
// 🎙️ As we've seen before, when assign a variable to an array
// 🎙️ it gets the reference, not a copy. To create a copy, we can use
// 🎙️ Array.prototype.slice
const arrOrig = [1, 2, 3];
let arrDup = arrOrig.slice();
console.log(arrDup);
arrDup = arrDup.concat([4, 5]);
console.log(arrDup);
console.log(arrOrig);

// 🎙️ Or we can use ES spread operator
const arrDupSpread = [...arrOrig];
console.log(arrDupSpread);
arrDupSpread.push(4, 5);
console.log(arrDupSpread);
console.log(arrOrig);

// 🎙️ Note that spread and slice, both create a shallow copy
// 🎙️ So if the values are primitives then it is fine
// 🎙️ If they are object, then the new array index also
// 🎙️ gets a reference of the object.
const arrWithObj = [
	{
		name: 'Scooby',
		age: 4,
	},
	{
		name: 'Shelly',
		age: 1,
	},
];
const dupArrWithObj = [...arrWithObj];
dupArrWithObj[0].name = 'Scooby Doo';
console.log(dupArrWithObj[0]);
console.log(arrWithObj[0]);
console.log(dupArrWithObj[0] === arrWithObj[0]);

// 🎙️ This is known as shallow copy
// 🎙️ In most of the cases, this is fine though
// 🎙️ because in practical usage, we often completely
// 🎙️ replace something at an array index, without touching
// 🎙️ the original array.
// 🎙️ Let's consider this function
function changeNameAtIndex(arr, index, newName) {
	// 🎙️ First we create a shallow copy of the array
	const newArr = [...arr];
	// 🎙️ Now we create another copy of the item at mentioned index
	newArr[index] = Object.assign({}, arr[index]);
	// 🎙️ And finally we change the name
	newArr[index].name = newName;
	// 🎙️ Now we return the newly created array
	return newArr;
}

// 🎙️ The above function is pure
// 🎙️ It doesn't alter any of the parameters passed
// 🎙️ And only discards the reference at the given index
// 🎙️ not unnecessarily creating a deep copy
const changedArrWithObj = changeNameAtIndex(arrWithObj, 0, 'Scooby Doo');
console.log(changedArrWithObj);
// 🎙️ The input and output are not the same reference
console.log(changedArrWithObj === arrWithObj);
// 🎙️ But their reference to the object still remain the same
// 🎙️ where it hasn't been changed
console.log(changedArrWithObj[1] === arrWithObj[1]);
console.log(changedArrWithObj[0] === arrWithObj[0]);

// 🎙️ Let's see an example
// 🎙️ The following function will reorder an array
// 🎙️ by pushing the existing item at the new index
// 🎙️ And shifting everything else
// 🎙️ Put simply we move an item to a new index.

/**
 * Reorder an array by taking an existing item at an index
 * and put it at a new index, shifting the rest of the items.
 *
 * @param {Array} arr Input array.
 * @param {number} from Index of the item to reorder.
 * @param {number} to The new position where to insert it.
 */
function reOrderArray(arr, from, to) {
	// If from and to are just the same, then just
	// return a copy of the array
	if (from === to) {
		return [...arr];
	}
	// If from or to are out of bound, then throw an error
	if (from >= arr.length || from < 0) {
		throw new Error('from has to be within array length');
	}
	if (to >= arr.length || to < 0) {
		throw new Error('to has to be within array length');
	}
	// Let's take the item to move
	const itemToMove = arr[from];
	// Now the parts of the array to move
	// differs based on whether from is greater than to or not
	if (from > to) {
		// The first part is 0 -> to - 1
		// Second part is the item to move
		// Third part is to -> from - 1
		// Last is from -> end
		return [
			...arr.slice(0, to),
			itemToMove,
			...arr.slice(to, from),
			...arr.slice(from + 1),
		];
	}

	// Since from < to
	// First part is 0 -> from -1
	// Second part is from + 1 -> to
	// Third part is item to move
	// Last is to +1 -> end
	return [
		...arr.slice(0, from),
		...arr.slice(from + 1, to + 1),
		itemToMove,
		...arr.slice(to + 1),
	];
}
console.log(reOrderArray([0, 1, 2, 3, 4], 1, 3));
console.log(reOrderArray([0, 1, 2, 3, 4], 3, 0));

// 🎙️ You know the above can be written using just array.prototype.splice
// 🎙️ That's left as an exercise.

// ✅ Destructure arrays, with rest.

// 🎙️ With ES6 we have a new tool to get an item out of an array.
// 🎙️ The syntax is called destructure
const myName = ['Swashata', 'Ghosh'];
// 🎙️ So in the above array we have first name and last name
// 🎙️ We know the 0th index is fName and 1st index is lName
// 🎙️ So if we wanted to extract them and store in variable
// 🎙️ We would usually do something like
// const fName = myName[0];
// const lName = myName[1];
// 🎙️ But we destructuring we can simply do
const [fName, lName] = myName;
console.log(fName, lName);

// 🎙️ PS: I have wrapped the following into iffe
// 🎙️ so that we don't run into variable name conflict.

// 🎙️ We can also skip some part of the array
// 🎙️ Say we just want the last name
(function() {
	const [, lastName] = myName;
	console.log(`Hello Mr. ${lastName}`);
})();

// 🎙️ We can destructure deep nested arrays too
(function() {
	const aboutMe = [
		['Swashata', 'Ghosh'],
		[['Developer', ['WPQuark']], ['Trainer', ['Multidots']]],
	];
	const [[firstName, lastName], [, [profile, companies]]] = aboutMe;
	console.log(firstName, lastName, profile, companies);
	console.log(`Mr. ${lastName} is a ${profile} at ${companies.join(', ')}.`);
})();

// 🎙️ Here's a cool trick to swap two variables
(function() {
	let min = 10;
	let max = 2;
	if (min > max) {
		[min, max] = [max, min];
	}
	console.log(min, max);
})();

// ✅ With rest.

// 🎙️ One last thing is the rest operator
// 🎙️ We have seen with spread, we can spread an array into a new array
// 🎙️ And we destructuring we can select some particular items of an array

// 🎙️ Just like we've seen on function, rest operator works on destructuring too
// 🎙️ to get the rest of the array items in a variable

const fruits = ['Apple', 'Banana', 'Strawberry', 'Guava', 'Pineapple'];
// 🎙️ So if the first fruit is my favorite and rest are just okay
// 🎙️ Then I can destructure them like
const [favoriteFruit, ...fruitsIEat] = fruits;
console.log(favoriteFruit, fruitsIEat);

// ✅ Looping with `forEach` and `for..of`.

// 🎙️ We have our conventional for loop
for (let i = 0; i < data.length; i++) {
	// 🎙️ But to access the array item, not just the index
	// 🎙️ We have to work a little
	const item = data[i];
	console.log(item);
}

// 🎙️ But now we also have an Array.prototype method
// 🎙️ Which gives us the item and the index to work with
data.forEach((item, index) => {
	console.log(item.fName, index);
});

// 🎙️ Since arrays are iterable
// 🎙️ As in it implements @@iterator method
console.log(Array.prototype[Symbol.iterator]);

// 🎙️ We can use for..of loop
for (const item of data) {
	console.log(item.lName);
}

// ✅ Iterate with array.entries.

// 🎙️ While we are still on the topic of looping
// 🎙️ Let's see one of the new iterator methods
// 🎙️ array.entries gives an iterator object
// 🎙️ which yields an array having the index and the element
// 🎙️ More about iterators and generators here
// 🎙️ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables
(function() {
	const dataEntries = data.entries();
	// 🎙️ So an item of the dataEntries looks like this
	// 🎙️ [index, element]
	// 🎙️ In the for..of loop, we have destructured the item array
	// 🎙️ into index and person.
	for (const [index, person] of dataEntries) {
		console.log(index, person.fName);
	}
})();

// ✅ array.map, array.reduce, array.filter

// 🎙️ These are some of the pure functions to manipulate an array without actually
// 🎙️ modifying the original array.

// ✅ array.map
// 🎙️ We can create a new array from an existing array
// 🎙️ by passing all the array items through a callback function
// 🎙️ with array.map

// 🎙️ Say we want to create an array with just the name from the data
const names = data.map(item => {
	const name = `${item.fName} ${item.lName}`;
	return name;
});
console.log(names);

// ✅ array.reduce
// 🎙️ We can reduce an array to almost anything using array.reduce
// 🎙️ This is useful for string concatenation or number operations etc.
(function() {
	const items = [1, 2, 3, 4];
	const sum = items.reduce((acc, item) => {
		const newSum = acc + (Number.isNaN(Number(item)) ? 0 : Number(item));
		return newSum;
	}, 0);
	console.log(sum);

	// 🎙️ So reduce takes two parameters
	// 🎙️ First one is a callback function of the signature
	// 🎙️ (accumulator, currentItem, index) => any;
	// 🎙️ The second one is the initial value of the accumulator of the callback function

	// 🎙️ If we don't pass the second parameter
	// 🎙️ Then the initial value of accumulator is the first item of the
	// 🎙️ array. currentItem starts with the second item of the array
	// 🎙️ and index always points to the index of currentItem
	items.reduce(function(accumulator, currentItem, index) {
		console.log(accumulator, currentItem, index);
		return 'hello';
	});

	// 🎙️ But if we do pass the second parameter (ie, not undefined)
	// 🎙️ Then it becomes the initial value of the accumulator
	// 🎙️ currentItem starts with the first item of the array
	// 🎙️ and as usual index points to the index of the currentItem
	items.reduce((accumulator, currentItem, index) => {
		console.log(accumulator, currentItem, index);
		return `${accumulator}${currentItem}`;
	}, '');
})();

// ✅ array.filter
// 🎙️ We can get some items of an array with array.filter
// 🎙️ This is a pure function and takes a callback
// 🎙️ The callback is fired against all the items of the array
// 🎙️ And if it returns true then the resulting filtered array
// 🎙️ contains that item.

// 🎙️ So let's filter all the people who has joined at-least before 3 months from now
(function() {
	const maxJoinDate = new Date();
	maxJoinDate.setMonth(maxJoinDate.getMonth() - 3);
	const oldUsers = data.filter((person, index) => {
		const joinDate = new Date(person.joined);
		console.log(index);
		if (joinDate <= maxJoinDate) {
			return true;
		}
		return false;
	});
	console.log(oldUsers.length);
	console.log(oldUsers);
})();

// ✅ array.sort

// 🎙️ This sorts an array in place
// 🎙️ So the original array is sorted and no copy is created unlike previous
// 🎙️ set of functions.

// 🎙️ If no callback function is passed, then array is sorted based on
// 🎙️ each character's unicode code point value, according to string conversion
// 🎙️ of each item of the array.
(function() {
	const arr = [1, 2, 30, 41, 9, 3];
	arr.sort();
	console.log(arr);
})();

// 🎙️ If we pass in a callback function then the sorting happens
// 🎙️ based on what we return through the callback function.
// 🎙️ The callback function gets two parameters a and b
// 🎙️ where a is the first item in comparison and b is the second item
// 🎙️ If the return value is less than 0, then a has a lower index than b (a comes first)
// 🎙️ If the return value is 0, then a and b are equal so order is not changed
// 🎙️ If the return value is greater than 0, then a has higher index than b (b comes first)

// 🎙️ Lets sort the same array based on ascending order of numbers
(function() {
	const arr = [1, 2, 30, 41, 9, 3];
	arr.sort((a, b) => {
		if (a > b) {
			// b should come first
			return 1;
		}
		if (a < b) {
			// a should come first
			return -1;
		}
		// a and b are equal
		return 0;
	});
	console.log(arr);
	// 🎙️ We could've been a little clever and written the same with
	const anotherArr = [1, 2, 30, 41, 9, 3];
	anotherArr.sort((a, b) => a - b);
	console.log(anotherArr);

	// 🎙️ Now for some practical example, let's sort the data
	// 🎙️ array based on their join date

	// 🎙️ Since sort is mutating, let's create a copy first
	const people = [...data];
	console.log(people);
	people.sort((a, b) => {
		const aJoinDate = new Date(a.joined);
		const bJoinDate = new Date(b.joined);
		if (aJoinDate > bJoinDate) {
			return 1;
		}
		if (bJoinDate > aJoinDate) {
			return -1;
		}
		return 0;
	});
	console.log(people);
})();

// ✅ array.find, array.findIndex
// 🎙️ We can use these set of array methods to find something in an array

// ✅ array.find
// 🎙️ If we want to find a particular item in an array
// 🎙️ Then we use array.find
// 🎙️ It takes the callback and returns the **FIRST** item where
// 🎙️ The callback returns true
// 🎙️ The callback itself takes the currentItem and index as parameters
// 🎙️ And it should return boolean (ie, either true or false).
const findByEmail = 'Micah_Mante@hotmail.com';
const micah = data.find(person => person.email === findByEmail);
console.log(micah);

// ✅ array.findIndex
// 🎙️ Similarly if we want to find the index, rather than the item itself
// 🎙️ We use findIndex
// 🎙️ It also takes the same callback, but instead of returning the first item
// 🎙️ it returns the first index
const micahIndex = data.findIndex(person => person.email === findByEmail);
console.log(micahIndex);
console.log(data[micahIndex] === micah);

// ✅ array.includes, array.some and array.every.

// 🎙️ With these functions we can verify whether all, some or one item
// 🎙️ of an array verifies a condition or equals to something.

// ✅ array.includes
// 🎙️ If we want to find whether an array includes an item among its entries
// 🎙️ we use array.includes.
// 🎙️ It returns true or false based on whether the array includes
// 🎙️ the value or not.

// 🎙️ unlike map, reduce, filter it doesn't take a callback function
// 🎙️ it takes the value itself
// 🎙️ We can pass a second parameter fromIndex to find from the specified
// 🎙️ index instead of the beginning of the array.

// 🎙️ So let's see if the array data includes the user micah
console.log(data.includes(micah));

// 🎙️ We want to find if micah is available from index 6
console.log(data.includes(micah, 6));
// 🎙️ that's because micah is at index 5

// ✅ array.some
// 🎙️ This method tests whether at lease one item in the array passes the test
// 🎙️ implemented by the callback function

// 🎙️ The callback function gets the item as parameter
// 🎙️ The condition passes is the function returns truthy

// 🎙️ Let's see if at-least some user has joined in past six months
(function() {
	const maxJoinDate = new Date();
	maxJoinDate.setMonth(maxJoinDate.getMonth() - 6);
	const usersAreAtleast6MonthOld = data.some(person => {
		const joinDate = new Date(person.joined);
		return joinDate <= maxJoinDate;
	});
	console.log(usersAreAtleast6MonthOld);

	// 🎙️ Also let's see if at-least one of them lives in India
	console.log(data.some(person => person.address.country === 'India'));
})();

// ✅ array.every
// 🎙️ array.some checks if at-least one item matches a condition
// 🎙️ array.every checks if all items match the condition
// 🎙️ The callback signature is the same

// 🎙️ Let's see if all the users have joined in past six months
(function() {
	const maxJoinDate = new Date();
	maxJoinDate.setMonth(maxJoinDate.getMonth() - 6);
	const usersAreAtleast6MonthOld = data.every(person => {
		const joinDate = new Date(person.joined);
		return joinDate <= maxJoinDate;
	});
	console.log(usersAreAtleast6MonthOld);

	// 🎙️ Also let's see if all of them don't live in India
	console.log(data.every(person => person.address.country !== 'India'));
})();

// ✅ Array.from and Array.of.

// 🎙️ Both these methods give us new ways to create arrays.
// 🎙️ These are not prototype methods, rather static method
// 🎙️ on Array.

// ✅ Array.from
// 🎙️ Array from takes in an iterable object
// 🎙️ and creates an array out of it.

// 🎙️ So we can create an array from a string
console.log(Array.from('hello world'));

// 🎙️ We can also pass in a mapping function as second parameter
(function() {
	const numbers = [1, 2, 3, 4];
	const doubles = Array.from(numbers, num => num * 2);
	console.log(doubles);
})();

// 🎙️ Here's a cool technique to create an empty array of specified length
// 🎙️ and then fill it up with same values
(function() {
	const numberOfTimesLoggedIn = Array.from({ length: data.length });
	numberOfTimesLoggedIn.fill(0);
	console.log(numberOfTimesLoggedIn);
	// 🎙️ Now we have cross referencing arrays with same keys
	// 🎙️ Perhaps person 2 has logged in
	numberOfTimesLoggedIn[1] += 1;
	console.log(numberOfTimesLoggedIn);
})();

// 🎙️ If you are working with DOM
// 🎙️ then here's what you can use to convert classList into arrays
try {
	(function() {
		if (window !== undefined) {
			const elm = document.querySelector('#my-elem');
			const elmClasses = Array.from(elm.classList);
			console.log(elmClasses);
		}
	})();
} catch (e) {
	console.log(e);
}

// ✅ Array.of
// 🎙️ Creates new array instance with a variable number of arguments
// 🎙️ regardless of number or type of the arguments.

// 🎙️ Think of it as super charged (new Array()) where you can pass in the
// 🎙️ elements as function arguments
console.log(Array.of('Hello', 'World', 'Bye'));
console.log(Array.of(10));

// 🎙️ The reason why we should use Array.of instead of new Array
// 🎙️ is because how a single integer argument is handled
// 🎙️ The following will create an empty array of length 5
console.log(new Array(5));
new Array(5).forEach(item => {
	// 🎙️ This is never reached because the array is empty
	// 🎙️ Not array with undefined values
	console.log(typeof item);
});

// 🎙️ However with Array.of(5) it will create an array with
// 🎙️ single item 5
console.log(Array.of(5));
Array.of(5).forEach(item => {
	console.log(item);
});

// 🎙️ And that's all about arrays

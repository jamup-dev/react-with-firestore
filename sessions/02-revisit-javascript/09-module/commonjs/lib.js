// 🎙️ In commonJS module system
// 🎙️ We are given an `exports` object where we change the properties
// 🎙️ Of the object to expose our library code to the outer world.

// 🎙️ Let's define a function.
function helloWorld(str) {
	console.log(str);
}

// 🎙️ The above function is valid only in this file
// 🎙️ Even if we require it, it is not really global, so others can not
// 🎙️ access it.

// 🎙️ Unless we export it somehow.
exports.helloWorld = helloWorld;
// 🎙️ Now files requiring this library have access to helloWorld

// 🎙️ Let's declare something which are not exporting
function changeToUpper(str) {
	if (typeof str === 'string') {
		return str.toUpperCase();
	}
	return 'Are you mad?'.toUpperCase();
}

// 🎙️ We can also add multiple properties to exports
function yellAtWorld(str) {
	// 🎙️ And remember all the functions and scopes are valid
	// 🎙️ So no matter if you have exported something
	// 🎙️ If it is in this file, it has access to it.

	// 🎙️ So this function has access to changeToUpper
	// 🎙️ Which we actually haven't exported
	console.log(changeToUpper(str));
}
exports.yellAtWorld = yellAtWorld;

// 🎙️ And remember `exports` is an object
// 🎙️ So it's properties can be anything
exports.nameOfMyDogs = ['Scooby', 'Shelly'];

// 🎙️ One thing to note here
// 🎙️ When working with strict commonJS
// 🎙️ `exports` must be an object and it shouldn't be reassigned
// 🎙️ So we can not do this
// exports = function() {};

// 🎙️ Wonder why require from main.js didn't get messed up?
// 🎙️ Because require has `exports` in it's own scope
// 🎙️ Which it passes to this file as `exports` variable.
// 🎙️ At this point, both of them point to the same object.
// 🎙️ But since, we can not override `exports` from the scope of `require`
// 🎙️ It still works.

// 🎙️ How ever if we were to do something like this
// exports = {};
// exports.helloWorld = helloWorld;
// 🎙️ Then it would break.
// 🎙️ Because once we reassign to exports, it is not a reference to the object
// 🎙️ That require knows about.

// 🎙️ If you are completely out of your mind
// 🎙️ Finish the 5 days class
// 🎙️ Drink some coffee
// 🎙️ Then read these articles
// http://fredkschott.com/post/2014/06/require-and-the-module-system/
// https://medium.freecodecamp.org/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8

// 🎙️ But for now, just remember, in strict commonJS environment
//     👍 We manipulate the properties of `exports`.
//     👍 We do not reassign `exports`.

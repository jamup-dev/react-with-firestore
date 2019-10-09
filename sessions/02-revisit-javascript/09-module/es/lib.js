// 🎙️ Finally what we have today is the ES Module system.
// 🎙️ Note that CJS was runtime and we could `require` at any point of
// 🎙️ our JavaScript code.

// 🎙️ But ES modules are parse time, so they can not be imported during runtime
// 🎙️ say based on a condition.

// 🎙️ We export something in ES modules with the `export` keyword
// 🎙️ Note it is different from `exports` (with an s) from CJS.

// 🎙️ We can export something directly
export function helloWorld(str) {
	console.log(str);
}
export const myDogs = ['Scooby', 'Shelly'];

// 🎙️ We can do an explicit named exports
const whatMyDogsEat = ['Chicken', 'N&D', 'Egg', 'Rice'];
export { whatMyDogsEat as dogFood };

function selectRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function feedSomethingToMyDog() {
	return whatMyDogsEat[selectRandom(0, whatMyDogsEat.length - 1)];
}

// 🎙️ One export statement can have multiple stuff in it.
export { selectRandom as random, feedSomethingToMyDog as feedDog };

// And finally we can export something as default
function sayMyDogs() {
	console.log(myDogs.join(' and '));
}

export default sayMyDogs;

// 🎙️ It is a syntactic sugar against the following statement
// export { sayMyDogs as default };

/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
// 🎙️ Import something from our lib
// 🎙️ We can selectively import just the stuff we need
import { feedDog } from './lib.js';

// 🎙️ If we need a module during runtime
// 🎙️ Then we use the `import()` function.
// 🎙️ This function returns a promise, which we will learn in future.
// 🎙️ For now, just take a look at the syntax
// 🎙️ Fire up our app, when document is ready
document.addEventListener('DOMContentLoaded', function() {
	// 🎙️ Create a cache variable for the import
	let app;
	// 🎙️ And take our DOM
	const button = document.querySelector('#feed-dog');
	const list = document.querySelector('#feedtime');
	// 🎙️ Add an event listener to the button
	button.addEventListener('click', function(e) {
		// 🎙️ Don't do anything with the button
		e.preventDefault();
		// 🎙️ If lib is already imported
		if (app !== undefined) {
			console.log('lib already loaded');
			app.default(list, feedDog());
		} else {
			console.log('loading lib...');
			// 🎙️ Load the lib with runtime import
			import('./app.js').then(function(m) {
				app = m;
				console.log('lib loaded and cached');
				app.default(list, feedDog());
			});
		}
	});
});

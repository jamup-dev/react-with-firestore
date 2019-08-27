/* eslint-disable no-param-reassign */
/* eslint-disable strict */
/* eslint-disable func-names */

'use strict';

// ✅ Concept of promise.

// 🎙️ A promise is something that represents the eventual completion
// 🎙️ of an asynchronous operation and its resulting value.
// 🎙️ Now in JavaScript, mostly everything is single threaded.
// 🎙️ But we have some APIs like XMLHTTPRequest, events which run
// 🎙️ asynchronously.

// 🎙️ Let's take a look at this example of event listener
(function() {
	// 🎙️ The goal is to disable the button
	// 🎙️ and change the button text on click
	const button = document.querySelector('#my-button');
	function eventHandler(event) {
		// 🎙️ Don't anything
		event.preventDefault();
		// 🎙️ Change the attribute to disabled
		button.setAttribute('disabled', 'disabled');
		button.textContent = 'I am disabled';
		// 🎙️ Remove the event listener
		button.removeEventListener('click', eventHandler);
	}

	// 🎙️ So how we do something after an asynchronous action?
	// 🎙️ Through callback.
	button.addEventListener('click', eventHandler);
	// 🎙️ So when button has been clicked, the function eventHandler
	// 🎙️ is run. We have simply passed it to `addEventListener` as a
	// 🎙️ callback.

	// 🎙️ If we had a promise like interface and the browser had a `once`
	// 🎙️ method, it would look something like this.
	// button.once('click').then((event, element) => {
	// 	event.preventDefault();
	// 	element.setAttribute('disabled', 'disabled');
	// 	element.textContent = 'I am disabled';
	// });
	// 🎙️ But of course the code above would fail
	// 🎙️ because we don't have anything like this.
})();

// 🎙️ So we have seen that in JavaScript we can have code that runs
// 🎙️ asynchronously. Promise in JavaScript is an Object that can represent
// 🎙️ such actions.
// 🎙️ Think of it like, a Promise is something that is going to eventually
// 🎙️ resolve into a value in future, probably just not right now.
// 🎙️ Very much like when we do an AJAX call.

// 🎙️ We have seen that we have traditionally used callbacks to do something
// 🎙️ after an asynchronous operation. But promises give us new interface
// 🎙️ to do just that without what we call today a callback hell.

// 🎙️ When we have a promise interface of some asynchronous action
// 🎙️ we are given with a `.then` chainable function which is called
// 🎙️ only when the promise resolves into a value.
// 🎙️ We are also given a `.catch` chainable function which is called only
// 🎙️ when the promise rejects something.

(function() {
	function once(node) {
		return new Promise(resolve => {
			node.addEventListener('click', function listener(e) {
				node.removeEventListener('click', listener);
				resolve([node, e]);
			});
		});
	}

	const button = document.querySelector('#my-button');
	once(button).then(([node, e]) => {
		e.preventDefault();
		node.setAttribute('disabled', 'disabled');
		node.textContent = 'Clicked';
	});
})();

// ✅ Example using browser `fetch`.

// 🎙️ Let's see some example
(function() {
	// 🎙️ We will use `fetch` browser API
	// 🎙️ `fetch` is used to create XHR request for any URL
	// 🎙️ Unlike traditional XMLHTTPRequest, fetch returns a promise.
	// 🎙️ Let's fetch my own github user API
	const url = 'https://api.github.com/users/swashata';
	const githubProfile = fetch(url);
	// 🎙️ And let's see what gets stored in githubProfile variable
	console.log('​githubProfile', githubProfile);
	// 🎙️ So it is a promise object and we don't have access to the resolved
	// 🎙️ data right away. But we will get it sometime in future.
	// 🎙️ So we use `.then` to do something with the data when it is resolved
	githubProfile
		.then(data => {
			console.log('fetched data', data);
			// 🎙️ So we have a Response object from the fetch resolve
			// 🎙️ But we still don't have the JSON data yet
			// 🎙️ With a response object, we can convert the body to
			// 🎙️ readable JSON.
			return data.json();
		})
		.then(json => {
			// 🎙️ Now here's the fun part.
			// 🎙️ For every chained `.then`
			// 🎙️ The next .then gets the value returned by
			// 🎙️ the previous .then
			console.log(json);
			// 🎙️ And from here also we can return a specific value
			return json.bio;
		})
		.then(bio => {
			// 🎙️ And it works just the same.
			console.log(bio);
		});
})();

// ✅ Creating your own promise.
// 🎙️ We can create Promise interface for our own APIs
// 🎙️ With the Promise constructor function

// 🎙️ It works something like this
(function() {
	const doSomethingInFuture = new Promise((resolve, reject) => {
		// 🎙️ So the Promise constructor takes one argument
		// 🎙️ which is a function of the signature
		// 🎙️ (resolve, reject) => void
		// 🎙️ So the function shouldn't return anything
		// 🎙️ When the function thinks the job is done
		// 🎙️ call resolve with the desired value
		setTimeout(() => {
			resolve('I am done');
		}, 2000);
	});

	// 🎙️ If we were to chain the above with .then, this is how we would go
	doSomethingInFuture.then(val => console.log(val));

	// 🎙️ One nice thing about .then is, it can handle
	// 🎙️ Promises of its own, so within a .then
	// 🎙️ you can return a promise and the next .then will be called
	// 🎙️ when the promise is resolved.
	doSomethingInFuture
		.then(
			val =>
				new Promise(resolve => {
					setTimeout(() => {
						resolve(`${val} is done after 5 more seconds`);
					}, 5000);
				})
		)
		// 🎙️ This is called when the last returned promise is resolved
		.then(val => {
			console.log(val);
		});

	// 🎙️ Finally it is also possible that a promise may run into error
	// 🎙️ And is not further resolvable.

	// 🎙️ Let's emulate that forcibly.
	const iAmGoingToErrorOut = new Promise((resolve, reject) => {
		// 🎙️ It is going to resolve in 5 second
		setTimeout(() => {
			resolve('resolved');
		}, 5000);

		// 🎙️ But for some reason, we have to reject it early
		setTimeout(() => {
			reject(new Error('I do not know'));
		}, 2000);
	});

	// 🎙️ To handle rejects in a promise, we have the .catch
	// 🎙️ chainable.
	// 🎙️ It is usually kept at the last of your .then chain
	// 🎙️ because .then can not come after .catch
	// 🎙️ or more precisely, .catch doesn't return an interface
	// 🎙️ which has .catch.
	iAmGoingToErrorOut
		.then(val => {
			console.log(val);
			return [val];
		})
		.then(valArr => {
			console.log(valArr.join(' '));
		})
		.catch(error => {
			console.log(error);
		});

	// 🎙️ In a promise interface, it is a race between resolve and reject
	// 🎙️ One can not be executed after another.
	// 🎙️ And that is why we never get to resolve.
})();

// ✅ Resolving multiple promises with `Promise.all`.

// 🎙️ There are situations when we would want to do something
// 🎙️ When multiple promises are resolved
(function() {
	// 🎙️ So first we use the fetch API to get my github profile
	const myProfile = fetch('https://api.github.com/users/swashata');
	// 🎙️ Once it is done, I want to get my followers and repositories
	myProfile
		.then(data => data.json())
		.then(data => {
			// 🎙️ So we need to fetch two urls
			// 🎙️ We can fetch them in parallel like
			const repos = fetch(data.repos_url);
			const followers = fetch(data.followers_url);
			// 🎙️ Let's log them when both of them are done
			Promise.all([repos, followers])
				.then(results => {
					// 🎙️ Results is an array that holds the fetch results
					// 🎙️ In the same order as passed to Promise.all
					// 🎙️ So we can destructure them
					const [repoData, followerData] = results;
					// 🎙️ And return the json
					// 🎙️ But .json also returns a promise
					// 🎙️ And we would like to resolve them for the next chain
					// 🎙️ So we again wrap in Promise.all
					return Promise.all([repoData.json(), followerData.json()]);
				})
				.then(([repoData, followerData]) => {
					console.log(repoData);
					console.log(followerData);
				});
		});
})();

// 🎙️ ✅ Example - Convert classic event listener into promise.

// 🎙️ So we have a list of available breakfast items.
// 🎙️ The goal is to have everything under 20 seconds
// 🎙️ Then we would say, Had breakfast.
// 🎙️ Otherwise, we would just say breakfast time has passed.
(function() {
	// 🎙️ First let's create an one time click listener for the anchors
	function once(elm, timeOut = 2000) {
		// 🎙️ So this function will return a promise
		return new Promise((resolve, reject) => {
			// 🎙️ Which would add an event listener to the element
			elm.addEventListener('click', function listener(event) {
				event.preventDefault();
				// 🎙️ Which in turn would remove itself from the event listener
				// 🎙️ See we are using named function expression
				// 🎙️ So the name of the function is available to itself
				elm.removeEventListener('click', listener);
				// 🎙️ and once it is clicked, the promise will resolve.
				resolve([event, elm]);
			});

			// 🎙️ But we can wait only for so long
			setTimeout(() => {
				reject(new Error(`Timed out after ${timeOut}ms`));
			}, timeOut);
		});
	}

	// 🎙️ Now get a list of all anchors
	const anchors = document.querySelectorAll('#breakfast-list > li > a');
	const notification = document.querySelector('#breakfast-notification');
	// 🎙️ Add our promisified event listeners to them
	const breakfastPromises = Array.from(anchors).map(anchor =>
		once(anchor, 5000)
			// 🎙️ Also we change the individual anchor items on done
			.then(([event, elm]) => {
				const { textContent: label } = elm;
				const [, item] = label.split(' ');
				elm.textContent = `Done having ${item}`;
			})
	);
	// 🎙️ When all the promises are done, we change the notification
	Promise.all(breakfastPromises)
		.then(() => {
			notification.textContent = 'Done having breakfast';
			notification.classList.remove('is-info');
			notification.classList.add('is-success');
		})
		.catch(() => {
			// 🎙️ Interesting this is, this is called
			// 🎙️ when the first promise in the array
			// 🎙️ rejects. So it only catches the first `reject`
			// 🎙️ and doesn't act on other `reject`s.
			notification.textContent =
				'Timeout, can not have breakfast anymore';
			notification.classList.remove('is-info');
			notification.classList.add('is-danger');
		});
})();

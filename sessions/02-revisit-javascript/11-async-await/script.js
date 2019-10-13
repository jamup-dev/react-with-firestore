/* eslint-disable no-param-reassign */
/* eslint-disable strict */
/* eslint-disable func-names */

'use strict';

// ✅ What is `async` function.

// 🎙️ Async function or asynchronous function is a function which returns
// 🎙️ an implicit Promise and can await any promises in its syntax.

// 🎙️ Put simply its a fine way to represent your async code in much more
// 🎙️ synchronous way.

// 🎙️ An async function definition is something like this
async function somethingAsync() {
  return 100;
}

// 🎙️ And as it returns a promise
const asyncCall = somethingAsync();
console.log(asyncCall);

// 🎙️ We can chain it
asyncCall.then(val => {
  console.log(val);
});

// 🎙️ ✅ How we can `await` promises inside `async` functions.

// 🎙️ The finest thing we get with async function is the ability to
// 🎙️ `await` any promise inside it.
(function() {
  // 🎙️ Here's a sample function which returns a promise
  // 🎙️ which resolves to the given value after mentioned
  // 🎙️ number of seconds.
  function resolveAfterNSeconds(sec, val) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(val);
      }, sec * 1000);
    });
  }

  // 🎙️ Now let's create an async function
  async function sequentialStart() {
    // 🎙️ Start a timer to calculate the timing of this
    console.time('valueOne');
    // 🎙️ Now the fun part
    // 🎙️ Let's await for promises
    const valueOne = await resolveAfterNSeconds(2, 'Hello');
    // 🎙️ So this part of code is not run before
    // 🎙️ The valueOne is resolved.
    console.timeEnd('valueOne');
    // 🎙️ Again start a timer
    console.time('valueTwo');
    // 🎙️ And await another promise
    const valueTwo = await resolveAfterNSeconds(5, 'World');
    console.timeEnd('valueTwo');
    // 🎙️ Finally do something with the values
    console.log([valueOne, valueTwo].join(' '));
  }
  sequentialStart();
})();

// ✅ Error handling with `async` functions.
// 🎙️ Unlike Promise chain, we do not have any catch
// 🎙️ on async functions.
// 🎙️ So to handle errors, we have to wrap it in try catch block
(function() {
  // 🎙️ Let's create two dummy promises
  // 🎙️ One will resolve
  function promiseWillResolve() {
    return new Promise(resolve => {
      setTimeout(() => resolve('Done'), 1000);
    });
  }
  // 🎙️ And one will reject
  function promiseWillReject() {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Nope')), 1000);
    });
  }
  // 🎙️ Let's await the promises in our async function
  async function handleSomething() {
    // 🎙️ For error handling, wrap everything in a try catch
    try {
      const itemOne = await promiseWillResolve();
      console.log('​handleSomething -> itemOne', itemOne);
      const itemTwo = await promiseWillReject();
      console.log('​handleSomething -> itemTwo', itemTwo);
    } catch (e) {
      console.log(e);
    }
  }
  handleSomething();

  // 🎙️ We have two different ways to reject an async function
  // 🎙️ First is to just throw
  async function iWillThrow() {
    const stuff = await promiseWillResolve();
    if (stuff === 'Done') {
      throw new Error('I hate being done');
    }
  }
  iWillThrow()
    .then(val => {
      console.log(val);
    })
    .catch(e => {
      console.log(e);
    });

  // 🎙️ Or we can just return Promise.reject
  async function iWillThrowToo() {
    const stuff = await promiseWillResolve();
    if (stuff === 'Done') {
      return Promise.reject(new Error('I hate being done'));
    }
    return Promise.resolve('Yay not done');
  }
  iWillThrowToo()
    .then(val => {
      console.log(val);
    })
    .catch(e => {
      console.log(e);
    });
  // 💰 Learn all about Promise.resolve and Promise.reject from mdn
  //   Those are static methods.
})();

// ✅ Resolving multiple promises with `await`.
// 🎙️ So far we have seen how we can use async-await to escape the
// 🎙️ .then callback chain.
// 🎙️ But there's a catch, everything after await is actually stopped
// 🎙️ until the promise resolves.

// 🎙️ So we can use Promise.all to resolve multiple promises together.
(function() {
  // 🎙️ Let's see a practical method of handling multiple promises
  // 🎙️ Inside an async function with error handling.
  // 🎙️ Let's tweak our promise faker function
  // 🎙️ To resolve or reject a promise after given seconds
  function resolveOrRejectAfterNSeconds(sec, val, type = 'resolve') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (type === 'resolve') {
          resolve(val);
        }
        reject(val);
      }, sec * 1000);
    });
  }

  // 🎙️ Here's a function that will run multiple promises in parallel
  // 🎙️ While using await.
  async function runPromiseInParallel() {
    // 🎙️ Let's create a bunch of promises
    const promises = [
      resolveOrRejectAfterNSeconds(1, 'first'),
      resolveOrRejectAfterNSeconds(2, 'second'),
      resolveOrRejectAfterNSeconds(3, 'third', 'reject'),
    ];
    // 🎙️ Create an array of promises by mapping an error handler
    // 🎙️ To the original promise
    const promisesWithErrorHandler = promises.map(p =>
      p.catch(error => ({ error }))
    );
    // 🎙️ Now await and return the result
    const result = await Promise.all(promisesWithErrorHandler);
    return result;
  }
  // 🎙️ Let's access the value and see how much time it needs
  console.time('multiple promises');
  runPromiseInParallel().then(values => {
    console.timeEnd('multiple promises');
    console.log(values);
  });
})();

// ✅ Refactor promise callbacks with async-await.

// 🎙️ Lets take the same breakfast app and refactor the main
// 🎙️ execution as an async function.

(function() {
  // 🎙️ First let's create an one time click listener for the anchors
  function once(elm, timeOut = 2000) {
    // 🎙️ So this function will return a promise
    return new Promise((resolve, reject) => {
      // 🎙️ Which would add an event listener to the element
      elm.addEventListener('click', function listener(event) {
        event.preventDefault();
        // 🎙️ Which in turn would remove itself from the event listener
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

  // 🎙️ Now let's create an async function which would
  // 🎙️ handle our app
  async function app() {
    // 🎙️ Now get a list of all anchors
    const anchors = document.querySelectorAll('#breakfast-list > li > a');
    const notification = document.querySelector('#breakfast-notification');
    // 🎙️ Add our promisified event listeners to them
    const breakfastPromises = Array.from(anchors).map(anchor =>
      once(anchor, 5000).then(([event, elm]) => {
        const { textContent: label } = elm;
        const [, item] = label.split(' ');
        elm.textContent = `Done having ${item}`;
      })
    );
    // 🎙️ Now wrap it inside a try catch
    try {
      await Promise.all(breakfastPromises);
      notification.textContent = 'Done having breakfast';
      notification.classList.remove('is-info');
      notification.classList.add('is-success');
    } catch (e) {
      notification.textContent = 'Timeout, can not have breakfast anymore';
      notification.classList.remove('is-info');
      notification.classList.add('is-danger');
    }
  }
  // 🎙️ Call our app
  app();
})();

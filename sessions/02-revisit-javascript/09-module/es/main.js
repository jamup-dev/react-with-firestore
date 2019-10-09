// 🎙️ Now to import an ES module, we use the `import` keyword.
// 🎙️ Remember `import` are parse time, so no matter in which part of the body
// 🎙️ You do an import, it is visible throughout.
// 🎙️ So again, general rule of thumb
//     👍 All `import` should be at the top of the file.
//     👍 `import`s can not be placed inside blocks (like a conditional import).
//     👍 If runtime `import` is needed, then use `import()` function instead.

// 🎙️ So let's do some imports
// 🎙️ First let's import the default one
import sayMyDogs from './lib.js';

// 🎙️ Again this is syntactic sugar around
import { default as canBeAnything } from './lib.js';

// 🎙️ Now import the named exports from the file
import { dogFood, feedDog } from './lib.js';

// 🎙️ We can also change the variable name when importing
import { dogFood as myDogLoves } from './lib.js';

// 🎙️ Finally all the above import could've been written in a single statement
// import sayMyDogs, { dogFood, feedDog } from './lib.js';

// 🎙️ Here both sayMyDogs and canBeAnything are just the same
// console.log(sayMyDogs, canBeAnything);
// console.log(sayMyDogs === canBeAnything);

// 🎙️ Let's see about dogFood and feedDog
console.log(sayMyDogs());
console.log(feedDog());
console.log(dogFood);

// 🎙️ So we require our lib
const lib = require('./lib');

// 🎙️ Confirm it is a function
console.log(typeof lib);

// 🎙️ And we can call it
lib('Hello module.exports');

// 🎙️ Note in lib file, we later on tried with `exports`.
// 🎙️ But it is no longer available through require.
console.log(lib.myDogs);

// 🎙️ So which one to use while working with nodejs?
// 🎙️ The general rule of thumb is
//     👍 If you are exporting multiple stuff through one file, then use `exports`.
//     👍 If you are exporting only one thing from one file, then use `module.exports`.
//     👍 Personally I prefer to use strict commonJS `exports` only, even in case of
//        single export. Because I can add more exports later, without changing export
//        type and refactoring my `require`.

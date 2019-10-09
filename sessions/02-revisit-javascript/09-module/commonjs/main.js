// 🎙️ Let's require our library file and store the exports
// 🎙️ in a variable
const lib = require('./lib');
// 🎙️ If the extension of the file is .js, then we can omit it

// 🎙️ lib now holds the `exports` and what-ever property we have assigned
lib.helloWorld('I am common js module');
lib.yellAtWorld('I love JavaScript');

lib.helloWorld('My Dogs are');
lib.yellAtWorld(lib.nameOfMyDogs.join(' and '));

// 🎙️ Now execute it using node
// $ node ./main.js

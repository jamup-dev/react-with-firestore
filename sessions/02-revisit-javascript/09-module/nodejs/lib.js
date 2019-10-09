// 🎙️ Previously we've seen we can only manipulate the properties of
// 🎙️ exports object.

// 🎙️ But what if we don't want to export an object, and we would rather
// 🎙️ export a function instead.

// 🎙️ This isn't possible in strict commonJS platforms
// 🎙️ But nodejs has another for of exports called module.exports

// 🎙️ Think of it like this
// 🎙️ Initially module.exports and exports all refer to the same object
// 🎙️ But if we override module.exports then that becomes the value
// 🎙️ of require.

module.exports = function logger(str) {
	console.log(str);
};

// 🎙️ Once we use module.exports we can not further use cjs exports
// 🎙️ It will not work
exports.myDogs = ['Scooby', 'Shelly'];

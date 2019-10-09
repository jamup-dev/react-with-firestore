// 🎙️ Create a function for appending to the list
// 🎙️ Let's also export it as default
// 🎙️ We will load it in runtime
export default function appendToList(list, food) {
	const now = new Date();
	const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
	const item = document.createElement('li');
	item.textContent = `Fed ${food} at ${time}`;
	list.appendChild(item);
}

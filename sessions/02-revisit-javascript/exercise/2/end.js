// 🧸 Here's a class with ES6 syntax
// 🧸 Remember it is just syntactic sugar around JavaScript's prototypal inheritance.
class SomeClass {
  constructor() {
    this.name = 'Dragons';
  }

  sayDragon() {
    return this.name.toUpperCase();
  }
}

// 💰 Convert the above class with JavaScript's Function
export function SomeFunction() {
  // 🧸 See what should be the object's own property
  this.name = 'Dragons';
}

// 🧸 Also think about methods in prototype chain.
SomeFunction.prototype = {
  // 🧸 See what should come from prototype
  sayDragon() {
    return this.name.toUpperCase();
  },
};

// 🧸 Let's create a class State
// 🧸 The class instantiation takes an initial state (an object).
// 🧸 The class provides two methods
// 🧸 setState(key, value) which sets the state for the key with the value.
//    If key is not a string, then it should throw an error.
// 🧸 getState(key = null) which gets all the state if key is null, or just the
//    specified property.
//    If key is not null and is not a string, then it should throw an error.
export class State {
  constructor(initialState) {
    this.state = initialState;
  }

  setState(key, value) {
    if (typeof key !== 'string') {
      throw new Error('key has to be string');
    }
    this.state[key] = value;
  }

  getState(key = null) {
    if (key === null || key === undefined) {
      return this.state;
    }
    if (typeof key !== 'string') {
      throw new Error('key has to be string');
    }
    return this.state[key];
  }
}

// 🧸 We have a constructor function Cycle.
// 🧸 The purpose is to create a clock which will fire
// 🧸 A callback after given interval.
export function Cycle() {}
// 🧸 With it comes the following methods.
Cycle.prototype = {
  // 🧸 This one sets the interval and callback of the clock.
  init(interval, callback) {
    this.interval = interval;
    this.callback = callback;
    this.intervalId = null;
  },
  // 🧸 This one starts the clock.
  start() {
    this.intervalId = setInterval(this.callback, this.interval);
  },
  // 🧸 This one stops the clock.
  stop() {
    clearInterval(this.intervalId);
  },
};

// 🧸 Now the goal is to create another constructor function
export function CycleEnhanced() {}
// 🧸 This one should inherit from Cycle
// 🧸 And have its own methods
// 🧸 changeCallback - Which will change the callback on the go.
// 🧸 changeInterval - Which will change the interval on the go.
// 💡 The above two methods should clear old interval
//    set the new values and start the clock again.
// 💡 The prototype of CycleEnhanced should inherit the prototype of Cycle.

CycleEnhanced.prototype = Object.create(Cycle.prototype);

CycleEnhanced.prototype.changeCallback = function changeCallback(callback) {
  this.stop();
  this.callback = callback;
  this.start();
};
CycleEnhanced.prototype.changeInterval = function changeInterval(interval) {
  this.stop();
  this.interval = interval;
  this.start();
};

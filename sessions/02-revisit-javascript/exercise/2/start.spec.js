import { SomeFunction, State, Cycle, CycleEnhanced } from './start';

function waait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

describe('SomeFunction is perfect conversion', () => {
  const dragon = new SomeFunction();
  test('name is own property', () => {
    expect(Object.prototype.hasOwnProperty.call(dragon, 'name')).toBeTruthy();
  });
  test('sayDragon is not own property', () => {
    expect(
      Object.prototype.hasOwnProperty.call(dragon, 'sayDragon')
    ).not.toBeTruthy();
  });
});

describe('State', () => {
  const myState = new State({ firstName: 'Swashata', lastName: 'Ghosh' });
  test('has initial state', () => {
    expect(myState.getState()).toEqual({
      firstName: 'Swashata',
      lastName: 'Ghosh',
    });
  });
  test('setState works for existing values', () => {
    myState.setState('firstName', 'Chandler');
    myState.setState('lastName', 'Bing');
    expect(myState.getState()).toEqual({
      firstName: 'Chandler',
      lastName: 'Bing',
    });
  });
  test('setState works for new values', () => {
    myState.setState('middleName', 'Muriel');
    expect(myState.getState('middleName')).toBe('Muriel');
  });
  test('setState throws error for non string keys', () => {
    expect(() => {
      myState.setState(null, 'foo');
    }).toThrowError();
  });
  test('getState throws for non integer key', () => {
    expect(() => {
      myState.getState(10);
    }).toThrowError();
  });
});

describe('CycleEnhanced', () => {
  test('extends from Cycle', () => {
    expect(Cycle.prototype.isPrototypeOf(CycleEnhanced.prototype)).toBeTruthy();
  });
  test('does not pollute the prototype of Cycle', () => {
    expect(Cycle.prototype).not.toBe(CycleEnhanced.prototype);
  });
  test('has all init from Cycle', async () => {
    const cE = new CycleEnhanced();
    const cb = jest.fn();
    cE.init(50, cb);
    cE.start();
    await waait(500);
    cE.stop();
    expect(cb).toHaveBeenCalledTimes(9);
  });
  test('has its own changeCallback function', async () => {
    const cE = new CycleEnhanced();
    const cb = jest.fn();
    cE.init(50, cb);
    cE.start();
    await waait(500);
    const newCb = jest.fn();
    cE.changeCallback(newCb);
    await waait(500);
    cE.stop();
    expect(cb).toHaveBeenCalledTimes(9);
    expect(newCb).toHaveBeenCalledTimes(9);
  });
  test('has its own changeInterval function', async () => {
    const cE = new CycleEnhanced();
    const cb = jest.fn();
    cE.init(50, cb);
    cE.start();
    await waait(500);
    cE.stop();
    expect(cb).toHaveBeenCalledTimes(9);
    cE.changeInterval(10);
    await waait(105);
    expect(cb).not.toHaveBeenCalledTimes(11);
  });
});

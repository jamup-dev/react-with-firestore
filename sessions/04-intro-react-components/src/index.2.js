import React from 'react';
import ReactDOM from 'react-dom';

let ui;
// So far we have seen how to use React.createElement to create VirtualDOM
// We can say, React.createElement **expressions** create our VirtualDOM
// that React renders.
// But it is cumbersome to write components this way.
// What if instead of
ui = React.createElement('div', { id: 'root' }, 'Hello World');
console.log(ui);
// we could write
ui = <div id="root">Hello World</div>;
console.log(ui);

// What happened here is we made another language to write our
// createElement expressions in XML like way.
// This is called JSX (JavaScript XML).
// We use XML like syntax extension to ECMAScript without any semantics
// So in JSX, all createElement expressions can have any attributes and
// children, and those are converted into subsequent React.createElement
// expression by our compiler (react-scripts or babel etc).

// It is important to understand that JSX is nothing but expression written
// in XML like fashion. So what-ever you can do with React.createElement
// expressions, you can do with JSX.

// So the following JSX expression
ui = (
  <div>
    <span>Hello</span> <span>World</span>
  </div>
);
console.log(ui);

// gets converted into
ui = React.createElement(
  'div', // type
  null, // attributes (in case HTMLElement) or props (for custom components)
  // children are rest from here on
  React.createElement('span', null, 'Hello'),
  ' ',
  React.createElement('span', null, 'World')
);
console.log(ui);

// We can interpolate something inside JSX
const subject = 'World';
// by wrapping the expression inside `{}`
ui = <div>Hello {subject}</div>;
// converts into
ui = React.createElement('div', null, 'Hello ', subject);

// Remember that what-ever we put inside `{` and `}` must be an expression
// not statement. Because any arguments passed to React.createElement must be
// an expression (can you say why? Because arguments of any functions have to
// be an expression). So don't write statements like `if ... else` or `for...in`
// inside braces, that would be syntax error (just like in JavaScript itself).

// Here are more examples
const greeting = 'Hello';
ui = (
  <div>
    {greeting} {subject}
  </div>
);
// converts into
ui = React.createElement('div', null, greeting, ' ', subject);

ui = <button onClick={() => {}}>click me</button>;
// converts into
ui = React.createElement('button', { onClick: () => {} }, 'click me');

const error = 'oh no!!!';
ui = <div>{error ? <span>{error}</span> : <span>good to go</span>}</div>;
// converts into
ui = React.createElement(
  'div',
  null,
  error
    ? React.createElement('span', null, error)
    : React.createElement('span', null, 'good to go')
);

// A JSX expression must start with a single top-level parent
ui = (
  <ul>
    <li>Hello</li>
    <li>World</li>
  </ul>
);

// The following is not valid
// ui = (
// 	<p>Hello</p>
// 	<p>World</p>
// );
// because it can not get compiled into React.createElement
// ui = React.createElement('p', null, 'Hello')
// 		 React.createElement('p', null, 'World');
// The above is syntax error

// If we are in a situation where we must have siblings, wrap them in
// React.Fragment
ui = (
  <React.Fragment>
    <p>Hello</p>
    <p>World</p>
  </React.Fragment>
);
// or simply
ui = (
  <>
    <p>Hello</p>
    <p>World</p>
  </>
);
// gets converted to
ui = React.createElement(
  React.Fragment,
  null,
  React.createElement('p', null, 'Hello'),
  React.createElement('p', null, 'World')
);

// Whenever we need to return an array of JSX, make sure to pass in the
// special key attribute (valid on all types of components)
const items = [
  {
    id: '1',
    content: 'Hello',
  },
  {
    id: '2',
    content: 'World',
  },
];
ui = (
  <div>
    {items.map(i => (
      <span key={i.id}>{i.content}</span>
    ))}
  </div>
);
// converts into
ui = React.createElement(
  'div',
  null,
  items.map(i => React.createElement('span', { key: i.id }, i.content))
);

// The more you understand how JSX gets converted into React.createElement
// by the compiler in your head, better you can use it's power
// If you want to play more with it, check out the following link
// @link
// https://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=true&code_lz=GYVwdgxgLglg9mABAQQA6oBQEpEG8BQiiECAzlIgG4wBOUIAhgDYAicAtogLyIaFGIAPAAsATInIBPJgFMuuXCSZwaALkQByAOY0ZMsBoC-hgHz8BiABIymy3Bs2HzAwWlQBhYTCYATYnGUaLgAiACMmEBlgxHAfGRomGDA5XCgaSNNnCwB1FV8AQiyhAHo3T28fE3tHItd0ct9_QJDdH2jY-MTk-WBmUhlMixzhBihSRC04JK1EBAB-IqI6jy9GjoSklN6mfsMmlRD2Bi19KAZgk2QwOChheMQAeWTBUvrVytrXlYqzCxexX6ILAAbn4JDApACMgAdMotBhqHRGKwOCD-Lp6DQkIj6Mw2OxQYYgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-3%2Cenv&prettier=true&targets=&version=7.6.0&externalPlugins=

function App() {
  return 'Hello World';
}

ReactDOM.render(<App />, document.getElementById('root2'));

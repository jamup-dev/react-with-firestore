import React from 'react';
import ReactDOM from 'react-dom';

// Let's see how to write virtual DOM in react components
// Any function that returns something renderable by react
// can be seen as React Component. To render a React Component
// we would first need to create a special React.createElement
// and mount it to dom, with the help of ReactDOM package.
// Every React component can either return a bunch of custom functions
// wrapped in React.createElement or simply a native DOM node created
// with React.createElement.
// What-ever we create with React.createElement is called virtual DOM.
// React works by actually committing those virtual DOM to actual DOM.
// Whenever there's some change it state, the whole thing goes through
// three different stages:
//    1. Render -> The whole tree (or we will see in future the point
//       of the tree from where the change has occurred) updates by calling
//       subsequent React Components and the Virtual DOM is reconstructed.
//    2. Reconciliation -> Here React compares Virtual DOM from previous render and
//       figures out where the changes have occurred.
//    3. Commit -> Here ReactDOM actually updated the DOM depending on the diff.

// But for now, we will first see how do we create React Components and
// how we can mount them to DOM.

// Remember React Component is basically a function that returns something
// renderable by React, so either a bunch of (perhaps nested) Virtual DOM
// created with React.createElement, or a string (textNode) or simply null
// (to not render anything).

// Here's a very simple React Component
function AppChild(props) {
  // This components accepts three properties in **props**
  const { color, children, underline } = props;
  // Now to create our virtual DOM (or simply React Element)
  // We call the `React.createElement` function.
  const virtualDom = React.createElement(
    // The first argument is the type of DOM node or any custom component
    'span',
    // Second argument is any attribute (or props) passed to the component
    // Since we have used span as first argument, we can pass in all HTML
    // attributes that a `<span` accepts.
    {
      style: { color, textDecoration: underline ? 'underline' : 'none' },
    },
    // The rest of the arguments are children
    // React.createElement captures all arguments from this as an array
    // of children[].
    children
  );
  // It basically gives you back a simple object
  console.log(virtualDom);
  // Now it is the job of ReactDOM or other reconcilers to mount them
  // properly on the DOM
  return virtualDom;
}

// Let's see another usage of React Component
// We create a custom component App (which is a plain JS function returning
// something React can render, in our case a virtualDOM created with React.createElement).
// Here we will see use-case of React.createElement with a custom component.
function App() {
  const virtualDom = React.createElement(
    // So we wan't to create an <h2> element
    'h2',
    // with className HTMLElement attribute
    { className: 'text-2xl' },
    // `Hello ` is the first child
    'Hello ',
    // Second child is a custom component
    React.createElement(
      // The AppChild
      AppChild,
      // With props color passed as 'blue' and underline as true
      {
        color: 'blue',
        underline: true,
      },
      // With following children
      'World',
      '!'
    ),
    // and so on
    React.createElement(
      AppChild,
      {
        color: 'red',
        underline: false,
        fontWeight: 'bold',
      },
      ' whats going on?'
    )
  );
  console.log(virtualDom);
  return virtualDom;
}

// Finally to render we create our top-level virtual DOM
const AppToRender = React.createElement(App);
// and call react-dom to render
ReactDOM.render(AppToRender, document.getElementById('root1'));

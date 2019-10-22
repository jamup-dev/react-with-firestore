# Learn React Hooks, Styles and Flux Concepts

In this session, we learn a lot about available react hooks, styling components
and flux like state management.

After bootstrapping with Create React App, we add

1. `node-sass` as our development dependency for compiling sass.
2. `normalize.css` as project dependency for CSS reset.
3. `prettier` for formatting code on save (using vscode config).

## Setup & Using Part Files

For your convenience the classes are split into 2 days. Each day, we start with
something and finish up our goal.

1. Day 01 - We start with blank CRA template and wire our app until we can add
   new tasks and view the ones through code.
2. Day 02 - We write components for managing task operations. Also we optimize
   some parts of our app using `memo` and add dynamic page title using
   `useEffect`.

If you'd like to start with the same code as me, for everyday here's what you
need to do (**assuming we want to setup day 01**).

- Clone the repository.
- Move to `sessions/05-react-hooks-styles`.
- Copy the whole thing to another directory of your choice.
- Delete everything inside `src`.
- Copy `part-files/day-01-start/src` to the root, thereby creating a new `src`.

Now follow along and do your best.

---

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

## 1: Create first files

**Create `index.html` file.**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>React Application with Webpack and Babel</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="./src/index.js"></script>
  </body>
</html>
```

**Create `src/index.js` file.**

```js
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h2>Hello World</h2>;
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});
```

## 2. Install dependencies

For now, we will work only with React and React DOM. So install them.

First init the project

```bash
yarn init -y
```

Now install dependencies:

```bash
yarn add react react-dom
```

## 3. Install module bundler and JavaScript compiler

Now if you open `index.html` you will see it is throwing error. Because

1. Browser has no knowledge of `react` and `react-dom` modules.
2. JSX is not valid JavaScript code.

So we need two kinds of tooling

1. Transform JSX to valid JavaScript - Babeljs.
2. Bundle and hoist modules so that browsers can work with them - Webpack.

```bash
yarn add webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/preset-react --dev
```

Now create a **`webpack.config.js`** file.

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
```

And create a `babel.config.js` file:

```js
module.exports = {
  presets: [
    // convert modern JS language features to something that our target browsers
    // can work with.
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not dead',
        // we want webpack to handle modules
        modules: false,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: process.env.NODE_ENV !== 'production',
      },
    ],
  ],
};
```

Edit `package.json` file and put the scripts part

```json
{
  // ....
  "scripts": {
    "build": "webpack -p",
    "watch": "webpack --watch"
  }
  // ....
}
```

Finally create a directory `dist` and move `index.html` file inside it. Change
the `<script>` reference from `"./src/index.js"` to `"./dist/main.js"`.

## 4. Install Dev Server

First get the dev dependencies

```bash
yarn add webpack-dev-server --dev
```

Add config to `webpack.config.js` file

```js
module.exports = {
  // ....
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
```

Add another script to `package.json`.

```json
{
  // ...
  "scripts": {
    // ...
    "start": "webpack-dev-server"
  }
}
```

And start the server with

```bash
yarn start
```

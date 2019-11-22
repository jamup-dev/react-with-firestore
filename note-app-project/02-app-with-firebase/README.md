## NOTES APP WITH GOOGLE FIREBASE

- [Google Firebase](https://firebase.google.com/).
- [Authentication](https://firebase.google.com/docs/auth).
- [Cloud FireStore - Database](https://firebase.google.com/docs/firestore).
- [Firebase JavaScript SDK](https://firebase.google.com/docs/reference/js).
- [React Firebase UI](https://github.com/firebase/firebaseui-web-react).

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## SETUP TESTS

The project uses
[Firebase Emulator](https://firebase.google.com/docs/rules/emulator-setup).

- Install and setup [Firebase CLI](https://firebase.google.com/docs/cli).
- Download and install
  [Firebase Emulator](https://firebase.google.com/docs/rules/emulator-setup).
- Run the tests.

The following are the commands you need to execute.

```bash
npm install -g firebase-tools
firebase emulators:start
```

The second command `firebase emulators:start` will automatically download
emulator if not present and start it. Press `Ctrl + c` to quit.

Now run

```bash
yarn test
```

And it will run the test suits. Alternately you can run

```bash
yarn firebasetest
```

### How Test Setup Works

1. First we have `utils/testHelpers.js` where we use `@firebase/testing` library
   instead of `firebase` to create a test app with a project id.
2. In the same file, we have several functions to create test app as needed.
3. Since we can not use `auth()` on test app, we mock the implementation of
   `useAuth` hook.
4. Finally we have a `TestAppProvider` that takes an instance of test app and
   auth object (similar to `useAuth` hook output). We wrap every component we
   want to test with this.
5. In `src/setupTests.js` we clear firebase store when necessary to have
   isolation.
6. In the same file, we also load firestore rules before starting the test
   package.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br> You will also see any lint errors in
the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (Webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here:
https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here:
https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here:
https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here:
https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here:
https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here:
https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

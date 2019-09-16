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

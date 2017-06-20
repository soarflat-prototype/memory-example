const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/js/app',
  },

  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].js',
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      velocity: 'velocity-animate',
      _: 'lodash',
    }),
  ],
};

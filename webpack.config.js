const path = require('path');

module.exports = {
  entry: './demo/demo.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'demo.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  watch: true,
};

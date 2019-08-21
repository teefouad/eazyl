const path = require('path');

const { NODE_ENV, FILE_NAME } = process.env;
const filename = `${FILE_NAME}${NODE_ENV === 'production' ? '.min' : ''}.js`;

module.exports = {
  mode: NODE_ENV || 'development',
  entry: [
    './src/index.ts',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
};

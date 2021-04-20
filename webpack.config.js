const path = require('path');

module.exports = {
  entry: '/client/index.js',
  output: {
    path: path.resolve(__dirname, './public/build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ]
          }
        }
      }
    ]
  },
  devServer: {
    publicPath: '/build/',
    contentBase: './public/',
    hot: true,
  }
}
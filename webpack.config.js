const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, './client/src/index.jsx'),
  output: {
    path: path.join(__dirname, 'bundles'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        query: {
          presets: ['react', 'es2015', 'stage-2']
       }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
}

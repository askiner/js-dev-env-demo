import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    noInfo: false
  },
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}

export default exports;

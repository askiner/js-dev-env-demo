import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'; // deal with external CSS
import OptimizeCssWebpackPlugin from 'optimize-css-assets-webpack-plugin';

// const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    noInfo: false
  },
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  optimization: {
    // Use splitChunks to create a separate bundle
    // of vendor libraries sp that they're cached separately
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          //test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        }
      }
    },
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        cache: true

        //ecma: 5,
        //warnings: false,
        //ie8: false,
        //safari10: false,
        //dead_code: true,
        //comments: false,
        //uglifyOptions: {
        //  compress: {
        //    inline: false
        //  },
        //  mangle: {
        //    keep_fnames: true,
        //  }
        //}
      }),
      new OptimizeCssWebpackPlugin({})
    ]
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js' // Hash the files using MD5 so that their names change when the content changes.
  },
  plugins: [
    // Generate an external css file with a hash in the filename
    new MiniCSSExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      // chunks: ['main'],
      minify: {
        showErrors: true,
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    new webpack.LoaderOptionsPlugin({
      debug: false
    })
  ],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'css-loader',
          }
        ]}
    ]
  }
}

export default exports;

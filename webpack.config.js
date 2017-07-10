var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: './app/app.js',
  output: {
    path: __dirname,
    filename:   './public/bundle.js' 
  },
  watch: true,
   module: {

    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }      
    }
    ]
  }
};

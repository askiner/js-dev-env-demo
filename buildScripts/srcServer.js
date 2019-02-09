import express from 'express';
import path from 'path';
import chalk from 'chalk';

//import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(config)

/* eslint-disable no-console */

// console.log(config.output.publicPath);

console.log(chalk.red('To start app run in browser: localhost:'+port)); // eslint-disable-line no-console

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res){
  res.json([
    {"id": 1, "firstname": "A1", "lastname": "A2", "email": "A@A.com"}
  ]);
})

app.listen(port, function(err){
  if (err) {
    console.log(err);
  }
  //else {
  //  open('http://localhost:' + port);   // that is vulnerable library! Run with hands
  //}
})

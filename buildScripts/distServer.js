import compression from 'compression';
import express from 'express';
import path from 'path';
import chalk from 'chalk';

/* eslint-disable no-console */

const port = 3000;
const app = express();
app.use(compression());

app.use(express.static('dist'));

console.log(chalk.red('To start app run in browser: localhost:'+port)); // eslint-disable-line no-console

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../dist/index.html'));
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
})

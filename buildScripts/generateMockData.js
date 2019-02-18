/*
  This script generate data only for local developent!
*/

/* eslint-disable no-console */

import jsf from 'json-schema-faker';
import {schema} from './mockDataSchema';
import fs from 'fs';
import chalk from 'chalk';

jsf.extend('faker', () => require('faker'));

const json = JSON.stringify(jsf(schema));

/*
jsf.resolve(schema).then(function(result) {
  fs.writeFile(outputFile, JSON.stringify(result, null, 2), function(err){
      if (err) {
          return (console.log(r(err)));
      } else {
          console.log(g(`Mock Data Generated Here: ${outputFile}`));
      }
  });
});
*/

fs.writeFile("./src/api/db.json", json, function(err){
  if (err) {
    return console.log(chalk.red(err));
  }
  else {
    console.log(chalk.green("Mock data generated."));
  }
});


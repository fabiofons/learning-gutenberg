#!/usr/bin/env node
const chalk = require('chalk');
const critical = require('critical');
const path = require('path');

const pages = require('./critical.config.json');

const keys = Object.keys(pages);

const argv = require('yargs')
  .usage('$0 [-p page]')
  .describe('Generates Critical CSS')
  .option('page', {
    alias: 'p',
    describe: 'if this option is passed with a valid value, it will generate the Critical CSS only for that page',
    choices: keys
  })
  .option('errors', {
    alias: 'e',
    describe: 'if true errors are shown',
    default: false,
    type: 'boolean'
  })
  .help()
  .argv;

if (argv.p) {
  generate(argv.p);
} else {
  generateAll();
}

function generateAll() {
  return Promise.all(keys.map(generate))
    .then((output) => {
      const successful = output.filter(code => code === 0);
      console.log(`${chalk.bold.underline(successful.length + ' of ' + output.length)} CSS files generated`);
    });
}

function generate(key) {
  const page = pages[key];
  const base = path.resolve(__dirname, '../dist');
  const dest = `styles/critical/${page.dest}.css`;
  const src = page.url;
  const ignore = ["@font-face", /url\(/];

  console.log(`Generating Critical CSS for ${chalk.bold(key)} from ${chalk.bold.underline(src)}`);

  return critical.generate({ base, dest, src, ignore })
    .then(() => {
      console.log(`${chalk.bold.green('Success: ')}Generated ${chalk.bold.underline(base + '/' + dest)}`);
      return 0;
    })
    .catch((error) => {
      console.log(`${chalk.bold.red('Error:')} Could not generate Critical CSS for ${chalk.bold(key)}`);
      if (argv.errors) {
        console.log(chalk.bold('--------------'));
        console.log(error);
        console.log(chalk.bold('--------------'));
      }
      return 1;
    });
}

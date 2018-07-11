import program from 'commander';
import { trackRemessa } from './tracking';
import { printTable } from './printing';
import pkg from '../package.json';

program
  .version(pkg.version)
  .description('Track DirectLog package')
  .arguments('<remessa>')
  .action(async (remessa) => {
    const logs = await trackRemessa(remessa);
    printTable(logs);
  })
  .parse(process.argv);

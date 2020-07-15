import { Command } from 'commander';
const program = new Command();
import * as actions from './actions';

program.version('0.0.1').option('-a, --auth', 'Adds auth to table');

program
  .command('table <tableName>')
  .description('creates a table with <tableName>')
  .action(actions.createTable);

program
  .command('resolver <resolverName>')
  .description('creates a resolver')
  .requiredOption(
    '-t, --table <tableName>',
    'the name of the table to attach the resolver to'
  )
  .requiredOption(
    '-s, --schema <typeName>',
    'The schema type [Query] or Mutation'
  )
  .action(actions.createResolver);

program.parse(process.argv);

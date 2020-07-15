import { getSpartan, updateSpartan, updateSchema, Schema } from './helpers';

export function createTable(tableName: string) {
  const spartan = getSpartan();
  const { tables } = spartan;
  if (tables[tableName]) {
    throw Error(`Cannot create table ${tableName} as it already exists`);
  }
  spartan.tables[tableName] = '<TablePath>';
  updateSpartan(spartan);
}

export function createResolver(name: string, options: ResolverOptions) {
  const spartan = getSpartan();
  const { tables } = spartan;
  const { schema, table } = options;
  if (!tables[table]) {
    throw Error(
      `Cannot create resolver on table ${table} as it doesn't exists`
    );
  }

  updateSchema(spartan, { name, schema });
}

interface ResolverOptions {
  schema: Schema;
  table: string;
}

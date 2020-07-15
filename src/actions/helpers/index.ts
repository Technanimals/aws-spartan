import fs from 'fs';
import { merge } from 'lodash';
import path from 'path';

export function getSpartanPath() {
  const root = process.cwd();
  return path.resolve(root, '.spartan.json');
}

export function updateSpartan(spartan: Spartan) {
  const spartanFile = getSpartanPath();
  const data = JSON.stringify(spartan, null, 2);
  fs.writeFileSync(spartanFile, data);
}
export function getSpartan(): Spartan {
  const spartanFile = getSpartanPath();
  const exists = fs.existsSync(spartanFile);
  if (exists) {
    const data = fs.readFileSync(spartanFile).toString();
    return JSON.parse(data) as Spartan;
  }
  return {
    tables: {},
    resolvers: {
      Mutation: {},
      Query: {},
    },
  };
}

export function updateSchema(spartan: Spartan, options: UpdateSchemaOptions) {
  const { schema, name } = options;
  const field = spartan.resolvers[schema][name];
  if (field) {
    throw Error(`Cannot create resolver ${name} as it already exists`);
  }
  const resolver = {
    resolvers: {
      [schema]: {
        [name]: '<ResolverPath>',
      },
    },
  };

  updateSpartan(merge(spartan, resolver));
}

/**  */
interface Resolvers {
  Mutation: Record<string, string>;
  Query: Record<string, string>;
}
interface Spartan {
  tables: Record<string, string>;
  resolvers: Resolvers;
}
export type Schema = keyof Resolvers;

interface UpdateSchemaOptions {
  name: string;
  schema: Schema;
}

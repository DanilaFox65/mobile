import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://rickandmortyapi.com/graphql',
  documents: 'src/graphql/*.{ts,tsx,gql,graphql}',
  ignoreNoDocuments: true,
  hooks: { afterAllFileWrite: ['prettier --write'] },
  generates: {
    'src/graphql/__generated__/': {
      preset: 'client',
      config: {
        withHooks: true,
        useIndexSignature: true,
      },
    },
  },
};

export default config;

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  outDir: 'dist',
  external: [
    '@prisma/client',
    '@giulio-leone/types',
    '@giulio-leone/schemas',
    '@giulio-leone/lib-shared',
    'stripe',
  ],
});

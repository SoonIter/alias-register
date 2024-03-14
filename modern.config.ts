import { moduleTools, defineConfig } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      buildType: 'bundle',
      input: ['./src/esm/index.ts'],
      format: 'esm',
      dts: false,
      autoExtension: true,
      outDir: 'dist/esm',
    },
    {
      buildType: 'bundle',
      input: ['./src/cjs/index.ts'],
      format: 'cjs',
      dts: false,
      autoExtension: true,
      outDir: 'dist/cjs',
    },
  ],
});

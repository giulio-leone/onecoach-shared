import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    // Root entry
    'index': 'src/index.ts',

    // Root-level modules
    'id-generator': 'src/id-generator.ts',
    'storage.service': 'src/storage.service.ts',
    'api.service': 'src/api.service.ts',
    'date-utils': 'src/date-utils.ts',
    'macro-calculations': 'src/macro-calculations.ts',
    'prisma-type-guards': 'src/prisma-type-guards.ts',

    // Legacy non-prefixed subpath exports (backward compat)
    'batch-processing': 'src/utils/batch-processing.ts',
    'simple-cache': 'src/utils/simple-cache.ts',
    'url-normalizer': 'src/utils/url-normalizer.ts',
    'core-types': 'src/utils/error/core-types.ts',

    // utils/ subpath exports
    'utils/index': 'src/utils/index.ts',
    'utils/ai-model-mapper': 'src/utils/ai-model-mapper.ts',
    'utils/analytics-formatters': 'src/utils/analytics-formatters.ts',
    'utils/api-client': 'src/utils/api-client.ts',
    'utils/api-error-handler': 'src/utils/api-error-handler.ts',
    'utils/api-helpers': 'src/utils/api-helpers.ts',
    'utils/batch-processing': 'src/utils/batch-processing.ts',
    'utils/date-conversion': 'src/utils/date-conversion.ts',
    'utils/date-helpers': 'src/utils/date-helpers.ts',
    'utils/date-range-helpers': 'src/utils/date-range-helpers.ts',
    'utils/dnd-helpers': 'src/utils/dnd-helpers.ts',
    'utils/exercise-helpers': 'src/utils/exercise-helpers.ts',
    'utils/flight-types': 'src/utils/flight-types.ts',
    'utils/formatters': 'src/utils/formatters.ts',
    'utils/http': 'src/utils/http.ts',
    'utils/id-generator': 'src/utils/id-generator.ts',
    'utils/image-url-sanitizer': 'src/utils/image-url-sanitizer.ts',
    'utils/intelligent-cache': 'src/utils/intelligent-cache.ts',
    'utils/macro-calculations': 'src/utils/macro-calculations.ts',
    'utils/macro-normalization': 'src/utils/macro-normalization.ts',
    'utils/main-macro-calculator': 'src/utils/main-macro-calculator.ts',
    'utils/nutrition-goal-mapper': 'src/utils/nutrition-goal-mapper.ts',
    'utils/nutrition-plan-helpers': 'src/utils/nutrition-plan-helpers.ts',
    'utils/parallel-executor': 'src/utils/parallel-executor.ts',
    'utils/password-validation': 'src/utils/password-validation.ts',
    'utils/plan-helpers': 'src/utils/plan-helpers.ts',
    'utils/platform': 'src/utils/platform.ts',
    'utils/prisma-type-guards': 'src/utils/prisma-type-guards.ts',
    'utils/request-deduplication': 'src/utils/request-deduplication.ts',
    'utils/simple-cache': 'src/utils/simple-cache.ts',
    'utils/sse-event-serializer': 'src/utils/sse-event-serializer.ts',
    'utils/type-guards': 'src/utils/type-guards.ts',
    'utils/url-normalizer': 'src/utils/url-normalizer.ts',
    'utils/validation': 'src/utils/validation.ts',
    'utils/validation-utils': 'src/utils/validation-utils.ts',
    'utils/validators': 'src/utils/validators.ts',
    'utils/weight-converter': 'src/utils/weight-converter.ts',
    'utils/workout-program-helpers': 'src/utils/workout-program-helpers.ts',

    // utils/error/ subpath exports
    'utils/error/index': 'src/utils/error/index.ts',
    'utils/error/api': 'src/utils/error/api.ts',
    'utils/error/core': 'src/utils/error/core.ts',
    'utils/error/core-types': 'src/utils/error/core-types.ts',
    'utils/error/custom-errors': 'src/utils/error/custom-errors.ts',
    'utils/error/utils': 'src/utils/error/utils.ts',

    // utils/logger/ subpath exports
    'utils/logger/index': 'src/utils/logger/index.ts',
    'utils/logger/core': 'src/utils/logger/core.ts',
    'utils/logger/domain': 'src/utils/logger/domain.ts',
    'utils/logger/factories': 'src/utils/logger/factories.ts',
    'utils/logger/production-disable': 'src/utils/logger/production-disable.ts',

    // hooks/ subpath exports
    'hooks/index': 'src/hooks/index.ts',
    'hooks/use-async-state': 'src/hooks/use-async-state.ts',
    'hooks/use-feature-flag': 'src/hooks/use-feature-flag.ts',
    'hooks/use-form': 'src/hooks/use-form.ts',

    // components/ subpath exports
    'components/index': 'src/components/index.ts',
    'components/async-state': 'src/components/async-state.tsx',

    // performance/
    'performance/index': 'src/performance/index.ts',
    'performance/optimizations': 'src/performance/optimizations.ts',
  },
  format: ['esm', 'cjs'],
  dts: false,
  clean: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  outDir: 'dist',
  external: [
    '@prisma/client',
    '@giulio-leone/types',
    '@giulio-leone/schemas',
    '@giulio-leone/constants',
    'react',
    'react-dom',
    'date-fns',
    'date-fns/locale',
    'lucide-react',
    'next/server',
    'react-native',
    'zod',
  ],
});

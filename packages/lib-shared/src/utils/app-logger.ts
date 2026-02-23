/**
 * App-wide logger configuration (server-first, minimal overhead in produzione)
 */
import { Logger, type LogLevel } from '@giulio-leone/lib-shared';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

const clampRate = (value: number, min = 0, max = 1): number => Math.min(max, Math.max(min, value));
const parseRate = (value: string | undefined): number | undefined => {
  if (value === undefined) return undefined;
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) return undefined;
  return clampRate(parsed);
};

const resolveLogLevel = (): LogLevel => {
  const envLevel = process.env.LOG_LEVEL as LogLevel | undefined;
  if (envLevel) return envLevel;
  return isProduction ? 'warn' : 'info';
};

const resolveNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const appLogger = new Logger({
  level: resolveLogLevel(),
  enabledInProduction: process.env.LOG_IN_PRODUCTION !== 'false',
  enableTimestamps: !isProduction,
  maxStringLength: resolveNumber(process.env.LOG_MAX_STRING, 500),
  maxArrayLength: resolveNumber(process.env.LOG_MAX_ARRAY, 20),
  maxObjectDepth: resolveNumber(process.env.LOG_MAX_DEPTH, 3),
  sampleRates: {
    debug: parseRate(process.env.LOG_SAMPLE_DEBUG) ?? (isProduction ? 0 : 1),
    info: parseRate(process.env.LOG_SAMPLE_INFO) ?? (isProduction ? 0.1 : 1),
    warn: 1,
    error: 1,
  },
});

export const createPrefixedLogger = (prefix: string): Logger => appLogger.child(prefix);

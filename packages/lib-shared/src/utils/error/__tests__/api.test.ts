import { describe, it, expect, vi, beforeEach } from 'vitest';
import path from 'node:path';
import type { ApiErrorResponse } from '../core-types';

import {
  handleRouteError,
  createApiErrorResponse,
  createNextErrorResponse,
  mapErrorToApiResponse,
} from '../api';
import { ERROR_CODES, HTTP_STATUS } from '../core-types';
import {
  AppError,
  InsufficientCreditsError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  ConflictError,
  ValidationError,
} from '../custom-errors';

// Access the logger mock injected by vitest.setup.ts into Node's require cache
const loggerPath = path.resolve(__dirname, '../../logger/index.ts');
const mockLogError = require.cache[loggerPath]!.exports.logError as ReturnType<typeof vi.fn>;

/** Extract body and status from a NextResponse */
async function parseResponse(res: { status: number; json(): Promise<unknown> }): Promise<{
  body: ApiErrorResponse;
  status: number;
}> {
  return { body: (await res.json()) as ApiErrorResponse, status: res.status };
}

beforeEach(() => {
  vi.clearAllMocks();
});

// ─── handleRouteError ────────────────────────────────────────────────────────

describe('handleRouteError', () => {
  describe('duck-typed AuthError (toResponse method)', () => {
    it('returns result of toResponse() when error has toResponse method', () => {
      const fakeResponse = { body: 'auth-response', status: 401 };
      const authError = { toResponse: vi.fn(() => fakeResponse) };

      const result = handleRouteError(authError);

      expect(authError.toResponse).toHaveBeenCalledOnce();
      expect(result).toBe(fakeResponse);
    });

    it('does not log when toResponse error is handled', () => {
      const authError = { toResponse: vi.fn(() => ({ status: 401 })) };

      handleRouteError(authError, '[AUTH]');

      expect(mockLogError).not.toHaveBeenCalled();
    });

    it('falls through when toResponse is not a function', async () => {
      const notAuthError = { toResponse: 'not-a-function', message: 'fail' };

      const result = handleRouteError(notAuthError);
      const { body, status } = await parseResponse(result);

      expect(status).toBe(500);
      expect(body.code).toBe('UNKNOWN_ERROR');
    });
  });

  describe('context logging', () => {
    it('logs with context when context is provided', async () => {
      const error = new Error('test error');

      const result = handleRouteError(error, '[TASKS_POST]');

      expect(mockLogError).toHaveBeenCalledWith('[TASKS_POST]', error);
      expect(result.status).toBe(500);
    });

    it('does not log when context is omitted', async () => {
      handleRouteError(new Error('test'));

      expect(mockLogError).not.toHaveBeenCalled();
    });

    it('passes undefined for non-Error values in log', async () => {
      handleRouteError('string-error', '[CTX]');

      expect(mockLogError).toHaveBeenCalledWith('[CTX]', undefined);
    });
  });

  describe('custom AppError subclasses', () => {
    it('handles InsufficientCreditsError with 402', async () => {
      const result = handleRouteError(new InsufficientCreditsError(10, 3));
      const { body, status } = await parseResponse(result);

      expect(status).toBe(HTTP_STATUS.PAYMENT_REQUIRED);
      expect(body.code).toBe(ERROR_CODES.INSUFFICIENT_CREDITS);
      expect(body.details).toEqual(expect.objectContaining({ required: 10, available: 3 }));
    });

    it('handles UnauthorizedError with 401', async () => {
      const result = handleRouteError(new UnauthorizedError());
      const { body, status } = await parseResponse(result);

      expect(status).toBe(HTTP_STATUS.UNAUTHORIZED);
      expect(body.code).toBe(ERROR_CODES.UNAUTHORIZED);
    });

    it('handles ForbiddenError with 403', async () => {
      const result = handleRouteError(new ForbiddenError('no access'));
      const { body, status } = await parseResponse(result);

      expect(status).toBe(HTTP_STATUS.FORBIDDEN);
      expect(body.code).toBe(ERROR_CODES.FORBIDDEN);
    });

    it('handles NotFoundError with 404 and resource details', async () => {
      const result = handleRouteError(new NotFoundError('User', 'abc-123'));
      const { body, status } = await parseResponse(result);

      expect(status).toBe(HTTP_STATUS.NOT_FOUND);
      expect(body.code).toBe(ERROR_CODES.NOT_FOUND);
      expect(body.details).toEqual(
        expect.objectContaining({ resource: 'User', resourceId: 'abc-123' })
      );
    });

    it('handles RateLimitError with 429 and retryAfter', async () => {
      const result = handleRouteError(new RateLimitError('slow down', 60));
      const { body, status } = await parseResponse(result);

      expect(status).toBe(HTTP_STATUS.TOO_MANY_REQUESTS);
      expect(body.details).toEqual(expect.objectContaining({ retryAfter: 60 }));
    });

    it('handles RateLimitError without retryAfter', async () => {
      const result = handleRouteError(new RateLimitError());
      const { status } = await parseResponse(result);

      expect(status).toBe(HTTP_STATUS.TOO_MANY_REQUESTS);
    });

    it('handles ConflictError with 409', async () => {
      const result = handleRouteError(new ConflictError('duplicate', { field: 'email' }));
      const { body, status } = await parseResponse(result);

      expect(status).toBe(HTTP_STATUS.CONFLICT);
      expect(body.code).toBe('CONFLICT');
    });

    it('handles ValidationError with 400', async () => {
      const result = handleRouteError(new ValidationError('invalid input', { field: 'name' }));
      const { body, status } = await parseResponse(result);

      expect(status).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(body.code).toBe(ERROR_CODES.VALIDATION_ERROR);
    });

    it('handles generic AppError with 500', async () => {
      const result = handleRouteError(new AppError('app fail', 'CUSTOM_CODE', { key: 'val' }));
      const { body, status } = await parseResponse(result);

      expect(status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(body.code).toBe('CUSTOM_CODE');
    });
  });

  describe('standard Error objects', () => {
    it('returns 500 with error message', async () => {
      const result = handleRouteError(new Error('something broke'));
      const { body, status } = await parseResponse(result);

      expect(status).toBe(500);
      expect(body.error).toBe('something broke');
      expect(body.code).toBe(ERROR_CODES.INTERNAL_SERVER_ERROR);
    });
  });

  describe('unknown/non-Error throws', () => {
    it('returns 500 with generic message for string', async () => {
      const result = handleRouteError('random string');
      const { body, status } = await parseResponse(result);

      expect(status).toBe(500);
      expect(body.error).toBe('Errore sconosciuto');
      expect(body.code).toBe('UNKNOWN_ERROR');
    });

    it('returns 500 for number', async () => {
      const result = handleRouteError(42);
      const { status } = await parseResponse(result);

      expect(status).toBe(500);
    });

    it('returns 500 for null', async () => {
      const result = handleRouteError(null);
      const { body, status } = await parseResponse(result);

      expect(status).toBe(500);
      expect(body.code).toBe('UNKNOWN_ERROR');
    });

    it('returns 500 for undefined', async () => {
      const result = handleRouteError(undefined);
      const { status } = await parseResponse(result);

      expect(status).toBe(500);
    });
  });

  describe('response structure', () => {
    it('includes timestamp in ISO format', async () => {
      const result = handleRouteError(new Error('test'));
      const { body } = await parseResponse(result);

      expect(body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });
});

// ─── createApiErrorResponse ──────────────────────────────────────────────────

describe('createApiErrorResponse', () => {
  it('returns response object with status', () => {
    const result = createApiErrorResponse('bad input', 'VALIDATION_ERROR', 400);

    expect(result.status).toBe(400);
    expect(result.response.error).toBe('bad input');
    expect(result.response.code).toBe('VALIDATION_ERROR');
    expect(result.response.timestamp).toBeDefined();
  });

  it('includes details when provided', () => {
    const result = createApiErrorResponse('err', 'CODE', 500, { field: 'x' });

    expect(result.response.details).toEqual({ field: 'x' });
  });

  it('omits details when not provided', () => {
    const result = createApiErrorResponse('err', 'CODE', 500);

    expect(result.response.details).toBeUndefined();
  });
});

// ─── createNextErrorResponse ─────────────────────────────────────────────────

describe('createNextErrorResponse', () => {
  it('returns NextResponse with correct status and body', async () => {
    const result = createNextErrorResponse('not found', 'NOT_FOUND', 404);

    expect(result.status).toBe(404);
    const body = (await result.json()) as ApiErrorResponse;
    expect(body.error).toBe('not found');
    expect(body.code).toBe('NOT_FOUND');
  });

  it('includes details in response body', async () => {
    const result = createNextErrorResponse('fail', 'ERR', 500, { hint: 'retry' });

    const body = (await result.json()) as ApiErrorResponse;
    expect(body.details).toEqual({ hint: 'retry' });
  });
});

// ─── mapErrorToApiResponse ───────────────────────────────────────────────────

describe('mapErrorToApiResponse', () => {
  it('maps InsufficientCreditsError correctly', () => {
    const result = mapErrorToApiResponse(new InsufficientCreditsError(5, 2));

    expect(result.status).toBe(402);
    expect(result.response.code).toBe('INSUFFICIENT_CREDITS');
  });

  it('maps UnauthorizedError correctly', () => {
    const result = mapErrorToApiResponse(new UnauthorizedError('no token'));

    expect(result.status).toBe(401);
    expect(result.response.error).toBe('no token');
  });

  it('maps ForbiddenError correctly', () => {
    const result = mapErrorToApiResponse(new ForbiddenError());

    expect(result.status).toBe(403);
  });

  it('maps NotFoundError correctly', () => {
    const result = mapErrorToApiResponse(new NotFoundError('Task'));

    expect(result.status).toBe(404);
    expect(result.response.details).toEqual(expect.objectContaining({ resource: 'Task' }));
  });

  it('maps ConflictError correctly', () => {
    const result = mapErrorToApiResponse(new ConflictError('exists'));

    expect(result.status).toBe(409);
  });

  it('maps ValidationError correctly', () => {
    const result = mapErrorToApiResponse(new ValidationError('bad'));

    expect(result.status).toBe(400);
  });

  it('maps generic AppError to 500', () => {
    const result = mapErrorToApiResponse(new AppError('oops', 'MY_CODE'));

    expect(result.status).toBe(500);
    expect(result.response.code).toBe('MY_CODE');
  });

  it('maps generic Error to 500', () => {
    const result = mapErrorToApiResponse(new Error('generic'));

    expect(result.status).toBe(500);
    expect(result.response.error).toBe('generic');
  });

  it('maps unknown values to 500 with generic message', () => {
    const result = mapErrorToApiResponse({ random: true });

    expect(result.status).toBe(500);
    expect(result.response.error).toBe('Errore sconosciuto');
  });
});

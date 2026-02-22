/**
 * useForm Hook
 *
 * Generic form handling hook with validation
 * Follows KISS, SOLID, DRY principles
 *
 * Eliminates repetitive form state and validation patterns
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { getErrorMessage } from '../utils/error';

export type FieldValidator<T extends object, K extends keyof T = keyof T> = (
  value: T[K],
  allValues?: T
) => string | null;

export interface UseFormOptions<T extends object> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
  validate?: Partial<{ [K in keyof T]: FieldValidator<T, K> }>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  // Controlled mode props
  values?: T;
  onValuesChange?: (values: T) => void;
}

export interface UseFormReturn<T extends object> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setValues: (values: Partial<T>) => void;
  setError: (field: keyof T, error: string | null) => void;
  setTouched: (field: keyof T, touched: boolean) => void;
  handleChange: <K extends keyof T>(field: K) => (value: T[K]) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
  resetField: (field: keyof T) => void;
}

/**
 * Generic form hook with validation
 * Supports both Uncontrolled (internal state) and Controlled (external state) modes.
 */
export function useForm<T extends object>(options: UseFormOptions<T>): UseFormReturn<T> {
  const {
    initialValues,
    onSubmit,
    validate,
    validateOnChange = false,
    validateOnBlur = true,
    values: controlledValues,
    onValuesChange: setControlledValues,
  } = options;

  // Internal state (used only if not controlled)
  const [internalValues, setInternalValues] = useState<T>(initialValues);

  // Determine effective state
  const isControlled = controlledValues !== undefined && setControlledValues !== undefined;
  const values = isControlled ? controlledValues : internalValues;

  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);



  // Helper for partial updates
  const updateValuesPartial = useCallback(
    (partial: Partial<T>) => {
      if (isControlled) {
        setControlledValues({ ...controlledValues, ...partial });
      } else {
        setInternalValues((prev) => ({ ...prev, ...partial }));
      }
    },
    [isControlled, setControlledValues, controlledValues]
  );

  // Validate single field
  const validateField = useCallback(
    <K extends keyof T>(field: K, value: T[K]): string | null => {
      if (!validate || !validate[field]) {
        return null;
      }
      return validate[field]!(value, values);
    },
    [validate, values]
  );

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    if (!validate) return true;

    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const field in validate) {
      const key = field as keyof T;
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [validate, values, validateField]);

  // Check if form is valid
  const isValid = useMemo(() => {
    if (!validate) return true;
    for (const field in validate) {
      const key = field as keyof T;
      const error = validateField(key, values[key]);
      if (error) return false;
    }
    return true;
  }, [validate, values, validateField]);

  // Set single value
  const setValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      updateValuesPartial({ [field]: value } as unknown as Partial<T>);

      if (validateOnChange) {
        const error = validateField(field, value);
        setErrors((prev) => {
          if (error) {
            return { ...prev, [field]: error };
          }
          const { [field]: _, ...rest } = prev;
          return rest as Partial<Record<keyof T, string>>;
        });
      }
    },
    [updateValuesPartial, validateOnChange, validateField]
  );

  // Set multiple values
  const setValuesPartial = useCallback(
    (newValues: Partial<T>) => {
      updateValuesPartial(newValues);
    },
    [updateValuesPartial]
  );

  // Handle field change
  const handleChange = useCallback(
    <K extends keyof T>(field: K) => {
      return (value: T[K]) => {
        setValue(field, value);
      };
    },
    [setValue]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (field: keyof T) => {
      return () => {
        setTouched((prev) => ({ ...prev, [field]: true }));

        if (validateOnBlur) {
          const error = validateField(field, values[field]);
          setErrors((prev) => {
            if (error) {
              return { ...prev, [field]: error };
            }
            const { [field]: _, ...rest } = prev;
            return rest as Partial<Record<keyof T, string>>;
          });
        }
      };
    },
    [validateOnBlur, validateField, values]
  );

  // Handle form submit
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce<Record<keyof T, boolean>>((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Record<keyof T, boolean>);
      setTouched(allTouched);

      // Validate
      if (!validateAll()) {
        return;
      }

      setIsSubmitting(true);
      setErrors({});

      try {
        await onSubmit(values);
        // Reset on success (optional)
      } catch (err: unknown) {
        const errorMessage = getErrorMessage(err);
        setErrors({ _form: errorMessage } as Partial<Record<keyof T, string>>);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateAll, onSubmit]
  );

  // Reset form
  const reset = useCallback(() => {
    if (isControlled) {
      setControlledValues(initialValues);
    } else {
      setInternalValues(initialValues);
    }
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues, isControlled, setControlledValues]);

  // Reset single field
  const resetField = useCallback(
    (field: keyof T) => {
      setValue(field, initialValues[field]);
      setErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest as Partial<Record<keyof T, string>>;
      });
      setTouched((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest as Partial<Record<keyof T, boolean>>;
      });
    },
    [initialValues, setValue]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setValues: setValuesPartial,
    setError: (field, error) => {
      setErrors((prev) => {
        if (error) {
          return { ...prev, [field]: error };
        }
        const { [field]: _, ...rest } = prev;
        return rest as Partial<Record<keyof T, string>>;
      });
    },
    setTouched: (field, touched) => {
      setTouched((prev) => ({ ...prev, [field]: touched }));
    },
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    resetField,
  };
}

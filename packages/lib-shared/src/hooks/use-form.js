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
import { getErrorMessage } from '@onecoach/lib-shared/utils/api-error-handler';
/**
 * Generic form hook with validation
 * Supports both Uncontrolled (internal state) and Controlled (external state) modes.
 */
export function useForm(options) {
    const { initialValues, onSubmit, validate, validateOnChange = false, validateOnBlur = true, values: controlledValues, onValuesChange: setControlledValues, } = options;
    // Internal state (used only if not controlled)
    const [internalValues, setInternalValues] = useState(initialValues);
    // Determine effective state
    const isControlled = controlledValues !== undefined && setControlledValues !== undefined;
    const values = isControlled ? controlledValues : internalValues;
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Helper for partial updates
    const updateValuesPartial = useCallback((partial) => {
        if (isControlled) {
            setControlledValues({ ...controlledValues, ...partial });
        }
        else {
            setInternalValues((prev) => ({ ...prev, ...partial }));
        }
    }, [isControlled, setControlledValues, controlledValues]);
    // Validate single field
    const validateField = useCallback((field, value) => {
        if (!validate || !validate[field]) {
            return null;
        }
        return validate[field](value, values);
    }, [validate, values]);
    // Validate all fields
    const validateAll = useCallback(() => {
        if (!validate)
            return true;
        const newErrors = {};
        let isValid = true;
        for (const field in validate) {
            const key = field;
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
        if (!validate)
            return true;
        for (const field in validate) {
            const key = field;
            const error = validateField(key, values[key]);
            if (error)
                return false;
        }
        return true;
    }, [validate, values, validateField]);
    // Set single value
    const setValue = useCallback((field, value) => {
        updateValuesPartial({ [field]: value });
        if (validateOnChange) {
            const error = validateField(field, value);
            setErrors((prev) => {
                if (error) {
                    return { ...prev, [field]: error };
                }
                const { [field]: _, ...rest } = prev;
                return rest;
            });
        }
    }, [updateValuesPartial, validateOnChange, validateField]);
    // Set multiple values
    const setValuesPartial = useCallback((newValues) => {
        updateValuesPartial(newValues);
    }, [updateValuesPartial]);
    // Handle field change
    const handleChange = useCallback((field) => {
        return (value) => {
            setValue(field, value);
        };
    }, [setValue]);
    // Handle field blur
    const handleBlur = useCallback((field) => {
        return () => {
            setTouched((prev) => ({ ...prev, [field]: true }));
            if (validateOnBlur) {
                const error = validateField(field, values[field]);
                setErrors((prev) => {
                    if (error) {
                        return { ...prev, [field]: error };
                    }
                    const { [field]: _, ...rest } = prev;
                    return rest;
                });
            }
        };
    }, [validateOnBlur, validateField, values]);
    // Handle form submit
    const handleSubmit = useCallback(async (e) => {
        e?.preventDefault();
        // Mark all fields as touched
        const allTouched = Object.keys(values).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
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
        }
        catch (err) {
            const errorMessage = getErrorMessage(err);
            setErrors({ _form: errorMessage });
        }
        finally {
            setIsSubmitting(false);
        }
    }, [values, validateAll, onSubmit]);
    // Reset form
    const reset = useCallback(() => {
        if (isControlled) {
            setControlledValues(initialValues);
        }
        else {
            setInternalValues(initialValues);
        }
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues, isControlled, setControlledValues]);
    // Reset single field
    const resetField = useCallback((field) => {
        setValue(field, initialValues[field]);
        setErrors((prev) => {
            const { [field]: _, ...rest } = prev;
            return rest;
        });
        setTouched((prev) => {
            const { [field]: _, ...rest } = prev;
            return rest;
        });
    }, [initialValues, setValue]);
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
                return rest;
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

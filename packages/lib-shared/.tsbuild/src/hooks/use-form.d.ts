/**
 * useForm Hook
 *
 * Generic form handling hook with validation
 * Follows KISS, SOLID, DRY principles
 *
 * Eliminates repetitive form state and validation patterns
 */
export type FieldValidator<T extends object, K extends keyof T = keyof T> = (value: T[K], allValues?: T) => string | null;
export interface UseFormOptions<T extends object> {
    initialValues: T;
    onSubmit: (values: T) => Promise<void> | void;
    validate?: Partial<{
        [K in keyof T]: FieldValidator<T, K>;
    }>;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
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
export declare function useForm<T extends object>(options: UseFormOptions<T>): UseFormReturn<T>;
//# sourceMappingURL=use-form.d.ts.map
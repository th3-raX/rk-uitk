import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

/** Supported input types */
export type InputType = 'text' | 'email' | 'password' | 'number';

/** Props for the Input component */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Input field type */
  type?: InputType;
  /** Visible label rendered above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
}

/**
 * Input — A form input component with label, error message, and accessibility support.
 * Uses React.forwardRef so parent components can access the underlying input element.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, error, disabled, className, id, ...rest }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const inputClassNames = [
      styles.input,
      error ? styles['input--error'] : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={inputClassNames}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error && (
          <span
            className={styles.errorMessage}
            id={inputId ? `${inputId}-error` : undefined}
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

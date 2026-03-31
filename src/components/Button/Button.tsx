import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Button.module.css';

/** Supported button visual variants */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

/** Supported button sizes */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Props for the Button component */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button is in a loading state (shows spinner) */
  loading?: boolean;
  /** Icon element to render before the label */
  icon?: ReactNode;
  /** Button content */
  children: ReactNode;
}

/**
 * Button — A versatile button component supporting multiple variants, sizes,
 * loading state with spinner, and optional leading icon.
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  children,
  className,
  ...rest
}: ButtonProps) => {
  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    loading ? styles['button--loading'] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span className={styles.spinner} aria-hidden="true">
          <span className={styles.spinnerCircle} />
        </span>
      )}
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

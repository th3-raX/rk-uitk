import { type ReactNode } from 'react';
import styles from './Card.module.css';

/** Card visual variant */
export type CardVariant = 'default' | 'elevated';

/** Props for the Card component */
export interface CardProps {
  /** Optional header content */
  header?: ReactNode;
  /** Main body content */
  children: ReactNode;
  /** Optional footer content */
  footer?: ReactNode;
  /** Visual variant */
  variant?: CardVariant;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Card — A container component with optional header, body, and footer slots.
 * Supports default (bordered) and elevated (shadow) variants with a subtle hover lift.
 */
export const Card = ({
  header,
  children,
  footer,
  variant = 'default',
  className,
}: CardProps) => {
  const classNames = [
    styles.card,
    styles[`card--${variant}`],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classNames}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </article>
  );
};

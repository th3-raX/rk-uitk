import { useState, useRef, useCallback, type ReactNode } from 'react';
import styles from './Tooltip.module.css';

/** Tooltip position relative to the trigger element */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/** Props for the Tooltip component */
export interface TooltipProps {
  /** Text or content to display in the tooltip */
  content: ReactNode;
  /** Which side of the trigger to show the tooltip */
  position?: TooltipPosition;
  /** Delay in ms before showing the tooltip (default: 200) */
  delay?: number;
  /** The trigger element — must be a single child */
  children: ReactNode;
}

/**
 * Tooltip — A small popover shown on hover and focus.
 * Supports 4 positions and a configurable delay. Accessible via focus events.
 */
export const Tooltip = ({
  content,
  position = 'top',
  delay = 200,
  children,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  const tooltipClassNames = [
    styles.tooltip,
    styles[`tooltip--${position}`],
  ].join(' ');

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span className={tooltipClassNames} role="tooltip">
          {content}
        </span>
      )}
    </span>
  );
};

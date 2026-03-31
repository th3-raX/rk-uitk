import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';

/** Toast visual variant */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

/** Represents a single toast notification */
export interface ToastItem {
  /** Unique ID for this toast */
  id: string;
  /** The toast message */
  message: string;
  /** Visual variant */
  variant: ToastVariant;
  /** Auto-dismiss duration in milliseconds */
  duration: number;
}

/** Options when creating a toast */
export interface ToastOptions {
  /** The toast message */
  message: string;
  /** Visual variant */
  variant?: ToastVariant;
  /** Auto-dismiss duration in ms (default: 3000) */
  duration?: number;
}

/** The value returned by useToast hook */
export interface ToastContextValue {
  /** Add a new toast notification */
  addToast: (options: ToastOptions) => void;
  /** Remove a toast by id */
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

/**
 * useToast — Hook for triggering and removing toast notifications.
 * Must be used within a ToastProvider.
 */
export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
};

/** Props for an individual Toast */
interface ToastEntryProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastEntry = ({ toast, onDismiss }: ToastEntryProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast.id, toast.duration, onDismiss]);

  const classNames = [
    styles.toast,
    styles[`toast--${toast.variant}`],
  ].join(' ');

  return (
    <div className={classNames} role="alert" aria-live="assertive">
      <span className={styles.message}>{toast.message}</span>
      <button
        type="button"
        className={styles.dismissButton}
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
};

/** Props for the ToastProvider */
export interface ToastProviderProps {
  /** App content that can use the useToast hook */
  children: ReactNode;
}

/**
 * ToastProvider — Wraps your app to enable toast notifications via the useToast hook.
 * Renders stacked toasts in the top-right corner via a Portal.
 */
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((options: ToastOptions) => {
    const id = `toast-${++toastCounter}`;
    const toast: ToastItem = {
      id,
      message: options.message,
      variant: options.variant ?? 'info',
      duration: options.duration ?? 3000,
    };
    setToasts((prev) => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {createPortal(
        <div className={styles.container}>
          {toasts.map((toast) => (
            <ToastEntry key={toast.id} toast={toast} onDismiss={removeToast} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

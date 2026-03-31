import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import styles from './Dropdown.module.css';

/** A single dropdown option */
export interface DropdownOption {
  /** Display label */
  label: string;
  /** Value associated with this option */
  value: string;
}

/** Props for the Dropdown component */
export interface DropdownProps {
  /** List of selectable options */
  options: DropdownOption[];
  /** Currently selected value (controlled mode) */
  value?: string;
  /** Callback fired when an option is selected */
  onChange?: (value: string) => void;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Custom render function for each option */
  renderOption?: (option: DropdownOption) => ReactNode;
}

/**
 * Dropdown — A select-like component with keyboard navigation, controlled/uncontrolled modes,
 * and a custom option render prop. Supports Arrow keys, Enter, and Escape.
 */
export const Dropdown = ({
  options,
  value: controlledValue,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  renderOption,
}: DropdownProps) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(undefined);
  const currentValue = isControlled ? controlledValue : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === currentValue);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (!isControlled) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
      setIsOpen(false);
      setFocusedIndex(-1);
    },
    [isControlled, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && focusedIndex >= 0) {
            handleSelect(options[focusedIndex].value);
          } else {
            setIsOpen(true);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [disabled, isOpen, focusedIndex, options, handleSelect]
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && menuRef.current) {
      const focusedEl = menuRef.current.children[focusedIndex] as HTMLElement;
      focusedEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex]);

  const triggerClassNames = [
    styles.trigger,
    isOpen ? styles['trigger--open'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper} ref={wrapperRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={triggerClassNames}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption ? (
          <span>{selectedOption.label}</span>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <span className={`${styles.chevron} ${isOpen ? styles['chevron--open'] : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={styles.menu}
          role="listbox"
          aria-activedescendant={focusedIndex >= 0 ? `option-${focusedIndex}` : undefined}
        >
          {options.map((option, index) => {
            const optionClassNames = [
              styles.option,
              index === focusedIndex ? styles['option--focused'] : '',
              option.value === currentValue ? styles['option--selected'] : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={option.value}
                id={`option-${index}`}
                type="button"
                role="option"
                aria-selected={option.value === currentValue}
                className={optionClassNames}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                {renderOption ? renderOption(option) : option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

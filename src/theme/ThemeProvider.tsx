import { createContext, useContext, type ReactNode } from 'react';
import { type Theme, defaultTheme } from './theme';

/** Props for the ThemeProvider component */
export interface ThemeProviderProps {
  /** Partial theme overrides that are merged with default tokens */
  theme?: Partial<Theme>;
  /** App content */
  children: ReactNode;
}

const ThemeContext = createContext<Theme>(defaultTheme);

/**
 * useTheme — Hook to access the current theme values.
 * Returns the full merged theme object.
 */
export const useTheme = (): Theme => {
  return useContext(ThemeContext);
};

/**
 * ThemeProvider — Wraps your app to provide custom CSS variable overrides.
 * Accepts a partial theme object that is merged with defaults and
 * applied as inline CSS custom properties on a wrapper div.
 */
export const ThemeProvider = ({ theme: themeOverrides, children }: ThemeProviderProps) => {
  // Filter undefined from overrides (Partial<Theme> may have undefined values)
  const filteredOverrides: Theme = {};
  if (themeOverrides) {
    for (const [key, value] of Object.entries(themeOverrides) as [string, string | undefined][]) {
      if (value !== undefined) {
        filteredOverrides[key] = value;
      }
    }
  }

  const mergedTheme: Theme = {
    ...defaultTheme,
    ...filteredOverrides,
  };

  // Convert theme tokens to inline CSS custom properties
  const cssVars: Record<string, string> = {};
  for (const [key, value] of Object.entries(mergedTheme)) {
    cssVars[`--${key}`] = value;
  }

  return (
    <ThemeContext.Provider value={mergedTheme}>
      <div style={cssVars as React.CSSProperties}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

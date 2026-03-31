/* Library entry point — re-exports all components and theme system */

export * from './components';
export { ThemeProvider, useTheme } from './theme/ThemeProvider';
export type { ThemeProviderProps } from './theme/ThemeProvider';
export { defaultTheme } from './theme/theme';
export type { Theme } from './theme/theme';

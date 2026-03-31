/** Theme token map — each key corresponds to a CSS custom property name */
export interface Theme {
  [key: string]: string;
}

/** Default theme tokens matching tokens.css values */
export const defaultTheme: Theme = {
  'color-primary-light': 'hsl(214, 100%, 90%)',
  'color-primary': 'hsl(214, 100%, 33%)',
  'color-primary-dark': 'hsl(214, 100%, 23%)',
  'color-secondary-light': 'hsl(240, 52%, 90%)',
  'color-secondary': 'hsl(240, 52%, 62%)',
  'color-secondary-dark': 'hsl(240, 52%, 42%)',
  'color-danger-light': 'hsl(0, 84%, 92%)',
  'color-danger': 'hsl(0, 72%, 51%)',
  'color-danger-dark': 'hsl(0, 72%, 38%)',
  'color-success-light': 'hsl(145, 63%, 90%)',
  'color-success': 'hsl(145, 63%, 42%)',
  'color-success-dark': 'hsl(145, 63%, 30%)',
  'color-warning-light': 'hsl(40, 96%, 90%)',
  'color-warning': 'hsl(40, 96%, 53%)',
  'color-warning-dark': 'hsl(40, 96%, 40%)',
  'color-neutral-light': 'hsl(0, 0%, 96%)',
  'color-neutral-mlight': 'hsl(0, 0%, 86%)',
  'color-neutral': 'hsl(0, 0%, 55%)',
  'color-neutral-mdark': 'hsl(0, 0%, 35%)',
  'color-neutral-dark': 'hsl(0, 0%, 15%)',
  'color-white': 'hsl(0, 0%, 98%)',
  'color-black': 'hsl(0, 0%, 10%)',
  'font-family-sans': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  'font-size-md': '1rem',
  'spacing-md': '1rem',
  'radius-md': '0.5rem',
};

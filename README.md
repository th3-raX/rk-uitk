# @ravi-khatri/ui-kit

> A production-grade React component library with zero runtime dependencies, vanilla CSS Modules, full TypeScript support, and Storybook documentation.

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572B6?logo=css3&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-8-FF4785?logo=storybook&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Tested-6E9F18?logo=vitest&logoColor=white)
![Bundle Size](https://img.shields.io/badge/Bundle-<10KB_gzip-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## Installation

```bash
npm install @ravi-khatri/ui-kit
```

**Peer dependencies:**

```bash
npm install react react-dom
```

---

## Quick Start

```tsx
import { Button, Input, Badge, ThemeProvider } from '@ravi-khatri/ui-kit';
import '@ravi-khatri/ui-kit/styles';

function App() {
  return (
    <ThemeProvider>
      <Button variant="primary" size="md">
        Get Started
      </Button>
      <Input label="Email" placeholder="you@example.com" />
      <Badge variant="success">Active</Badge>
    </ThemeProvider>
  );
}
```

---

## Components

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable the button |
| `icon` | `ReactNode` | — | Leading icon element |
| `children` | `ReactNode` | — | Button label |

### Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number'` | `'text'` | Input type |
| `label` | `string` | — | Visible label |
| `error` | `string` | — | Error message below field |
| `disabled` | `boolean` | `false` | Disable the input |

### Badge

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'success' \| 'danger' \| 'warning' \| 'neutral'` | `'primary'` | Color variant |
| `size` | `'sm' \| 'md'` | `'md'` | Badge size |
| `dismissible` | `boolean` | `false` | Show dismiss button |
| `onDismiss` | `() => void` | — | Dismiss callback |

### Avatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `alt` | `string` | `''` | Alt text |
| `initials` | `string` | — | Fallback initials |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Avatar size |
| `status` | `'online' \| 'offline' \| 'none'` | `'none'` | Status indicator |

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `ReactNode` | — | Header content |
| `children` | `ReactNode` | — | Body content |
| `footer` | `ReactNode` | — | Footer content |
| `variant` | `'default' \| 'elevated'` | `'default'` | Card style |

### Modal

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | Controls visibility |
| `onClose` | `() => void` | — | Close callback |
| `title` | `string` | — | Modal header title |
| `children` | `ReactNode` | — | Modal body |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Width preset |

### Dropdown

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `{ label: string; value: string }[]` | — | Selectable options |
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string) => void` | — | Selection callback |
| `placeholder` | `string` | `'Select an option'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable dropdown |
| `renderOption` | `(option) => ReactNode` | — | Custom option renderer |

### Toast

Uses `ToastProvider` and `useToast` hook:

```tsx
import { ToastProvider, useToast } from '@ravi-khatri/ui-kit';

// Wrap your app
<ToastProvider>
  <App />
</ToastProvider>

// In any child component
const { addToast } = useToast();
addToast({ message: 'Saved!', variant: 'success', duration: 3000 });
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `message` | `string` | — | Toast message |
| `variant` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Visual variant |
| `duration` | `number` | `3000` | Auto-dismiss ms |

### Tooltip

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | — | Tooltip text |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Placement |
| `delay` | `number` | `200` | Show delay in ms |
| `children` | `ReactNode` | — | Trigger element |

### Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `{ key: string; label: string; sortable?: boolean }[]` | — | Column definitions |
| `data` | `Record<string, unknown>[]` | — | Row data |
| `loading` | `boolean` | `false` | Show skeleton |
| `striped` | `boolean` | `false` | Striped rows |

---

## Theme System

Wrap your app with `ThemeProvider` to override design tokens:

```tsx
import { ThemeProvider } from '@ravi-khatri/ui-kit';

<ThemeProvider theme={{ 'color-primary-600': '#8b5cf6' }}>
  <App />
</ThemeProvider>
```

Use the `useTheme` hook to read current values:

```tsx
import { useTheme } from '@ravi-khatri/ui-kit';
const theme = useTheme();
```

---

## Storybook

[📖 Live Storybook Demo](https://your-storybook-url.com) *(placeholder)*

Run locally:

```bash
npm run storybook
```

---

## Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Run tests
npm run test

# Build the library
npm run build

# Check bundle size
npm run size
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-component`
3. Write your component with CSS Module, tests, and stories
4. Ensure all tests pass: `npm run test`
5. Build and verify: `npm run build && npm run size`
6. Submit a pull request

---

## License

MIT © [Ravi Khatri](https://github.com/ravi-khatri)

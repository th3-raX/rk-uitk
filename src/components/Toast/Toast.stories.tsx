import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export { meta as default };

type Story = StoryObj;

const ToastDemo = ({ variant, message }: { variant: 'success' | 'error' | 'warning' | 'info'; message: string }) => {
  const { addToast } = useToast();
  return (
    <Button
      variant={variant === 'error' ? 'danger' : 'primary'}
      onClick={() => addToast({ message, variant })}
    >
      Show {variant} toast
    </Button>
  );
};

/** Success toast */
export const Success: Story = {
  render: () => <ToastDemo variant="success" message="Changes saved successfully!" />,
};

/** Error toast */
export const Error: Story = {
  render: () => <ToastDemo variant="error" message="Failed to save changes." />,
};

/** All variants */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ToastDemo variant="success" message="Operation completed!" />
      <ToastDemo variant="error" message="Something went wrong." />
      <ToastDemo variant="warning" message="Please review your input." />
      <ToastDemo variant="info" message="New features available." />
    </div>
  ),
};

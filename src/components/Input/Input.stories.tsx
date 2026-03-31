import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    disabled: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export { meta as default };

type Story = StoryObj<typeof Input>;

/** Default text input with label */
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

/** Input with error state */
export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'Username is already taken',
    value: 'admin',
  },
};

/** Disabled input */
export const Disabled: Story = {
  args: {
    label: 'API Key',
    value: 'sk-xxxx-xxxx-xxxx',
    disabled: true,
  },
};

/** Password input */
export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

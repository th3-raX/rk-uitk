import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    disabled: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export { meta as default };

type Story = StoryObj<typeof Dropdown>;

const sampleOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Dragonfruit', value: 'dragonfruit' },
  { label: 'Elderberry', value: 'elderberry' },
];

/** Default dropdown */
export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Choose a fruit...',
  },
};

/** Dropdown with pre-selected value */
export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: 'cherry',
  },
};

/** Disabled dropdown */
export const Disabled: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Cannot select',
    disabled: true,
  },
};

/** Dropdown with custom option rendering */
export const CustomRender: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select with emoji',
    renderOption: (option) => (
      <span>🍎 {option.label}</span>
    ),
  },
};

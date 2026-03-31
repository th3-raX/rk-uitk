import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated'],
    },
  },
  tags: ['autodocs'],
};

export { meta as default };

type Story = StoryObj<typeof Card>;

/** Default card with all slots */
export const Default: Story = {
  args: {
    header: 'Card Title',
    children: 'This is the card body content. It supports any React content.',
    footer: 'Card footer',
    variant: 'default',
  },
};

/** Elevated card with shadow */
export const Elevated: Story = {
  args: {
    header: 'Elevated Card',
    children: 'This card uses box-shadow instead of border for a premium feel.',
    variant: 'elevated',
  },
};

/** Card without header or footer */
export const BodyOnly: Story = {
  args: {
    children: 'A simple card with body content only. No header, no footer.',
  },
};

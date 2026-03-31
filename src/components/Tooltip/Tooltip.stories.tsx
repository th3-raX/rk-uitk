import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
  },
  tags: ['autodocs'],
};

export { meta as default };

type Story = StoryObj<typeof Tooltip>;

/** Default tooltip (top) */
export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
    children: <Button>Hover me</Button>,
  },
};

/** All positions */
export const AllPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', padding: '4rem', justifyContent: 'center' }}>
      <Tooltip content="Top tooltip" position="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
    </div>
  ),
};

/** Tooltip with custom delay */
export const WithDelay: Story = {
  args: {
    content: 'Appears after 500ms',
    delay: 500,
    children: <Button>Slow tooltip</Button>,
  },
};

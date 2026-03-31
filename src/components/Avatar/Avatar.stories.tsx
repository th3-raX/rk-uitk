import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline', 'busy'],
    },
  },
  tags: ['autodocs'],
};

export { meta as default };

type Story = StoryObj<typeof Avatar>;

/** Avatar with image */
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'User avatar',
    size: 'md',
  },
};

/** Avatar with initials (no image) */
export const WithInitials: Story = {
  args: {
    initials: 'RK',
    size: 'md',
  },
};

/** All sizes */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar initials="SM" size="sm" />
      <Avatar initials="MD" size="md" />
      <Avatar initials="LG" size="lg" />
    </div>
  ),
};

/** Avatar with all statuses */
export const Status: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="Online user" size="lg" status="online" />
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="Offline user" size="lg" status="offline" />
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="Busy user" size="lg" status="busy" />
    </div>
  ),
};

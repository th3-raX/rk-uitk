import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    loading: { control: 'boolean' },
    striped: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export { meta as default };

type Story = StoryObj<typeof Table>;

const sampleColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: false },
  { key: 'status', label: 'Status', sortable: true },
];

const sampleData = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active' },
  { name: 'Eve Davis', email: 'eve@example.com', role: 'Editor', status: 'Inactive' },
];

/** Default table with sortable columns */
export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

/** Striped table rows */
export const Striped: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
  },
};

/** Loading skeleton */
export const Loading: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    loading: true,
  },
};

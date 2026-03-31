import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  tags: ['autodocs'],
};

export { meta as default };

type Story = StoryObj<typeof Modal>;

/** Default modal with title and content */
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>This is the modal body content. Press Escape or click the backdrop to close.</p>
        </Modal>
      </>
    );
  },
  args: {
    title: 'Modal Title',
    size: 'md',
  },
};

/** Small modal */
export const SmallSize: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Small Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>A compact dialog for confirmations.</p>
        </Modal>
      </>
    );
  },
  args: {
    title: 'Confirm Action',
    size: 'sm',
  },
};

/** Large modal */
export const LargeSize: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Large Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>A larger dialog for detailed content, forms, or media.</p>
        </Modal>
      </>
    );
  },
  args: {
    title: 'Detailed View',
    size: 'lg',
  },
};

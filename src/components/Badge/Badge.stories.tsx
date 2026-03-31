import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "success", "danger", "warning", "neutral"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    dismissible: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export { meta as default };

type Story = StoryObj<typeof Badge>;

/** Default badge */
export const Default: Story = {
  args: {
    children: "Badge",
    variant: "primary",
  },
};

/** All variants */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

/** All sizes */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};

/** Dismissible badge */
export const Dismissible: Story = {
  args: {
    children: "Removable",
    variant: "danger",
    dismissible: true,
    onDismiss: () => alert("Dismissed!"),
  },
};

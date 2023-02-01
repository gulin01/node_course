import React from "react";
import Button from "./Button";
import Center from "../Center/Center";

// story for button component
// Default state for component
// default state for args
// decorate only for this button component
export default {
  title: "form/Button",
  component: Button,
  // decorators: [(story) => <Center>{story()}</Center>],
  // args: {
  //   children: "Button",
  // },
};

export const Primary = () => <Button variant="primary">Primary</Button>;
export const Secondary = () => <Button variant="secondary">Secondary</Button>;
export const Success = () => <Button variant="success">Success</Button>;
export const Danger = () => <Button variant="danger">Danger</Button>;

// const Template = (args) => <Button {...args} />;

// export const PrimaryA = Template.bind({});
// export const SecondaryA = Template.bind({});
// export const LongPrimaryA = Template.bind({});

// PrimaryA.args = {
//   variant: "primary",
//   // children: "Primary",
// };

// SecondaryA.args = {
//   variant: "secondary",
//   // children: "Secondary",
// };

// LongPrimaryA.args = {
//   ...PrimaryA.args,
//   // children: "Long Primary Args",
// };

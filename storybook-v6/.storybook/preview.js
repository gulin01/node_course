// import { addDecorator } from "@storybook/react";
import React from "react";
import { ChakraBaseProvider, CSSReset, Box } from "@chakra-ui/react";
import { ChakraTheme } from "@chakra-ui/theme";
// import Center from "../src/components/Center/Center";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};

// // Center components globally for all story components in v5
// addDecorator((story) => <Center>{story()}</Center>);

export const decorators = [
  (Story) => (
    <ChakraProvider theme={ChakraTheme}>
      <Box m="4">
        <Story />
      </Box>
    </ChakraProvider>
  ),
];

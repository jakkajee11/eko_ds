import React from "react";

import logo from "./logo.svg";
import "./App.css";
import { theme, CSSReset, Box } from "@chakra-ui/core";
import { ThemeProvider } from "@chakra-ui/core";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac"
    }
  }
};

const App: React.FC = ({ children }) => {
  return (
    <Box padding={10} margin={5}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        {children}
      </ThemeProvider>
    </Box>
  );
};

export default App;

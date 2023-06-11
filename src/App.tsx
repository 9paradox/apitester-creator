import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import "./App.css";
import Editor from "./components/Editor";
import AppHeader from "./components/AppHeader";
import { useState } from "react";
import AppFooter from "./components/AppFooter";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppHeader />
        <Editor />
        <AppFooter />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;

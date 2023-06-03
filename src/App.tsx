import { MantineProvider } from "@mantine/core";
import "./App.css";
import Editor from "./components/Editor";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <MantineProvider withNormalizeCSS>
      <AppHeader />
      <Editor />
    </MantineProvider>
  );
}

export default App;

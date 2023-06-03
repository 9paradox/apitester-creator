import { MantineProvider } from "@mantine/core";
import "./App.css";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <p>hello</p>
    </MantineProvider>
  );
}

export default App;

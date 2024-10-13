import { MantineProvider } from "@mantine/core";
import { useState } from "react";
import { AppShell } from "./AppShell";
import theme from "./styles/theme";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <MantineProvider
      theme={theme}
      forceColorScheme={darkMode ? "dark" : "light"}
    >
      <AppShell darkMode={darkMode} setDarkMode={setDarkMode} />
    </MantineProvider>
  );
}

export default App;

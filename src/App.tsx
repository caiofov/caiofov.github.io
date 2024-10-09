import { MantineProvider } from "@mantine/core";
import { useState } from "react";
import { AppShell } from "./AppShell";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <MantineProvider forceColorScheme={darkMode ? "dark" : "light"}>
      <AppShell darkMode={darkMode} setDarkMode={setDarkMode} />
    </MantineProvider>
  );
}

export default App;

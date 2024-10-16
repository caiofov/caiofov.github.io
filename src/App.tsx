import React from "react";
import { MantineProvider } from "@mantine/core";
import theme from "./styles/theme";
import { localStorageColorSchemeManager } from "./stores/schemeManager";
import { Navbar } from "./components/NavBar";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { AppShell } from "@mantine/core";

const colorSchemeManager = localStorageColorSchemeManager();

function App() {
  return (
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
      <AppShell m="0" p="0">
        <Navbar />

        <AppShell.Main p="0" m="0">
          <Home />

          <About />

          <Experience />

          <Projects />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;

import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { MantineProvider, DEFAULT_THEME, AppShell } from "@mantine/core";

function App() {
  return (
    <MantineProvider theme={DEFAULT_THEME} defaultColorScheme="dark">
      <AppShell navbar={{ width: "30%", breakpoint: "sm" }}>
        <Navbar />

        <AppShell.Main>
          <AppShell.Section>
            <Home />
          </AppShell.Section>
          <AppShell.Section>
            <About />
          </AppShell.Section>
          <AppShell.Section>
            <Experience />
          </AppShell.Section>
          <AppShell.Section>
            <Projects />
          </AppShell.Section>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;

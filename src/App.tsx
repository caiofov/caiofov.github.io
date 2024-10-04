// import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { MantineProvider, AppShell, Container } from "@mantine/core";
import { useState } from "react";
import { DarkModeToggle } from "./components/DarkModeToggle";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const ThemeToggle = (
    <DarkModeToggle
      checked={darkMode}
      onChange={() => setDarkMode(!darkMode)}
    />
  );
  return (
    <MantineProvider forceColorScheme={darkMode ? "dark" : "light"}>
      <AppShell navbar={{ width: "30%", breakpoint: "sm" }}>
        <Navbar DarkModeToggle={ThemeToggle} />

        <AppShell.Main p="0">
          <Container
            pt={"5%"}
            ml={"10%"}
            mr={"10%"}
            fluid
            style={{ alignContent: "center" }}
          >
            <Home />

            <About />

            <Experience />

            <Projects />
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;

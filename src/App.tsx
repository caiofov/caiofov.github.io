// import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import {
  MantineProvider,
  DEFAULT_THEME,
  AppShell,
  Container,
} from "@mantine/core";

function App() {
  return (
    <MantineProvider theme={DEFAULT_THEME} defaultColorScheme="dark">
      <AppShell navbar={{ width: "30%", breakpoint: "sm" }}>
        <Navbar />

        <AppShell.Main mt={"5%"} p="0">
          <Container
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

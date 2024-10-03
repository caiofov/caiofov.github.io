import "./App.css";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { MantineProvider, Container, DEFAULT_THEME } from "@mantine/core";

function App() {
  return (
    <MantineProvider theme={DEFAULT_THEME}>
      <NavBar />
      <Container fluid>
        <Home />
        <About />
        <Experience />
        <Projects />
      </Container>
    </MantineProvider>
  );
}

export default App;

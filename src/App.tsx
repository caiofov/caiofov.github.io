import { Container } from "react-bootstrap";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container className="pt-5 mt-5 body-container">
        <Home />
        <About />
        <Experience />
        <Projects />
      </Container>
    </div>
  );
}

export default App;

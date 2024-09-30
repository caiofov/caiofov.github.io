import { Container } from "react-bootstrap";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container className="pt-5 mt-5 body-container">
        <Home />
        <About />
      </Container>
    </div>
  );
}

export default App;

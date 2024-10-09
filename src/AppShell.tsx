import React from "react";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import {
  Container,
  useMatches,
  AppShell as AppShellMantine,
} from "@mantine/core";

export const AppShell: React.FC<{
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}> = ({ darkMode, setDarkMode }) => {
  const ThemeToggle = (
    <DarkModeToggle
      checked={darkMode}
      onChange={() => setDarkMode(!darkMode)}
    />
  );
  const containerMargin = useMatches({ md: "xl", base: "0" });
  return (
    <AppShellMantine navbar={{ width: "30%", breakpoint: "sm" }}>
      <Navbar DarkModeToggle={ThemeToggle} />

      <AppShellMantine.Main p="0" mx={containerMargin}>
        <Container p="0" mx={containerMargin} fluid>
          <Home />

          <About />

          <Experience />

          <Projects />
        </Container>
      </AppShellMantine.Main>
    </AppShellMantine>
  );
};

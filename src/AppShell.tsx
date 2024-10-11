import React from "react";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { AppShell as AppShellMantine } from "@mantine/core";

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

  return (
    <AppShellMantine m="0" p="0">
      <Navbar DarkModeToggle={ThemeToggle} />

      <AppShellMantine.Main p="0" m="0">
        <Home />

        <About />

        <Experience />

        <Projects />
      </AppShellMantine.Main>
    </AppShellMantine>
  );
};

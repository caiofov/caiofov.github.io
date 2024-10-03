import { Anchor, AppShell, Burger, Group } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export const NavbarSections = () => {
  const { t } = useTranslation();
  return (
    <>
      {["home", "about", "experiences", "projects"].map((section) => {
        return (
          <Anchor href={`#${section}`}>{t(`sections.${section}.name`)}</Anchor>
        );
      })}
      <LanguageSelector />
    </>
  );
};

export const Navbar = () => {
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Função para adicionar a sombra e transparência quando der scroll
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <AppShell.Header h={"10%"}>
        <Burger
          hiddenFrom="sm"
          opened={isNavbarOpened}
          onClick={() => setIsNavbarOpened((o) => !o)}
          size="sm"
          mr="xl"
        />
        <Group
          visibleFrom="sm"
          opacity={isScrolled ? "50%" : "100%"}
          style={{ transition: "all 1s ease-in-out" }}
        >
          <NavbarSections />
        </Group>
      </AppShell.Header>

      {isNavbarOpened ? (
        <AppShell.Navbar hidden={!isNavbarOpened}>
          <Group w={{ base: "100%", sm: 0 }}>
            <NavbarSections />
          </Group>
        </AppShell.Navbar>
      ) : null}
    </>
  );
};

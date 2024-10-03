import { Anchor, AppShell, Burger, Group, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { OpacityRevealSequence } from "./animations/OpacityReveal";
import {
  IconBriefcase2,
  IconHome2,
  IconPencil,
  IconUser,
} from "@tabler/icons-react";

const SECTIONS = [
  { label: "home", icon: IconHome2 },
  { label: "about", icon: IconUser },
  { label: "experiences", icon: IconBriefcase2 },
  { label: "projects", icon: IconPencil },
];

export const Navbar = () => {
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

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

  const navbarOpacity = isScrolled ? "50%" : "100%";

  const navbarAnchors = SECTIONS.map((section) => {
    return (
      <Group align="center">
        {/* <section.icon /> */}
        <Anchor key={section.label} href={`#${section.label}`}>
          {t(`sections.${section.label}.name`)}
        </Anchor>
      </Group>
    );
  });

  return (
    <>
      <AppShell.Header
        h={"8%"}
        style={{
          justifyContent: "space-between",
          transition: "all 0.5s ease-in-out",
          alignItems: "center",
        }}
        display="inline-flex"
        pl="5%"
        pr="5%"
        opacity={navbarOpacity}
      >
        <Burger
          hiddenFrom="sm"
          opened={isNavbarOpened}
          onClick={() => setIsNavbarOpened((o) => !o)}
          size="sm"
        />

        <Group>
          <Text visibleFrom="xs">
            {"< "}
            <b>Caio</b>Oliveira{" />"}
          </Text>
          <Text hiddenFrom="xs">
            {"< "}
            <b>C</b>O{" />"}
          </Text>
        </Group>

        <Group visibleFrom="sm" display="flex" justify="space-between">
          {navbarAnchors}
          <LanguageSelector />
        </Group>
      </AppShell.Header>
      {isNavbarOpened ? (
        <AppShell.Navbar
          hidden={!isNavbarOpened}
          w="fit-content"
          pl="5%"
          pr="5%"
          pt="2%"
        >
          <AppShell.Section display="block">
            <Burger
              opened={isNavbarOpened}
              onClick={() => setIsNavbarOpened((o) => !o)}
              size="sm"
              style={{ alignSelf: "end" }}
            />
          </AppShell.Section>
          <AppShell.Section display="block">
            <OpacityRevealSequence
              delayInit={0}
              delayIncrease={0.2}
              children={[...navbarAnchors, <LanguageSelector />]}
            ></OpacityRevealSequence>
          </AppShell.Section>
        </AppShell.Navbar>
      ) : null}
    </>
  );
};

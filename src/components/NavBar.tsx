import {
  AppShell,
  Burger,
  Button,
  Group,
  Text,
  ThemeIcon,
  useMatches,
} from "@mantine/core";
import { useHover, useScrollIntoView, useWindowScroll } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { OpacityRevealSequence } from "./animations/OpacityReveal";

import { SectionIDType, SECTIONS } from "../utils/sections";
import { typedEntries } from "../utils/functions";

export const Navbar: React.FC<{
  DarkModeToggle: JSX.Element;
}> = ({ DarkModeToggle }) => {
  const { t } = useTranslation();

  const [isNavbarOpened, setIsNavbarOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionIDType>("home");

  const { hovered, ref } = useHover();
  const [scroll, scrollTo] = useWindowScroll();

  const headerOpacity = hovered || !isScrolled ? "100%" : "70%";

  const headerItemsGap = useMatches({
    lg: "xl",
    md: "sm",
    base: "xs",
  });

  const scrollParams = {
    offset: 100,
  };

  const sectionsScrolls: Record<
    SectionIDType,
    ReturnType<typeof useScrollIntoView<HTMLDivElement>>
  > = {
    projects: useScrollIntoView<HTMLDivElement>(scrollParams),
    experiences: useScrollIntoView<HTMLDivElement>(scrollParams),
    about: useScrollIntoView<HTMLDivElement>(scrollParams),
    home: useScrollIntoView<HTMLDivElement>(scrollParams),
  };

  const scrollToSection = (section: SectionIDType) => {
    sectionsScrolls[section].scrollIntoView();
  };

  useEffect(() => {
    const splittedUrl = window.location.href.split("#");
    if (splittedUrl.length > 1) {
      setActiveSection(splittedUrl.pop()! as SectionIDType);
      scrollToSection(activeSection);
    }

    Object.entries(sectionsScrolls).map(([id, scrollHook]) => {
      scrollHook.targetRef.current = document.getElementById(
        id
      ) as HTMLDivElement;
    });
  }, []);

  useEffect(() => {
    setIsScrolled(scroll.y > 50);
    for (const [id, { targetRef }] of typedEntries(sectionsScrolls)) {
      if (scroll.y >= targetRef.current.offsetTop - scrollParams.offset - 10) {
        setActiveSection(id);
        break;
      }
    }
  }, [scroll]);

  const navbarAnchors = SECTIONS.map((section) => {
    const isActive = activeSection === section.id;
    return (
      <Button
        key={section.id}
        leftSection={
          <ThemeIcon size="sm" variant="subtle">
            <section.icon stroke={isActive ? "2.5" : "1.8"} />
          </ThemeIcon>
        }
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(section.id);
        }}
        variant={isActive ? "light" : "subtle"}
        radius="xl"
        size="md"
      >
        <Text fw={isActive ? "bold" : "normal"}>
          {t(`sections.${section.id}.name`)}
        </Text>
      </Button>
    );
  });

  return (
    <>
      <AppShell.Header
        h="fit-content"
        p="md"
        px="xl"
        style={{
          justifyContent: "space-between",
          transition: "all 0.5s ease-in-out",
          alignItems: "center",
        }}
        display="inline-flex"
        opacity={headerOpacity}
        ref={ref}
      >
        <Burger
          hiddenFrom="md"
          opened={isNavbarOpened}
          onClick={() => setIsNavbarOpened((o) => !o)}
          size="sm"
        />

        <Group visibleFrom="xs">
          <Text size="xl">
            {"< "}
            <b>Caio</b>Oliveira{" />"}
          </Text>
          <Group hiddenFrom="md">{DarkModeToggle}</Group>
        </Group>
        <Group hiddenFrom="xs">
          <Text size="xl">
            {"< "}
            <b>C</b>O{" />"}
          </Text>
          {DarkModeToggle}
        </Group>

        <Group
          visibleFrom="md"
          gap={headerItemsGap}
          display="flex"
          justify="space-between"
        >
          {navbarAnchors}
          <Group gap="xs">
            <LanguageSelector />
            {DarkModeToggle}
          </Group>
        </Group>
      </AppShell.Header>
      {isNavbarOpened ? (
        <AppShell.Navbar
          hidden={!isNavbarOpened}
          w="fit-content"
          px="xl"
          pt="md"
          h="100%"
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
              children={[
                ...navbarAnchors,
                <LanguageSelector key="lang-selector" />,
              ]}
            ></OpacityRevealSequence>
          </AppShell.Section>
        </AppShell.Navbar>
      ) : null}
    </>
  );
};

import {
  AppShell,
  Burger,
  Button,
  Group,
  Text,
  ThemeIcon,
  useMatches,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
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

export const Navbar: React.FC<{
  DarkModeToggle: JSX.Element;
}> = ({ DarkModeToggle }) => {
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("home");
  const { hovered, ref } = useHover();
  const navbarOpacity = hovered || !isScrolled ? "100%" : "70%";

  const headerItemsGap = useMatches({
    lg: "xl",
    md: "sm",
    base: "xs",
  });

  let sectionElements: HTMLElement[] = [];

  const getSectionScrollY = (sec: HTMLElement) =>
    sec.offsetTop - (ref.current?.clientHeight ?? 0) - 20;
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);

    if (!isScrolling)
      for (const section of sectionElements) {
        if (window.scrollY > getSectionScrollY(section)) {
          setActiveSection(section.id);
          break;
        }
      }
  };

  const scrollToSection = (section: string) => {
    setIsScrolling(true);
    const secElement = sectionElements.filter(({ id }) => id == section)[0];
    if (secElement) {
      window.scrollTo({
        top: getSectionScrollY(secElement),
        behavior: "smooth",
      });
    }
    setIsScrolling(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const splittedUrl = window.location.href.split("#");
    if (splittedUrl.length > 1) {
      setActiveSection(splittedUrl.pop()!);
      scrollToSection(activeSection);
    }

    sectionElements = SECTIONS.map(
      ({ label }) => document.getElementById(label)!
    )
      .sort((a, b) => {
        return a.offsetTop > b.offsetTop
          ? 1
          : b.offsetTop > a.offsetTop
          ? -1
          : 0;
      })
      .reverse();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarAnchors = SECTIONS.map((section) => {
    const isActive = activeSection === section.label;
    return (
      <Button
        key={section.label}
        leftSection={
          <ThemeIcon size="sm" variant="subtle">
            <section.icon stroke={isActive ? "2.5" : "1.8"} />
          </ThemeIcon>
        }
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(section.label);
          setActiveSection(section.label);
        }}
        variant={isActive ? "light" : "subtle"}
        radius="xl"
        size="md"
      >
        <Text fw={isActive ? "bold" : "normal"}>
          {t(`sections.${section.label}.name`)}
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
        opacity={navbarOpacity}
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

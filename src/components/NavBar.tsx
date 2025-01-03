import {
  AppShell,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Text,
  ThemeIcon,
  useMatches,
} from "@mantine/core";
import {
  useDisclosure,
  useScrollIntoView,
  useWindowScroll,
} from "@mantine/hooks";
import { useEffect, useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { OpacityRevealSequence } from "./animations/reveal/OpacityReveal";

import { SectionIDType, SECTIONS, sectionWidth } from "../utils/sections";
import { typedEntries } from "../utils/functions";
import { DarkModeToggle } from "./DarkModeToggle";

export const Navbar = () => {
  const { t } = useTranslation();
  const [navbarOpened, { open, close }] = useDisclosure(false);

  const [activeSection, setActiveSection] = useState<SectionIDType>(() => {
    const splittedUrl = window.location.href.split("#");

    if (splittedUrl.length > 1) {
      const section = splittedUrl.pop()! as SectionIDType;
      if (SECTIONS.map((value) => value.id).includes(section)) return section;
    }
    return "home";
  });

  const scroll = useWindowScroll()[0];

  const headerHeight = useMatches({ md: 68, sm: 65, base: 130 });
  const logoSize = useMatches({ sm: "1.8rem", base: "1.2rem" });

  const bodyContainerWidth = useMatches(sectionWidth);
  const scrollParams = {
    offset: headerHeight,
    duration: 500,
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
    scrollToSection(activeSection);
    typedEntries(sectionsScrolls).forEach(([id, scrollHook]) => {
      scrollHook.targetRef.current = document.getElementById(
        id
      ) as HTMLDivElement;
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    for (const [id, { targetRef }] of typedEntries(sectionsScrolls)) {
      if (scroll.y >= targetRef.current.offsetTop - 2 * headerHeight) {
        setActiveSection(id);
        break;
      }
    }
    // eslint-disable-next-line
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
          close();
        }}
        variant={isActive ? "light" : "subtle"}
        radius="md"
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        <Text>{t(`sections.${section.id}.name`)}</Text>
      </Button>
    );
  });

  return (
    <>
      <AppShell.Header
        h="fit-content"
        px="0"
        py="md"
        display="inline-flex"
        w="100%"
        withBorder={false}
      >
        <Container
          p="0"
          w={bodyContainerWidth}
          fluid
          display="flex"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: logoSize }} variant="gradient" fw="bold">
            CaioOliveira
          </Text>
          <Group>
            <Group
              visibleFrom="md"
              gap="xs"
              display="flex"
              justify="space-between"
            >
              <nav>
                <Group gap="xs" display="flex" justify="space-between">
                  {navbarAnchors}
                </Group>
              </nav>
            </Group>

            <Group gap="xs">
              <DarkModeToggle />
              <LanguageSelector />
              <Burger
                hiddenFrom="md"
                color="var(--mantine-primary-color-light-color)"
                opened={false}
                onClick={() => (navbarOpened ? close() : open())}
                size="sm"
                w="fit-content"
                p="0"
              />
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <Drawer
        opened={navbarOpened}
        onClose={close}
        position="right"
        overlayProps={{ backgroundOpacity: 0, blur: 4 }}
        size="fit-content"
        styles={{
          header: { backgroundColor: "transparent" },
        }}
      >
        <nav>
          <OpacityRevealSequence
            staggerChildren={0.2}
            parentProps={{
              style: { flexDirection: "column" },
              gap: "xl",
              align: "flex-end",
              ml: "xs",
              mr: "sm",
            }}
          >
            {navbarAnchors}
          </OpacityRevealSequence>
        </nav>
      </Drawer>
    </>
  );
};

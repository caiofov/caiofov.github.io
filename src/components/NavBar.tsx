import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { Anchor, Container, Group, Text } from "@mantine/core";

export const NavBar = () => {
  const { t } = useTranslation();
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
    <Container>
      <nav className={isScrolled ? "navbar-scrolled" : ""}>
        <Container>
          <Text className="me-auto">
            {"< Caio"}
            <b>Oliveira</b>
            {" />"}
          </Text>

          <Group align="center">
            {["home", "about", "experiences", "projects"].map((section) => {
              return (
                <Anchor href={`#${section}`}>
                  {t(`sections.${section}.name`)}
                </Anchor>
              );
            })}
            <LanguageSelector />
          </Group>
        </Container>
      </nav>
    </Container>
  );
};

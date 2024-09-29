import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";

export const NavBar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Função para adicionar a sombra e transparência quando der scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="sm"
      fixed="top"
      className={isScrolled ? "navbar-scrolled" : ""}
    >
      <Container>
        <Navbar.Brand className="me-auto">
          {"< Caio"}
          <b>Oliveira</b>
          {" />"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggle-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav justify-content-end">
          <Nav className="ms-auto">
            <Nav.Link className="active" href="#home">
              {t("sections.home")}
            </Nav.Link>
            <Nav.Link href="#about-me">{t("sections.about")}</Nav.Link>
            <Nav.Link href="#experiences">{t("sections.experiences")}</Nav.Link>
            <Nav.Link href="#projects">{t("sections.projects")}</Nav.Link>
            <LanguageSelector />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

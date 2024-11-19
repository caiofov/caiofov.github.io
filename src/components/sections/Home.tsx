import React from "react";
import { useTranslation } from "react-i18next";
import { PopRevealSequence } from "../animations/reveal/PopReveal";
import { Group, Title, useMatches } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { CopyTooltip, IconTooltip } from "../IconTooltip";
import { Typing } from "../animations/Typing";
import { sectionPaddingX } from "../../utils/sections";
import Network from "../animations/Network";
import { DownloadCV } from "../DownloadCV";
import useWindowDimensions from "../../hooks/windowDimension";
import {
  Css3Plain,
  DjangoPlain,
  FastapiPlain,
  Html5Plain,
  JavascriptPlain,
  MongodbPlain,
  MysqlOriginal,
  NodejsPlain,
  PostgresqlPlain,
  PythonPlain,
  ReactOriginal,
  SveltePlain,
  TypescriptPlain,
} from "devicons-react";
import { CustomTooltip } from "../CustomTooltip";
import { LattesIcon } from "../icons/LattesIcon";

const contactInfo = [
  {
    href: "https://www.linkedin.com/in/caio-oliveira1312/",
    icon: IconBrandLinkedin,
    text: "LinkedIn",
  },
  {
    href: "https://www.github.com/caiofov",
    icon: IconBrandGithub,
    text: "GitHub",
  },
  {
    href: "http://lattes.cnpq.br/5552876897987921",
    text: "Lattes",
    icon: LattesIcon,
  },
  {
    text: "cfoviana@gmail.com",
    icon: IconMail,
    ariaLabel: "email",
  },
];

const skillIcons = [
  { id: "python", Icon: PythonPlain },
  { id: "fastapi", Icon: FastapiPlain },
  { id: "django", Icon: DjangoPlain },
  { id: "ts", Icon: TypescriptPlain },
  { id: "js", Icon: JavascriptPlain },
  { id: "node", Icon: NodejsPlain },
  // { id: "ExpressJS", Icon: ? }, //TODO: find icon
  { id: "mongo", Icon: MongodbPlain },
  { id: "postgres", Icon: PostgresqlPlain },
  { id: "mysql", Icon: MysqlOriginal }, //TODO: fix fill for this icon
  { id: "react", Icon: ReactOriginal },
  { id: "svelte", Icon: SveltePlain },
  { id: "html", Icon: Html5Plain },
  { id: "css", Icon: Css3Plain },
];

export const Home = () => {
  const { t } = useTranslation();
  const iconSize = (text: string) => (text === "Lattes" ? "2.18rem" : "2.5rem");
  const [titleFontSize, subtitleFontSize, animationLeft] = useMatches({
    md: ["7rem", "2rem", "20%"],
    sm: ["6rem", "1.8rem", "5%"],
    base: ["5rem", "1.5rem"],
  });
  const px = useMatches(sectionPaddingX);
  const { height, width } = useWindowDimensions();

  return (
    <Group
      component="section"
      variant="main-section"
      id="home"
      m="0"
      px={px}
      align="center"
      mih="100vh"
      display="flex"
    >
      <Group
        style={{
          zIndex: "2",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        gap="xs"
      >
        <Group
          id="home-title"
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          mb="md"
        >
          <Title style={{ fontSize: titleFontSize }}>
            <Typing text="Caio Oliveira" duration={100} />
          </Title>
          <Title
            order={2}
            style={{
              fontSize: subtitleFontSize,
            }}
          >
            <Typing text={t("sections.home.role")} duration={50} delay={800} />
          </Title>
        </Group>

        <Group id="contact-info" pb="lg" gap="xs">
          <PopRevealSequence parentProps={{ gap: "xs" }}>
            {contactInfo.map(({ href, icon, text }) => {
              const size = iconSize(text);
              return href ? (
                <IconTooltip
                  key={text}
                  href={href}
                  Icon={icon}
                  tooltip={text}
                  iconProps={{ size }}
                  actionIconProps={{ size: iconSize("") }}
                />
              ) : (
                <CopyTooltip
                  key={text}
                  Icon={icon}
                  tooltip={text}
                  copyValue={text}
                  copiedTooltip={`(${t("sections.home.copied")})`}
                  iconProps={{ size }}
                  actionIconProps={{ size: iconSize("") }}
                />
              );
            })}
            <DownloadCV iconSize={iconSize("")} />
          </PopRevealSequence>
        </Group>

        {/* <OpacityRevealSequence delay={1}>
          <Text size="lg" w="80%">
            {t("sections.home.text")}
          </Text>
        </OpacityRevealSequence> */}
        <PopRevealSequence staggerChildren={0.2}>
          {skillIcons.map(({ id, Icon }) => (
            <CustomTooltip key={id} label={t(`skills.${id}`)} position="bottom">
              <Group className="devicon">
                <Icon size="25" />
              </Group>
            </CustomTooltip>
          ))}
        </PopRevealSequence>
      </Group>
      <Group
        pos="absolute"
        display="flex"
        justify="flex-end"
        style={{ zIndex: "1" }}
        w="80%"
        left={animationLeft}
      >
        <Network
          color="var(--mantine-primary-color-light-color)"
          width={width * 0.8}
          height={height}
        />
      </Group>
    </Group>
  );
};

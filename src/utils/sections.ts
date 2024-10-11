import {
  getGradient,
  MantineColorScheme,
  MantineTheme,
  useMantineTheme,
} from "@mantine/core";
import {
  Icon,
  IconBriefcase2,
  IconHome2,
  IconPencil,
  IconUser,
} from "@tabler/icons-react";

export type SectionIDType = "home" | "about" | "experiences" | "projects";
export const SECTIONS: { id: SectionIDType; icon: Icon }[] = [
  { id: "home", icon: IconHome2 },
  { id: "about", icon: IconUser },
  { id: "experiences", icon: IconBriefcase2 },
  { id: "projects", icon: IconPencil },
];

export const getSectionBackground = (
  darkToLight: boolean,
  scheme: MantineColorScheme
) => {
  const deg = darkToLight ? 180 : 360;
  const colorPrimary =
    scheme === "dark"
      ? "var(--mantine-color-customDark-9)"
      : "var(--mantine-color-customLight-1)";
  const colorSecondary =
    scheme === "dark"
      ? "var(--mantine-color-customDark-8)"
      : "var(--mantine-color-customLight-2)";
  return `linear-gradient(${deg}deg, ${colorPrimary} 45%, ${colorSecondary} 97%)`;
};

export const sectionWidth = {
  lg: "80%",
  base: "90%",
};

export const sectionPaddingX = {
  lg: "10%",
  md: "5%",
};

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

export const sectionWidth = {
  lg: "80%",
  base: "90%",
};

export const sectionPaddingX = {
  lg: "10%",
  base: "5%",
};

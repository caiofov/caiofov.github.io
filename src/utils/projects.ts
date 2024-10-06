import {
  IconCode,
  IconDeviceGamepad,
  IconFloatCenter,
  IconPaperclip,
  IconStackMiddle,
  IconWorld,
} from "@tabler/icons-react";
import projs from "../assets/projects.json";

export const PROJECTS = projs;
export type ProjectType = (typeof PROJECTS)[keyof typeof PROJECTS];

export const ANCHOR_ICONS = {
  repo: IconCode,
  paper: IconPaperclip,
  game: IconDeviceGamepad,
  site: IconWorld,
  back: IconStackMiddle,
  front: IconFloatCenter,
};

export type AnchorType = {
  text: string;
  link: string;
  type: keyof typeof ANCHOR_ICONS;
};

export type CompleteProjectType = {
  title: string;
  text: string;
  anchorsMapped: AnchorType[];
} & ProjectType;

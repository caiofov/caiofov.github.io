import {
  Icon,
  IconBrowser,
  IconDatabase,
  IconSchool,
  IconServer2,
} from "@tabler/icons-react";
import sections from "../assets/about.json";

export type SectionType = keyof typeof sections;

export const SECTION_ICONS: { [K in SectionType]: Icon } = {
  ufc: IconSchool,
  backend: IconServer2,
  frontend: IconBrowser,
  database: IconDatabase,
};

export const ABOUT_SECTIONS: { [K in SectionType]: string[] } = sections;

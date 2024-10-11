import { MantineStyleProp } from "@mantine/core";
import exp from "../assets/experiences.json";
import {
  Icon,
  IconBrowser,
  IconDeviceDesktop,
  IconMessageChatbot,
} from "@tabler/icons-react";

export type CompanyIDType = keyof typeof exp;
interface Experience {
  id: CompanyIDType;
  name: string;
  activities: Record<string, string[]>;
}

export const EXPERIENCES = exp as unknown as {
  [K in CompanyIDType]: Experience;
};

export const EXPERIENCE_ICONS: { [K in CompanyIDType]: Icon } = {
  milenio: IconDeviceDesktop,
  ckl: IconMessageChatbot,
  codijr: IconBrowser,
};

export const activeExperienceStyle: MantineStyleProp = {
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
};
export const experienceStyle: MantineStyleProp = {
  transition: "all 0.3s ease-in-out",
  opacity: "70%",
};

export const bulletStyle: React.CSSProperties = {
  opacity: "50%",
  transition: "all 0.3s ease-in-out",
};

export const activeBulletStyle: React.CSSProperties = {
  cursor: "pointer",
  opacity: "100%",
  transition: "all 0.3s ease-in-out",
};

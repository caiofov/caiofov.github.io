import {
  ThemeIcon,
  Timeline,
  Text,
  Group,
  Title,
  ScrollArea,
} from "@mantine/core";
import {
  Icon,
  IconBrowser,
  IconDeviceDesktop,
  IconMessageChatbot,
} from "@tabler/icons-react";
import { useHover } from "@mantine/hooks";
import {
  activeBulletStyle,
  activeExperienceStyle,
  bulletStyle,
  experienceStyle,
} from "../styles/experience";
import { useTranslation } from "react-i18next";
import EXPERIENCES from "../assets/experiences.json";
import { RefObject, useRef } from "react";

export const EXPERIENCE_ICONS = {
  milenio: IconDeviceDesktop,
  ckl: IconMessageChatbot,
  codijr: IconBrowser,
};

export type CompanyType = keyof typeof EXPERIENCES;
export type ExperienceType =
  keyof (typeof EXPERIENCES)[CompanyType]["experiences"];

const ExperienceTitleDesktop: React.FC<{
  company: string;
  start: string;
  end: string;
  role: string;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  Bullet: Icon;
}> = ({ company, start, end, role, active, onClick, Bullet }) => {
  const { hovered, ref } = useHover();
  const isActiveOrHovered = hovered || active;
  const style = isActiveOrHovered ? activeExperienceStyle : experienceStyle;
  const bullet = isActiveOrHovered ? activeBulletStyle : bulletStyle;

  return (
    <Timeline.Item
      bullet={
        <ThemeIcon
          variant={active ? "gradient" : "transparent"}
          size="lg"
          radius="lg"
          style={bullet}
        >
          <Bullet />
        </ThemeIcon>
      }
      onClick={onClick}
      ref={ref}
      style={style}
      title={role}
    >
      <Text>{company}</Text>
      <Text c="dimmed">
        {start} - {end}
      </Text>
    </Timeline.Item>
  );
};

const ExperienceTitleMobile: React.FC<{
  company: string;
  start: string;
  end: string;
  role: string;
  active: boolean;
  onClick: (ref: HTMLDivElement) => void;
  Bullet: Icon;
}> = ({ company, start, end, role, active, onClick, Bullet }) => {
  const { hovered, ref } = useHover();
  const isActiveOrHovered = hovered || active;
  const style = isActiveOrHovered ? activeExperienceStyle : experienceStyle;
  const bullet = isActiveOrHovered ? activeBulletStyle : bulletStyle;
  return (
    <Group
      display="inline-flex"
      w="fit-content"
      onClick={() => {
        onClick(ref.current!);
      }}
      ref={ref}
      align="center"
      wrap="nowrap"
      gap="xs"
      mx="sm"
      style={style}
    >
      <ThemeIcon
        variant={active ? "gradient" : "transparent"}
        size="lg"
        radius="lg"
        style={bullet}
      >
        <Bullet />
      </ThemeIcon>
      <Group display="block" wrap="nowrap">
        <Title textWrap="nowrap" order={5}>
          {role}
        </Title>
        <Text style={{ textWrap: "nowrap" }}>{company}</Text>
        <Text c="dimmed" style={{ textWrap: "nowrap" }}>
          {start} - {end}
        </Text>
      </Group>
    </Group>
  );
};
const ExperienceTimelineDesktop: React.FC<{
  changeActive: (idx: number) => void;
  activeIdx: number;
}> = ({ changeActive, activeIdx }) => {
  const { t } = useTranslation();

  return (
    <Timeline
      h="100%"
      active={activeIdx + 1}
      bulletSize={30}
      lineWidth={2}
      style={{ alignItems: "stretch" }}
    >
      {Object.keys(EXPERIENCES).map((c, idx) => {
        const company = c as CompanyType;
        return (
          <ExperienceTitleDesktop
            key={company}
            company={EXPERIENCES[company as CompanyType].name}
            start={t(`sections.experiences.${company}.start`)}
            end={t(`sections.experiences.${company}.end`)}
            role={t(`sections.experiences.${company}.role`)}
            active={idx === activeIdx}
            onClick={(e) => {
              e.preventDefault();
              changeActive(idx);
            }}
            Bullet={EXPERIENCE_ICONS[company]}
          />
        );
      })}
    </Timeline>
  );
};

const ExperienceTimelineMobile: React.FC<{
  changeActive: (idx: number) => void;
  activeIdx: number;
}> = ({ changeActive, activeIdx }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ScrollArea
      viewportRef={ref}
      w="90%"
      scrollbars="x"
      type="always"
      p="md"
      pb="xl"
    >
      <Group display="inline-flex" wrap="nowrap">
        {Object.keys(EXPERIENCES).map((c, idx) => {
          const company = c as CompanyType;
          return (
            <ExperienceTitleMobile
              key={company}
              company={EXPERIENCES[company as CompanyType].name}
              start={t(`sections.experiences.${company}.start`)}
              end={t(`sections.experiences.${company}.end`)}
              role={t(`sections.experiences.${company}.role`)}
              active={idx === activeIdx}
              onClick={(groupRef) => {
                ref.current!.scrollTo({
                  left: groupRef.offsetLeft - 30,
                  behavior: "smooth",
                });
                changeActive(idx);
              }}
              Bullet={EXPERIENCE_ICONS[company]}
            />
          );
        })}
      </Group>
    </ScrollArea>
  );
};

export const ExperienceTimeline: React.FC<{
  changeActive: (idx: number) => void;
  activeIdx: number;
  isMobile: boolean;
}> = ({ changeActive, activeIdx, isMobile }) => {
  const Component = isMobile
    ? ExperienceTimelineMobile
    : ExperienceTimelineDesktop;
  return <Component changeActive={changeActive} activeIdx={activeIdx} />;
};

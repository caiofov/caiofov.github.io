import {
  ThemeIcon,
  Timeline,
  Text,
  Group,
  Title,
  ScrollArea,
} from "@mantine/core";
import { Icon } from "@tabler/icons-react";
import { useHover } from "@mantine/hooks";
import {
  activeBulletStyle,
  activeExperienceStyle,
  bulletStyle,
  EXPERIENCE_ICONS,
  EXPERIENCES,
  experienceStyle,
} from "../utils/experience";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { typedKeys } from "../utils/functions";
import useWindowDimensions from "../hooks/windowDimension";

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

  return (
    <Timeline.Item
      bullet={
        <ThemeIcon
          variant={active ? "gradient" : hovered ? "light" : "subtle"}
          size="40"
          radius="lg"
        >
          <Bullet size="35" />
        </ThemeIcon>
      }
      onClick={onClick}
      ref={ref}
      title={<Title order={3}>{role}</Title>}
      my="xl"
      variant={active ? "selected" : "deselected"}
    >
      <Text size="xl">{company}</Text>
      <Text size="lg" c="dimmed">
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
        variant={active ? "gradient" : hovered ? "light" : "subtle"}
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
      active={activeIdx}
      bulletSize={40}
      lineWidth={4}
      variant="custom-light"
    >
      {typedKeys(EXPERIENCES).map((company, idx) => {
        return (
          <ExperienceTitleDesktop
            key={company}
            company={EXPERIENCES[company].name}
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
  const { height, width } = useWindowDimensions();

  return (
    <ScrollArea
      viewportRef={ref}
      w={width * 0.9}
      scrollbars="x"
      type="always"
      py="md"
      pt="md"
      pb="xl"
    >
      <Group display="inline-flex" wrap="nowrap">
        {typedKeys(EXPERIENCES).map((company, idx) => {
          return (
            <ExperienceTitleMobile
              key={company}
              company={EXPERIENCES[company].name}
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

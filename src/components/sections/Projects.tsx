import {
  Card,
  Group,
  Title,
  Image,
  Text,
  Badge,
  Grid,
  GridCol,
  useMatches,
} from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { typedKeys } from "../../utils/functions";
import {
  ANCHOR_ICONS,
  AnchorType,
  CompleteProjectType,
  PROJECTS,
  ProjectType,
} from "../../utils/projects";
import { IconTooltip } from "../IconTooltip";
import { useMantineColorScheme } from "@mantine/core";
import { OpacityRevealOnVisible } from "../animations/reveal/OpacityReveal";

const ProjectItem: React.FC<{ project: CompleteProjectType }> = ({
  project,
}) => {
  const scheme = useMantineColorScheme();
  const imgOpacity = scheme.colorScheme === "dark" ? "80%" : "100%";

  return (
    <Card
      p="xl"
      shadow="xl"
      radius="lg"
      h="100%"
      w="100%"
      style={{
        justifyContent: "space-between",
      }}
      mt="lg"
      variant="custom-light"
      withBorder
    >
      <Card.Section>
        {"img" in project && project["img"].length > 0 ? (
          <Image
            radius="xl"
            src={project.img}
            height={300}
            opacity={imgOpacity}
          />
        ) : null}
        <Title mt="md" mb="sm" order={4}>
          {project.title}
        </Title>
        <Group mb="md" justify="flex-start" gap="xs">
          {project.techs.sort().map((tech) => {
            return (
              <Badge key={tech} radius="sm" mr="xs" size="sm" variant="light">
                {tech}
              </Badge>
            );
          })}
        </Group>
      </Card.Section>

      <Card.Section>
        <Text>{project.text}</Text>
      </Card.Section>

      <Card.Section>
        <Group display="flex" justify="flex-end">
          {project.anchorsMapped.map((anchor) => {
            const AnchorIcon = ANCHOR_ICONS[anchor.type];

            return (
              <IconTooltip
                key={anchor.link}
                tooltip={anchor.text}
                Icon={AnchorIcon}
                href={anchor.link}
              />
            );
          })}
        </Group>
      </Card.Section>
    </Card>
  );
};

export const Projects = () => {
  const { t } = useTranslation();

  const getProjectAnchors = (proj: ProjectType) => {
    return typedKeys(proj.anchors).map((anchorType) => {
      return {
        text: t(`sections.projects.anchors.${anchorType}`),
        link: proj.anchors[anchorType as keyof typeof proj.anchors],
        type: anchorType,
      } as AnchorType;
    });
  };
  const justify = useMatches({
    md: "flex-start",
    base: "center",
  });

  return (
    <Section id="projects" text={t("sections.projects.name")}>
      <Grid gutter="xl" align="stretch" justify={justify}>
        {typedKeys(PROJECTS).map((key) => {
          const proj = PROJECTS[key];
          return (
            <GridCol key={key} span={{ lg: 4, md: 6, xs: 10 }}>
              <OpacityRevealOnVisible
                parentProps={{ style: { height: "100%" } }}
              >
                <ProjectItem
                  project={{
                    ...proj,
                    title: t(`sections.projects.${key}.title`),
                    text: t(`sections.projects.${key}.text`),
                    anchorsMapped: getProjectAnchors(proj),
                  }}
                />
              </OpacityRevealOnVisible>
            </GridCol>
          );
        })}
      </Grid>
    </Section>
  );
};

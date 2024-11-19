import { Anchor, Divider, Group, Title, useMatches } from "@mantine/core";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ReactTyped, Typed } from "react-typed";

import { SectionIDType, sectionPaddingX } from "../../utils/sections";
import { OpacityRevealOnVisible } from "../animations/reveal/OpacityReveal";
import { useTranslation } from "react-i18next";

export const Section: React.FC<
  PropsWithChildren<{
    id: SectionIDType;
    position?: "left" | "right";
  }>
> = ({ children, id, position = "left" }) => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const [typed, setTyped] = useState<Typed>();
  const isInView = useInView(ref);
  const px = useMatches(sectionPaddingX);

  useEffect(() => {
    if (isInView) typed?.reset(true);
  }, [isInView, typed]);

  const [titleSize, dividerMargin, titleMargin] = useMatches({
    sm: ["3rem", "xl", "md"],
    base: ["2rem", "sm", "xs"],
  });

  return (
    <Group
      variant="main-section"
      component="section"
      id={id}
      m="0"
      pb="xl"
      px={px}
    >
      <OpacityRevealOnVisible
        parentProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          },
        }}
      >
        <Divider
          size="md"
          mb={dividerMargin}
          mx={dividerMargin}
          w="100%"
          color="var(--mantine-primary-color-light-hover)"
          ref={ref}
          label={
            <Anchor href={"#" + id} underline="never" variant="gradient">
              <Title
                order={3}
                style={{ fontSize: titleSize, fontFamily: "revert" }}
                mr={titleMargin}
              >
                <ReactTyped
                  key={i18n.language}
                  strings={[t(`sections.${id}.name`)]}
                  typedRef={setTyped}
                  typeSpeed={t(`sections.${id}.name`).length * 10}
                  onComplete={(self) => {
                    if (self.cursor) self.cursor.hidden = true;
                  }}
                  onStart={(_, self) => {
                    if (self.cursor) self.cursor.hidden = false;
                  }}
                  startWhenVisible={true}
                />
              </Title>
            </Anchor>
          }
          labelPosition={position}
        />
        {children}
      </OpacityRevealOnVisible>
    </Group>
  );
};

import { Anchor, Divider, Group, Title, useMatches } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ReactTyped, Typed } from "react-typed";

import { SectionIDType } from "../../utils/sections";

export const Section: React.FC<{
  text: string;
  id: SectionIDType;
  position?: "left" | "right";
  children: JSX.Element;
}> = ({ text, children, id, position = "left" }) => {
  const ref = useRef(null);
  const [typed, setTyped] = useState<Typed>();
  const isInView = useInView(ref);
  const mainControls = useAnimation();

  useEffect(() => {
    mainControls.start(isInView ? "visible" : "hidden");
    if (isInView) typed?.reset(true);
  }, [isInView]);

  const [titleSize, dividerMargin, titleMargin] = useMatches({
    sm: ["3rem", "xl", "md"],
    base: ["2rem", "sm", "xs"],
  });

  return (
    <section>
      <Group id={id} mb="xl" w="100%">
        <motion.div
          ref={ref}
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
            },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Divider
            size="md"
            mb={dividerMargin}
            mx={dividerMargin}
            w="100%"
            label={
              <Anchor href={"#" + id} underline="never" variant="gradient">
                <Title
                  order={3}
                  style={{ fontSize: titleSize, fontFamily: "revert" }}
                  mr={titleMargin}
                >
                  <ReactTyped
                    strings={[text]}
                    typedRef={setTyped}
                    typeSpeed={text.length * 10}
                    onComplete={(self) => {
                      if (self.cursor) self.cursor.hidden = true;
                    }}
                    onStart={(_, self) => {
                      if (self.cursor) self.cursor.hidden = false;
                    }}
                    startWhenVisible
                  />
                </Title>
              </Anchor>
            }
            labelPosition={position}
          />
          {children}
        </motion.div>
      </Group>
    </section>
  );
};

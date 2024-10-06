import { Anchor, Divider, Group, Title } from "@mantine/core";
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

  return (
    <section>
      <Group id={id} mb="xl">
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
        >
          <Divider
            size="md"
            mb="xl"
            mr="xl"
            ml="xl"
            label={
              <Anchor
                w="fit-content"
                href={"#" + id}
                underline="never"
                variant="gradient"
              >
                <Title
                  w="fit-content"
                  order={3}
                  style={{ fontSize: "3rem", fontFamily: "revert" }}
                  mr="md"
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

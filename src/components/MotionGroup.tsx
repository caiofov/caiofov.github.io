import { createPolymorphicComponent, Group, GroupProps } from "@mantine/core";
import { MotionProps } from "framer-motion";
import React from "react";

export const MotionGroup = createPolymorphicComponent<MotionProps, GroupProps>(
  Group
);
export type MotionGroupProps = React.ComponentProps<typeof MotionGroup>;

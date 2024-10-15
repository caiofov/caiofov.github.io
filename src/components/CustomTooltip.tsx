import { Tooltip, TooltipProps } from "@mantine/core";
import React from "react";
type RefType = React.ComponentProps<typeof Tooltip>["ref"];
export const CustomTooltip: React.FC<
  TooltipProps & {
    innerRef?: RefType;
  }
> = ({ innerRef, ...props }) => {
  return (
    <Tooltip
      events={{ hover: true, focus: true, touch: true }}
      transitionProps={{ duration: 500 }}
      withArrow
      variant="custom-light"
      ref={innerRef}
      {...props}
    />
  );
};

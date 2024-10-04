import {
  ActionIcon,
  Anchor,
  Tooltip,
  ActionIconProps,
  Image,
  ImageProps,
} from "@mantine/core";
import React from "react";
import { Icon as IconType, IconProps } from "@tabler/icons-react";

type TooltipProps = {
  tooltip: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  actionIconProps?: ActionIconProps;
};

type IconTooltipProps = TooltipProps & {
  Icon: IconType;
  iconProps?: IconProps;
};
type ImageTooltipProps = TooltipProps & {
  imageSrc: string;
  imageProps?: ImageProps;
};

export const IconTooltip: React.FC<IconTooltipProps> = ({
  tooltip,
  href,
  Icon,
  onClick,
  actionIconProps,
  iconProps,
}) => {
  return (
    <Tooltip label={tooltip}>
      <ActionIcon
        size="md"
        onClick={onClick}
        variant="transparent"
        {...actionIconProps}
      >
        {href ? (
          <>
            <Anchor
              href={href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Icon {...iconProps} />
            </Anchor>
          </>
        ) : (
          <Icon {...iconProps} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export const ImageTooltip: React.FC<ImageTooltipProps> = ({
  tooltip,
  href,
  imageSrc,
  onClick,
  actionIconProps,
  imageProps,
}) => {
  return (
    <Tooltip label={tooltip}>
      <ActionIcon
        size="md"
        onClick={onClick}
        variant="transparent"
        {...actionIconProps}
      >
        {href ? (
          <>
            <Anchor
              href={href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Image src={imageSrc} {...imageProps} />
            </Anchor>
          </>
        ) : (
          <Image src={imageSrc} {...imageProps} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

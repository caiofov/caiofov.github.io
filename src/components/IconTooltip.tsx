import {
  ActionIcon,
  Anchor,
  Tooltip,
  ActionIconProps,
  Image,
  ImageProps,
  CopyButton,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React from "react";
import {
  Icon as IconType,
  IconProps,
  IconCopy,
  IconCopyCheck,
} from "@tabler/icons-react";

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

type CopyTooltipProps = {
  CopiedIcon?: IconType;
  CopyIcon?: IconType;
  Icon: IconType;
  tooltip: string;
  copiedTooltip?: string;
  copyValue: string;
  actionIconProps?: ActionIconProps;
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
    <Tooltip withArrow label={tooltip}>
      <ActionIcon
        size="md"
        onClick={onClick}
        variant="transparent"
        {...actionIconProps}
      >
        {href ? (
          <Anchor href={href} underline="never" c="inherit">
            <Icon {...iconProps} />
          </Anchor>
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
    <Tooltip withArrow label={tooltip}>
      <ActionIcon
        size="md"
        onClick={onClick}
        variant="transparent"
        {...actionIconProps}
      >
        {href ? (
          <Anchor href={href} underline="never" c="inherit">
            <Image src={imageSrc} {...imageProps} />
          </Anchor>
        ) : (
          <Image src={imageSrc} {...imageProps} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export const CopyTooltip: React.FC<CopyTooltipProps> = ({
  tooltip,
  copiedTooltip,
  copyValue,
  CopiedIcon,
  CopyIcon,
  Icon,
  actionIconProps,
}) => {
  const HoverIcon = CopyIcon ?? IconCopy;
  const CheckIcon = CopiedIcon ?? IconCopyCheck;
  const checkTooltip = copiedTooltip ?? tooltip;
  const { hovered, ref } = useHover();
  return (
    <CopyButton value={copyValue} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          label={copied ? checkTooltip : tooltip}
          withArrow
          position="right"
          ref={ref}
        >
          <ActionIcon
            size="md"
            variant="transparent"
            onClick={copy}
            {...actionIconProps}
          >
            {hovered && !copied ? (
              <HoverIcon />
            ) : copied ? (
              <CheckIcon />
            ) : (
              <Icon />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

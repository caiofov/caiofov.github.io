import {
  ActionIcon,
  Tooltip,
  ActionIconProps,
  Image,
  ImageProps,
  CopyButton,
  CopyButtonProps,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React, { useEffect } from "react";
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
  variantFunc?: (hovered: boolean) => string;
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
  iconProps?: IconProps;
  buttonProps?: CopyButtonProps;
};

export const IconTooltip: React.FC<IconTooltipProps> = ({
  tooltip,
  href,
  Icon,
  onClick,
  actionIconProps,
  iconProps,
  variantFunc = (hovered) => (hovered ? "gradient" : "transparent"),
}) => {
  const IconComponent = <Icon {...iconProps} />;
  const { hovered, ref } = useHover();

  return (
    <Tooltip withArrow label={tooltip} ref={ref}>
      {href ? (
        <ActionIcon
          size="md"
          component="a"
          href={href}
          target="_blank"
          radius="md"
          variant={variantFunc(hovered)}
          style={{
            transition: "all 0.3s ease-in-out",
          }}
          {...actionIconProps}
        >
          {IconComponent}
        </ActionIcon>
      ) : (
        <ActionIcon
          size="md"
          onClick={onClick}
          variant={variantFunc(hovered)}
          {...actionIconProps}
        >
          {IconComponent}
        </ActionIcon>
      )}
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
  const ImageComponent = <Image src={imageSrc} {...imageProps} />;
  return (
    <Tooltip withArrow label={tooltip}>
      {href ? (
        <ActionIcon
          size="md"
          component="a"
          href={href}
          target="_blank"
          variant="transparent"
          {...actionIconProps}
        >
          {ImageComponent}
        </ActionIcon>
      ) : (
        <ActionIcon
          size="md"
          onClick={onClick}
          variant="transparent"
          {...actionIconProps}
        >
          {ImageComponent}
        </ActionIcon>
      )}
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
  iconProps,
  buttonProps,
}) => {
  const HoverIcon = CopyIcon ?? IconCopy;
  const CheckIcon = CopiedIcon ?? IconCopyCheck;
  const checkTooltip = copiedTooltip ?? tooltip;
  const { hovered, ref } = useHover();
  return (
    <CopyButton value={copyValue} timeout={2000} {...buttonProps}>
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
              <HoverIcon {...iconProps} />
            ) : copied ? (
              <CheckIcon {...iconProps} />
            ) : (
              <Icon {...iconProps} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

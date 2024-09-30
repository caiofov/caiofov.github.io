import React from "react";

export const Icon: React.FC<{
  iconName: string;
  text?: string;
  href?: string;
}> = ({ iconName, text, href }) => {
  const icon = <i className={`bi bi-${iconName}`}>{text ?? ""}</i>;
  if (href) {
    return <a href={href}>{icon}</a>;
  }
  return icon;
};

import React, { useState } from "react";
import i18n, { LanguageCode } from "../i18n";
import brazilFlag from "../assets/brazil_flag.svg";
import usaFlag from "../assets/usa_flag.svg";
import { ActionIcon, Select, Tooltip } from "@mantine/core";

const languages = {
  pt: { name: "Português", flag: brazilFlag },
  en: { name: "English", flag: usaFlag },
};

export const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language as LanguageCode
  );

  const chooseLanguage = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    setSelectedLanguage(code);
  };

  return (
    <Select
      id="language-selector"
      className="p-0"
      label="Your favorite library"
      placeholder="Pick value"
      data={[
        { value: "pt", label: "Português" },
        { value: "en", label: "English" },
      ]}
      defaultValue="pt"
      onChange={(value, option) => {
        if (value != null) chooseLanguage(value as "pt" | "en");
      }}
    />
  );
};

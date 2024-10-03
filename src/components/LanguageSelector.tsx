import React from "react";
import i18n, { LanguageCode } from "../i18n";
import brazilFlag from "../assets/brazil_flag.svg";
import usaFlag from "../assets/usa_flag.svg";
import { Select } from "@mantine/core";

const languages = {
  pt: { name: "Português", flag: brazilFlag },
  en: { name: "English", flag: usaFlag },
};

export const LanguageSelector = () => {
  const chooseLanguage = (code: LanguageCode) => {
    i18n.changeLanguage(code);
  };

  const selectData = Object.keys(languages).map((c) => ({
    value: c,
    label: languages[c as LanguageCode]["name"],
  }));

  return (
    <Select
      id="language-selector"
      data={selectData}
      defaultValue="pt"
      onChange={(value, option) => {
        if (value != null) chooseLanguage(value as LanguageCode);
      }}
      allowDeselect={false}
    />
  );
};

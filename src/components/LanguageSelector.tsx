import React, { useState } from "react";
import i18n from "../i18n";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const chooseLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
    setSelectedLanguage(e.target.value);
  };

  return (
    <select defaultValue={selectedLanguage} onChange={chooseLanguage}>
      <option value="pt">Português</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSelector;

import React, { useState } from "react";
import i18n, { LanguageCode } from "../i18n";
import brazilFlag from "../assets/brazil_flag.svg";
import usaFlag from "../assets/usa_flag.svg";
import { Dropdown } from "react-bootstrap";

const languages = {
  pt: { name: "Português", flag: brazilFlag },
  en: { name: "English", flag: usaFlag },
};

const LanguageItem: React.FC<{
  code: LanguageCode;
  onClick: (code: LanguageCode) => void;
}> = ({ code, onClick }) => {
  return (
    <Dropdown.Item
      className="language-item p-1 d-flex align-items-center"
      onClick={(e) => {
        e.preventDefault();
        onClick(code);
      }}
      id={code}
    >
      <img src={languages[code].flag} alt={languages[code].name} />
      {" " + languages[code].name}
    </Dropdown.Item>
  );
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
    <Dropdown id="language-selector" className="p-0">
      <Dropdown.Toggle className="p-0 d-flex align-items-center">
        <img
          src={languages[selectedLanguage].flag}
          alt={languages[selectedLanguage].name}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-1" style={{ width: "10px" }}>
        <LanguageItem code="pt" onClick={chooseLanguage} />
        <LanguageItem code="en" onClick={chooseLanguage} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

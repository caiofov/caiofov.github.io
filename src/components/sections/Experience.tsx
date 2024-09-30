import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import experiences from "../../assets/experiences.json";
import { OpacityRevealSequence } from "../animations/OpacityReveal";

type CompanyType = keyof typeof experiences;
type ExperienceType = keyof (typeof experiences)[CompanyType]["experiences"];

const ExperienceTitle: React.FC<{
  company: string;
  start: string;
  end: string;
  role: string;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}> = ({ company, start, end, role, active, onClick }) => {
  return (
    <div
      className={"experience-title" + (active ? " active" : "")}
      onClick={onClick}
    >
      <h4>{role}</h4>
      <p className="experience-company">{company}</p>
      <p className="experience-period">
        {start} - {end}
      </p>
    </div>
  );
};

const ExperienceItem: React.FC<{
  company: CompanyType;
  experience: ExperienceType;
  text: string;
}> = ({ company, text, experience }) => {
  const skills = experiences[company]["experiences"][experience] as string[];

  return (
    <li className="experience-item">
      {text}

      <div className="experience-skills d-flex">
        {skills.map((skill) => {
          return <p>{skill}</p>;
        })}
      </div>
    </li>
  );
};

export const Experience = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(
    Object.keys(experiences)[0] as CompanyType
  );
  return (
    <section id="experiences">
      <h3>{t("sections.experiences.name")}</h3>
      <div
        id="experiences-select"
        className="d-flex justify-content-center align-items-center"
      >
        {Object.keys(experiences).map((c) => {
          const company = c as CompanyType;
          return (
            <ExperienceTitle
              key={company}
              company={experiences[company as keyof typeof experiences].name}
              start={t(`sections.experiences.${company}.start`)}
              end={t(`sections.experiences.${company}.end`)}
              role={t(`sections.experiences.${company}.role`)}
              active={company === active}
              onClick={(e) => {
                e.preventDefault();
                setActive(company);
              }}
            />
          );
        })}
      </div>
      <div id="experiences-body">
        <OpacityRevealSequence
          delayIncrease={(len) => {
            return len > 5 ? 0.1 : 10;
          }}
        >
          {Object.keys(experiences[active]["experiences"]).map((e) => {
            const exp = e as ExperienceType;
            return (
              <ExperienceItem
                key={active + exp}
                company={active}
                experience={exp}
                text={t(
                  `sections.experiences.${active}.texts.${exp as string}`
                )}
              />
            );
          })}
        </OpacityRevealSequence>
      </div>
    </section>
  );
};

import React from "react";
import s from "./index.module.css";
import { mainSections, sideSections } from "./Section/SectionConfig";
import { Section } from "./Section/Section";

export const MainPage: React.FC = () => {
  return (
    <div className="container">
      <div className={s.mainContent}>
        <div className="mainColumn">
          {mainSections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              withCard={section.withCard}
            >
              {section.component}
            </Section>
          ))}
        </div>

        <div className={s.sidebar}>
          {sideSections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              withCard={section.withCard}
            >
              {section.component}
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
};

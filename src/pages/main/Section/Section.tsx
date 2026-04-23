import s from "./index.module.css";

type SectionProps = {
  title: string;
  children: React.ReactNode;
  withCard?: boolean;
};

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  withCard,
}) => {
  return (
    <div className={s.dashboardSection}>
      <div className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>{title}</h2>
      </div>
      {withCard ? <div className={s.card}>{children}</div> : children}
    </div>
  );
};

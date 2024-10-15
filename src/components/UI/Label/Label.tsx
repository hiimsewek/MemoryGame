import styles from "./Label.module.scss";

type LabelProps = {
  children: React.ReactNode;
};

const Label = ({ children }: LabelProps) => {
  return <div className={styles.label}>{children}</div>;
};

export default Label;

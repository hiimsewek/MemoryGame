import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  styleProp?: string;
};

const Button = ({ onClick, styleProp, children }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styleProp}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

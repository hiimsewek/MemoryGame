import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  styleProp?: string;
  disabled?: boolean;
};

const Button = ({ onClick, styleProp, disabled, children }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styleProp}`}
      data-disabled={disabled}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </button>
  );
};

export default Button;

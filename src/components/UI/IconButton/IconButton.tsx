import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./IconButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconButtonProps = {
  onClick: () => void;
  icon: IconProp;
  styleProp?: string;
};

const IconButton = ({ onClick, icon, styleProp }: IconButtonProps) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${styles.icon} ${styleProp}`}
      onClick={onClick}
    />
  );
};

export default IconButton;

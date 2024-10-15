import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Label } from "components";
import styles from "./Select.module.scss";

type SelectProps = {
  label?: string;
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
};

const Select = ({ label, options, selectedOption, onChange }: SelectProps) => {
  const [selectActive, setSelectActive] = useState(false);

  const toggleActive = () => {
    setSelectActive(!selectActive);
  };

  const changeOptionHandler = (option: string) => {
    toggleActive();
    onChange(option);
  };

  return (
    <div className={styles.selectOuterContainer}>
      {label && <Label>{label}</Label>}
      <div className={styles.selectInnerContainer}>
        <div
          onClick={toggleActive}
          className={styles.selectedOptionContainer}
          data-active={selectActive}
        >
          <span className={styles.selectedOption}>{selectedOption}</span>
          <FontAwesomeIcon
            icon={faAngleDown}
            className={styles.selectIcon}
            data-active={selectActive}
          />
        </div>
        {selectActive && (
          <ul data-active={selectActive}>
            {options.map((option, i) => (
              <li
                key={i}
                className={styles.option}
                onClick={changeOptionHandler.bind(this, option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;

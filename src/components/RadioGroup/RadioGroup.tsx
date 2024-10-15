import { Label } from "components";
import styles from "./RadioGroup.module.scss";

type RadioGroupProps = {
  label?: string;
  groupName: string;
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
};

const RadioGroup = ({
  onChange,
  options,
  groupName,
  selectedOption,
  label,
}: RadioGroupProps) => {
  return (
    <div className={styles.radioGroupOuterContainer}>
      {label && <Label>{label}</Label>}
      <div className={styles.radioGroupInnerContainer}>
        {options.map((option, i) => (
          <label key={i} className={styles.customRadio}>
            <input
              type="radio"
              name={groupName}
              value={option}
              checked={selectedOption === option}
              onChange={onChange.bind(this, option)}
            />
            <div className={styles.radioMark}></div>
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;

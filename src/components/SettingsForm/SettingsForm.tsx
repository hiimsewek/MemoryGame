import { Button, Modal, RadioGroup, Select } from "components";
import styles from "./SettingsForm.module.scss";
import { difficulties } from "data/difficulties";
import useSettingsForm from "./useSettingsForm";

const SettingsForm = () => {
  const {
    btnDisabled,
    categories,
    closeModal,
    confirmChanges,
    modalActive,
    onCategoryChange,
    onDifficultyChange,
    selectedCategory,
    selectedDifficulty,
    submitHandler,
  } = useSettingsForm();

  return (
    <>
      <div className={styles.formContainer}>
        <Select
          label="category"
          options={categories}
          selectedOption={selectedCategory}
          onChange={onCategoryChange}
        />
        <RadioGroup
          options={difficulties}
          groupName="difficulties"
          selectedOption={selectedDifficulty}
          label="difficulty"
          onChange={onDifficultyChange}
        />

        <Button onClick={submitHandler} disabled={btnDisabled}>
          save
        </Button>
      </div>
      {modalActive && (
        <Modal
          title="Confirm Settings Change"
          text="Your game is currently in progress. If you confirm, you will lose your progress. Do you want to proceed?"
          onCancel={closeModal}
          onConfirm={confirmChanges}
        />
      )}
    </>
  );
};

export default SettingsForm;

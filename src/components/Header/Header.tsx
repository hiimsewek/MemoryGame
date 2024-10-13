import { useState } from "react";
import { IconButton, Drawer, GameHistory, SettingsForm } from "components";
import { faGear, faRectangleList } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.scss";

type HeaderOptions = "history" | "settings" | null;

const Header = () => {
  const [option, setOption] = useState<HeaderOptions>(null);

  const openGameHistory = (option: NonNullable<HeaderOptions>) => {
    if (option === "history") setOption("history");
    else setOption("settings");
  };

  const onClose = () => {
    setOption(null);
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>memory game</h1>
        <div className={styles.iconsWrapper}>
          <IconButton
            icon={faRectangleList}
            onClick={openGameHistory.bind(this, "history")}
          />
          <IconButton
            icon={faGear}
            onClick={openGameHistory.bind(this, "settings")}
          />
        </div>
      </header>

      <Drawer onClose={onClose} isActive={!!option}>
        <>
          {option === "settings" && <SettingsForm />}
          {option === "history" && <GameHistory />}
        </>
      </Drawer>
    </>
  );
};

export default Header;

import styles from "./Overlay.module.scss";

type OverlayProps = {
  onClick: () => void;
};

const Overlay = ({ onClick }: OverlayProps) => {
  return <div onClick={onClick} className={styles.overlay}></div>;
};

export default Overlay;

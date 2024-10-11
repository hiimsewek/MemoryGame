import { CardWithId } from "types";
import styles from "./Tile.module.scss";

type TileProps = Omit<CardWithId, "type"> & {
  onClick: (id: string) => void;
  active: boolean;
};

const Tile = ({ id, image, value, onClick, active }: TileProps) => {
  return (
    <>
      <div className={styles.tile}>
        <img
          src={image}
          alt={value}
          className={styles.front}
          data-active={active}
        ></img>
        <div
          className={styles.back}
          onClick={onClick.bind(this, id)}
          data-active={active}
        ></div>
      </div>
    </>
  );
};

export default Tile;

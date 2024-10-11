import { Tile } from "components/Tile";
import styles from "./Board.module.scss";
import { CardWithId, Difficulty } from "types";

type BoardProps = {
  difficulty: Difficulty;
  deck: CardWithId[];
  onItemClick: (id: string) => void;
  isActive: ({ id, value }: Pick<CardWithId, "id" | "value">) => boolean;
};

const Board = ({ isActive, deck, difficulty, onItemClick }: BoardProps) => {
  return (
    <div className={styles.board} data-difficulty={difficulty}>
      {deck.map(({ id, value, image }: CardWithId) => {
        const itemActive = isActive({ id, value });

        return (
          <Tile
            key={id}
            id={id}
            image={image}
            value={value}
            onClick={onItemClick}
            active={itemActive}
          />
        );
      })}
    </div>
  );
};

export default Board;

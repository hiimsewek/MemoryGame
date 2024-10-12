import { Tile } from "components";
import styles from "./Board.module.scss";
import { CardWithId, Difficulty } from "types";

type BoardProps = {
  difficulty: Difficulty;
  deck: CardWithId[];
  boardDisabled: boolean;
  onItemClick: (id: string) => void;
  isItemActive: ({ id, value }: Pick<CardWithId, "id" | "value">) => boolean;
};

const Board = ({
  isItemActive,
  deck,
  difficulty,
  onItemClick,
  boardDisabled,
}: BoardProps) => {
  return (
    <div className={styles.board} data-difficulty={difficulty}>
      {deck.map(({ id, value, image }: CardWithId) => {
        const itemActive = isItemActive({ id, value });

        return (
          <Tile
            key={id}
            id={id}
            image={image}
            value={value}
            onClick={onItemClick}
            active={itemActive}
            disabled={boardDisabled}
          />
        );
      })}
    </div>
  );
};

export default Board;

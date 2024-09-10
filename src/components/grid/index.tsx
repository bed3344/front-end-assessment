import Card, { CardProps } from "../card";
import "./grid.css";

interface GridProps {
  cards: CardProps[];
}

const Grid = ({ cards }: GridProps) => {
  return (
    <div className="flex-grid">
      {cards.map((card) => {
        return (
          <div className="cell">
            <Card value={card.value} />
          </div>
        );
      })}
    </div>
  );
};

export default Grid;

import "./grid.css";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Card, { CardBase } from "../card";

export enum CardType {
  Bear = "BEAR",
  Cat = "CAT",
  Cow = "COW",
  Crab = "CRAB",
  Duck = "DUCK",
  Pig = "PIG",
}

interface GridProps {
  cards: CardBase[];
  hasWon: boolean;
  numCardsMatched: number;
  setCards: (cards: CardBase[]) => void;
  setHasWon: (value: boolean) => void;
  setNumCardsMatched: (value: number) => void;
}

const Grid = ({
  cards,
  hasWon,
  numCardsMatched,
  setCards,
  setHasWon,
  setNumCardsMatched,
}: GridProps) => {
  const { width, height } = useWindowSize();
  const [firstCard, setFirstCard] = useState<CardBase | null>(null);
  const [secondCard, setSecondCard] = useState<CardBase | null>(null);
  const [disabled, setDisabled] = useState(false);

  const handleCardClick = (card: CardBase) => {
    if (firstCard !== null && firstCard.id !== card.id) {
      setSecondCard(card);
    } else {
      setFirstCard(card);
    }
  };

  const updateCards = (
    oldCards: CardBase[],
    first: CardBase,
    second: CardBase
  ) => {
    return oldCards.map((card) => {
      if (card.id === first.id || card.id == second.id) {
        return { ...card, matched: true };
      } else {
        return card;
      }
    });
  };

  const clearSelections = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  // If two cards are selected and the match then disable the ability to flip and update card array. If they don't match clear the selected cards
  useEffect(() => {
    if (numCardsMatched === cards.length) {
      setHasWon(true);
    } else {
      if (firstCard && secondCard) {
        setDisabled(true);
        if (firstCard.type === secondCard.type) {
          const updatedCards = updateCards(cards, firstCard, secondCard);
          setCards(updatedCards);
          setNumCardsMatched(numCardsMatched + 2);
          clearSelections();
        } else {
          setTimeout(() => {
            clearSelections();
          }, 1000);
        }
      }
    }
  }, [firstCard, secondCard, cards, numCardsMatched]);

  return (
    <div className="flex-grid">
      {hasWon ? <Confetti width={width} height={height} /> : null}
      {cards.map((card) => {
        return (
          <div className="cell" key={card.id}>
            <Card
              item={card}
              disabled={disabled}
              flipped={
                card === firstCard ||
                card === secondCard ||
                card.matched === true
              }
              onClick={handleCardClick}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Grid;

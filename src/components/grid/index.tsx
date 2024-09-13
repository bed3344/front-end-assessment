import "./grid.css";
import { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Card, { CardBase } from "../card";

export enum CardType {
  Apple = "APPLE",
  Banana = "BANANA",
  Bear = "BEAR",
  Cat = "CAT",
  Cloud = "CLOUD",
  Comet = "COMET",
  Cow = "COW",
  Crab = "CRAB",
  Duck = "DUCK",
  Grape = "GRAPE",
  Moon = "MOON",
  Pig = "PIG",
  Planet = "PLANET",
  Satelite = "SATELITE",
  Star = "STAR",
}

interface GridProps {
  cards: CardBase[];
  hasWon: boolean;
  numCardsMatched: number;
  currStage: number;
  endRound: () => void;
  setCards: (cards: CardBase[]) => void;
  setHasWon: (value: boolean) => void;
  setNumCardsMatched: (value: number) => void;
}

const Grid = ({
  cards,
  hasWon,
  numCardsMatched,
  currStage,
  endRound,
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

  // method for creating the individual cards
  const createCards = (arr: CardBase[]) => {
    return arr.map((card) => {
      return (
        <div className="cell" key={card.id}>
          <Card
            item={card}
            disabled={disabled}
            flipped={
              card === firstCard || card === secondCard || card.matched === true
            }
            onClick={handleCardClick}
          />
        </div>
      );
    });
  };

  // If two cards are selected and they match then disable the ability to flip and update card array. If they don't match clear the selected cards
  useEffect(() => {
    if (numCardsMatched === cards.length && currStage === 2) {
      setHasWon(true);
    } else if (numCardsMatched === cards.length) {
      endRound();
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
          }, 500);
        }
      }
    }
  }, [
    firstCard,
    secondCard,
    cards,
    numCardsMatched,
    setNumCardsMatched,
    setHasWon,
    setCards,
    clearSelections,
    endRound,
    setDisabled,
  ]);

  // split the cards into two arrays for easy displaying for smaller deck sizes
  const rowOneCards = useMemo(() => {
    return cards.slice(0, 3);
  }, [cards]);
  const rowTwoCards = useMemo(() => {
    return cards.slice(3);
  }, [cards]);

  return (
    <div className="flex-grid">
      {hasWon ? <Confetti width={width} height={height} /> : null}
      {cards.length > 6 ? (
        createCards(cards)
      ) : (
        <>
          <div className="row">{createCards(rowOneCards)}</div>
          <div className="row">{createCards(rowTwoCards)}</div>
        </>
      )}
    </div>
  );
};

export default Grid;

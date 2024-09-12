import "./App.css";
import { useEffect, useState } from "react";
import Modal from "react-minimal-modal";
import { CardBase } from "./components/card";
import { deck } from "./components/card/deck";
import Grid from "./components/grid";
import Header from "./components/header";

// Use Fisher-Yates Sorting Algorithm for shuffling cards
function shuffleCards(cards: CardBase[]) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  console.log(cards);
  return cards;
}

const App = () => {
  const [cards, setCards] = useState<CardBase[]>([]);
  const [numCardsMatched, setNumCardsMatched] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  const reset = (cards: CardBase[]) => {
    console.log("reset clicked");
    setCards([]);
    setCards(shuffleCards(cards));
    setHasWon(false);
    setNumCardsMatched(0);
  };

  const modalReset = () => {
    reset(deck);
    setHasWon(false);
  };

  useEffect(() => {
    // Run reset at beginning of page load to start game
    reset(deck);
  }, [deck]);

  return (
    <>
      <Header reset={reset} deck={deck} />
      <Modal open={hasWon} onOpenChange={modalReset}>
        <h1 style={{ textAlign: "center" }}>You Win!!!</h1>
        <p>
          Congratulations, you have matched all the cards! Press the 'X' button
          to restart the game.
        </p>
      </Modal>
      <Grid
        cards={cards}
        hasWon={hasWon}
        numCardsMatched={numCardsMatched}
        setCards={setCards}
        setHasWon={setHasWon}
        setNumCardsMatched={setNumCardsMatched}
      />
    </>
  );
};

export default App;

import "./App.css";
import { useEffect, useState } from "react";
import Modal from "react-minimal-modal";
import { CardBase } from "./components/card";
import {
  roundOneDeck,
  roundTwoDeck,
  roundThreeDeck,
} from "./components/card/deck";
import Grid from "./components/grid";
import Header from "./components/header";
import StoryDisplay from "./components/story-display";

// Use Fisher-Yates Sorting Algorithm for shuffling cards
function shuffleCards(cards: CardBase[]) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

const App = () => {
  const [cards, setCards] = useState<CardBase[]>([]);
  const [numCardsMatched, setNumCardsMatched] = useState(0);
  const [inStoryMode, setInStoryMode] = useState(true);
  const [currStage, setCurrStage] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  const decks = [roundOneDeck, roundTwoDeck, roundThreeDeck];

  // Hard reset method, accounts for both win and fail states
  const reset = (cards: CardBase[]) => {
    setCards([]);
    resetRound(cards);
    setHasWon(false);
    setCurrStage(0);
  };

  // Reset round method for when the user loses a game
  const resetRound = (cards: CardBase[]) => {
    setCards(shuffleCards(cards));
    setHasLost(false);
    setNumCardsMatched(0);
    setInStoryMode(true);
  };

  // Method to finish the round once it has been won.
  const endRound = () => {
    setNumCardsMatched(0);
    setCurrStage(currStage + 1);
    setInStoryMode(true);
    setCards(shuffleCards(decks[currStage + 1]));
  };

  useEffect(() => {
    // Run reset at beginning of page load to start game
    reset(roundOneDeck);
  }, [roundOneDeck]);

  // Set the background image based on the current stage
  useEffect(() => {
    const background = document.getElementsByTagName("body");
    if (background) {
      switch (currStage) {
        case 0:
          background[0].style.backgroundImage =
            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(226,226,255,1) 35%, rgba(0,212,255,1) 100%)";
          break;
        case 1:
          background[0].style.backgroundImage =
            "linear-gradient(0deg, rgba(91,41,125,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)";
          break;
        case 2:
          background[0].style.backgroundImage =
            "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(79,49,153,1) 50%, rgba(29,16,62,1) 100%)";
          break;
        default:
          background[0].style.backgroundColor = "#00d4ff";
          break;
      }
    }
  }, [currStage]);

  return (
    <div>
      <Header
        reset={reset}
        deck={roundOneDeck}
        hasTimer={currStage > 0 && !inStoryMode}
        isPlaying={!hasWon && !inStoryMode}
        timerDuration={currStage === 1 ? 30 : 15}
        setHasLost={setHasLost}
      />
      <Modal open={hasWon} onOpenChange={() => reset(roundOneDeck)}>
        <h1 style={{ textAlign: "center" }}>You Win!!!</h1>
        <p style={{ textAlign: "center" }}>
          Congratulations, you have matched all the cards! Press the 'X' button
          to restart the game.
        </p>
      </Modal>
      <Modal open={hasLost} onOpenChange={() => resetRound(decks[currStage])}>
        <h1 style={{ textAlign: "center" }}>Too bad!</h1>
        <p style={{ textAlign: "center" }}>
          You ran out of time. Press the 'X' button to try again!
        </p>
      </Modal>
      {inStoryMode ? (
        <StoryDisplay
          stage={currStage}
          setInStoryMode={setInStoryMode}
        ></StoryDisplay>
      ) : (
        <Grid
          cards={cards}
          hasWon={hasWon}
          numCardsMatched={numCardsMatched}
          currStage={currStage}
          endRound={endRound}
          setCards={setCards}
          setHasWon={setHasWon}
          setNumCardsMatched={setNumCardsMatched}
        />
      )}
    </div>
  );
};

export default App;

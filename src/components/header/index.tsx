import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { CardBase } from "../card";
import "./header.css";

interface HeaderProps {
  reset: (cards: CardBase[]) => void;
  deck: CardBase[];
  hasTimer: boolean;
  isPlaying: boolean;
  timerDuration: number;
  setHasLost: (value: boolean) => void;
}

const Header = ({
  reset,
  deck,
  hasTimer,
  isPlaying,
  timerDuration,
  setHasLost,
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Brooke's Matching Game</h1>
      </div>
      {hasTimer ? (
        <div>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={timerDuration}
            size={60}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => {
              setHasLost(true);
            }}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
      ) : null}
      <div className="reset-container">
        <button className="reset-button" onClick={() => reset(deck)}>
          RESET
        </button>
      </div>
    </header>
  );
};

export default Header;

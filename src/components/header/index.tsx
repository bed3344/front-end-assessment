import { CardBase } from "../card";
import "./header.css";

interface HeaderProps {
  reset: (cards: CardBase[]) => void;
  deck: CardBase[];
}

const Header = ({ reset, deck }: HeaderProps) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Brooke's Matching Game</h1>
      </div>
      <div className="reset-container">
        <button className="reset-button" onClick={() => reset(deck)}>
          RESET
        </button>
      </div>
    </header>
  );
};

export default Header;

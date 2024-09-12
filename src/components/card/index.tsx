import "./card.css";
import { useMemo } from "react";
import { CardType } from "../grid";
import Bear from "../../assets/bear.svg";
import Cat from "../../assets/cat.svg";
import Cow from "../../assets/cow.svg";
import Crab from "../../assets/crab.svg";
import Duck from "../../assets/duck.svg";
import Pig from "../../assets/pig.svg";
import CardBack from "../../assets/card-back.svg";

function getImage(type: CardType) {
  switch (type) {
    case CardType.Bear:
      return Bear;
    case CardType.Cat:
      return Cat;
    case CardType.Cow:
      return Cow;
    case CardType.Crab:
      return Crab;
    case CardType.Duck:
      return Duck;
    case CardType.Pig:
      return Pig;
  }
}

export interface CardBase {
  id: number;
  type: CardType;
  matched: boolean;
}

export interface CardProps {
  item: CardBase;
  disabled: boolean;
  flipped: boolean;
  onClick: (card: CardBase) => void;
}

const Card = ({ item, disabled, flipped, onClick }: CardProps) => {
  const image = getImage(item.type);

  const classes = useMemo(() => {
    const matched = " matched";
    const backClass = "card back";
    const frontClass = "card front";
    if (item.matched) {
      return frontClass + matched;
    } else {
      return flipped ? frontClass : backClass;
    }
  }, [flipped, item.matched]);

  const handleFlip = (card: CardBase, disabled: boolean) => {
    if (!disabled) {
      onClick(card);
    }
  };

  return (
    <div className={classes} onClick={() => handleFlip(item, disabled)}>
      {flipped ? (
        <img className="picture" src={image}></img>
      ) : (
        <img className="design" src={CardBack}></img>
      )}
    </div>
  );
};

export default Card;

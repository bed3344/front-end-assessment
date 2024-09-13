import "./card.css";
import { useMemo } from "react";
import { CardType } from "../grid";
import Apple from "../../assets/apple.svg";
import Banana from "../../assets/banana.svg";
import Bear from "../../assets/bear.svg";
import Cat from "../../assets/cat.svg";
import Cloud from "../../assets/cloud.svg";
import Comet from "../../assets/comet.svg";
import Cow from "../../assets/cow.svg";
import Crab from "../../assets/crab.svg";
import Duck from "../../assets/duck.svg";
import Grape from "../../assets/grape.svg";
import Moon from "../../assets/moon.svg";
import Pig from "../../assets/pig.svg";
import Planet from "../../assets/planet.svg";
import Satelite from "../../assets/satelite.svg";
import Star from "../../assets/star.svg";
import CardBack from "../../assets/card-back.svg";

function getImage(type: CardType) {
  switch (type) {
    case CardType.Apple:
      return Apple;
    case CardType.Banana:
      return Banana;
    case CardType.Bear:
      return Bear;
    case CardType.Cat:
      return Cat;
    case CardType.Cloud:
      return Cloud;
    case CardType.Comet:
      return Comet;
    case CardType.Cow:
      return Cow;
    case CardType.Crab:
      return Crab;
    case CardType.Duck:
      return Duck;
    case CardType.Grape:
      return Grape;
    case CardType.Moon:
      return Moon;
    case CardType.Pig:
      return Pig;
    case CardType.Planet:
      return Planet;
    case CardType.Satelite:
      return Satelite;
    case CardType.Star:
      return Star;
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

  // Set the css class based on if the card is flipped and/or matched
  const classes = useMemo(() => {
    const matched = " matched";
    const backClass = "card";
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

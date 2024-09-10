import { useMemo, useState } from "react";
import "./card.css";

export interface CardProps {
  value: String; //might change this to enum
}

const Card = ({ value }: CardProps) => {
  const [flipped, setFlipped] = useState(false);

  const classes = useMemo(() => {
    const backClass = "card back";
    const frontClass = "card front";
    return flipped ? frontClass : backClass;
  }, [flipped]);

  return (
    <div className={classes} onClick={() => setFlipped(!flipped)}>
      {flipped ? value : null}
    </div>
  );
};

export default Card;

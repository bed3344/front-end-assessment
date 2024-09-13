import Modal from "react-minimal-modal";
import "./story-display.css";

import { useMemo } from "react";

interface StoryDisplayProps {
  stage: number;
  setInStoryMode: (value: boolean) => void;
}

const StoryDisplay = ({ stage, setInStoryMode }: StoryDisplayProps) => {
  const content = useMemo(() => {
    switch (stage) {
      case 0:
        return "Once upon a time, there was a farm where a small family cared for many plants and animals. Every morning the family collected fruit from their orchard to sell at the market...";
      case 1:
        return "Every afternoon the family had to pair the animals up before moving them inside the barn for the night...";
      case 2:
        return "Finally, at the end of the day, the family gathered around the fire pit to look at the beauty of the night sky...";
    }
  }, [stage]);
  return (
    <Modal open={true} onOpenChange={() => setInStoryMode(false)}>
      <div className="story-container">
        <p style={{ textAlign: "center" }}>{content}</p>
        <button className="start-button" onClick={() => setInStoryMode(false)}>
          Start Stage {stage + 1}
        </button>
      </div>
    </Modal>
  );
};

export default StoryDisplay;

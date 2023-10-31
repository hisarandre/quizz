import React from "react";
import Card from "../components/Card";

const Flashcard = () => {
  const state = {
    cards: [
      {
        front: "AI",
        answer: ["acconpagnteur", "accompagnateur"],
        feedbackCorrect: "Bravo ! Laccompagnateur·rice...",
        feedbackWrong: "Too bad Laccompagnateur·rice...",
      },
      {
        front: "B",
        answer: ["acconpagnteur", "accompagnateur"],
        feedbackCorrect: "Bravo ",
        feedbackWrong: "Too bad",
      },
      {
        front: "C",
        answer: ["acconpagnteur", "accompagnateur"],
        feedbackCorrect: "Bravo ",
        feedbackWrong: "Too bad",
      },
    ],
  };

  return (
    <div className="App">
      <Card data={state.cards} />
    </div>
  );
};

export default Flashcard;

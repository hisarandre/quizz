import React, { useState } from "react";

const Card = ({ data }) => {
  const [response, setResponse] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [indexCard, setIndexCard] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data[indexCard].answer.includes(response)) {
      setIsCorrect(true);
      setScore(score + 1);
      setFeedback(data[indexCard].feedbackCorrect);
    } else {
      setIsCorrect(false);
      setFeedback(data[indexCard].feedbackWrong);
    }
    setIsFlipped(true);
  };

  const next = () => {
    if (indexCard < data.length - 1) {
      setIndexCard(indexCard + 1);
      setIsFlipped(false);
      setResponse("");
      setFeedback("");
      setIsCorrect(false);
    } else {
      setIsFinish(true);
    }
  };

  const restart = () => {
    setIndexCard(0);
    setIsFlipped(false);
    setResponse("");
    setFeedback("");
    setIsCorrect(false);
    setIsFinish(false);
    setScore(0);
  };

  return (
    <>
      <div className={isFinish ? "fade-out" : ""}>
        <div className={isFlipped ? "flashcard-viewer front front-to-back" : "flashcard-viewer front"}>
          <FlashcardFront
            cards={data}
            indexCard={indexCard}
            response={response}
            setResponse={(e) => setResponse(e.target.value)}
            handleSubmit={handleSubmit}
          />
          <FlashcardBack isFlipped={isFlipped} feedback={feedback} isCorrect={isCorrect} next={next} />
        </div>
        <p className="indication">
          {indexCard + 1} / {data.length}
        </p>
      </div>

      <Score restart={restart} isFinish={isFinish} score={score} />
    </>
  );
};

const FlashcardFront = ({ cards, response, setResponse, handleSubmit, indexCard }) => {
  return (
    <>
      <FlashcardQuestion title={cards[indexCard].front} />
      <div className="flashcard-bottom">
        <label htmlFor="response"></label>
        <input className="input-response" type="text" id="response" required value={response} onChange={setResponse} />
        <button className="button-primary" onClick={handleSubmit}>
          Vérifier
        </button>
      </div>
    </>
  );
};

const FlashcardBack = ({ isFlipped, feedback, isCorrect, next }) => {
  return (
    <>
      <div className={isFlipped ? "flashcard-back back back-to-front" : "flashcard-back back"}>
        <FlashcardFeedback feedback={feedback} isCorrect={isCorrect} />
        <div className="flashcard-bottom">
          <button className="button-primary" onClick={next}>
            Suivant
          </button>
        </div>
      </div>
    </>
  );
};

const FlashcardQuestion = ({ title }) => {
  return <div className="flashcard-item">{title}</div>;
};

const FlashcardFeedback = ({ feedback, isCorrect }) => {
  return <div className={isCorrect ? "flashcard-feedback correct" : "flashcard-feedback wrong"}>{feedback}</div>;
};

const Score = ({ score, restart, isFinish }) => {
  return (
    <div className={isFinish ? "scoreCard fade-in" : "scoreCard"}>
      <h1>Score</h1>
      {score}
      <button className="button-primary" onClick={restart}>
        Recommencer
      </button>
    </div>
  );
};

export default Card;

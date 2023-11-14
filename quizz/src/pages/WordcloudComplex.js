import React, { useState } from "react";
import Cloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

function WordcloudComplex() {
  const currentPath = window.location.pathname;

  const [response, setResponse] = useState("");
  const [hideForm, setHideForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the request body and headers
    const requestBody = JSON.stringify({ word: response });
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`https://crb-quizz.vercel.app/${currentPath}`, {
        method: "POST",
        headers,
        body: requestBody,
      });

      if (response.ok) {
        setResponse("");
        setHideForm(true);
        console.log("Word sent successfully!");
      } else {
        console.error("Error sending the word. Status: " + response.status);
      }
    } catch (error) {
      console.error("Error sending the word:", error);
    }
  };

  const renderComponent = () => {
    if (hideForm) {
      // If hideForm is true, return the ReactCloud component
      return <Cloud endpoint={currentPath} />;
    } else {
      // Otherwise, render the form
      return (
        <div className="wordcloud">
          <label htmlFor="response"></label>
          <input
            className="input-style-2"
            type="text"
            id="response"
            required
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          <button className="button-red" onClick={handleSubmit}>
            Envoyer
          </button>
        </div>
      );
    }
  };

  return <>{renderComponent()}</>;
}

export default WordcloudComplex;

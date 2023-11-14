import React, { useState } from "react";

const CloudForm = ({ endpoint }) => {
  const [response, setResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the input is empty
    if (response.trim() === "") {
      setErrorMessage("Un mot minimum");
      return; // Don't proceed with the submission
    }

    // Check if the number of words exceeds 7
    const wordCount = response.trim().split(/\s+/).length;
    if (wordCount > 7) {
      setErrorMessage("Sept mots maximum");
      return; // Don't proceed with the submission
    }

    // Clear any previous error message
    setErrorMessage("");

    // Define the request body and headers
    const requestBody = JSON.stringify({ word: response });
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`https://crb-quizz.vercel.app/wordcloud/${endpoint}`, {
        method: "POST",
        headers,
        body: requestBody,
      });

      if (response.ok) {
        setResponse("");
        window.location.reload();
        console.log("Word sent successfully!");
      } else {
        console.error("Error sending the word. Status: " + response.status);
      }
    } catch (error) {
      console.error("Error sending the word:", error);
    }
  };

  return (
    <div>
      <label htmlFor="response"></label>
      <input className="input-style-2 " type="text" id="response" required value={response} onChange={(e) => setResponse(e.target.value)} />
      <button className="button-red" onClick={handleSubmit}>
        Envoyer
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error message */}
    </div>
  );
};

export default CloudForm;

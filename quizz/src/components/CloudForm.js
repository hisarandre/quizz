import React, { useState } from "react";

const CloudForm = () => {
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the request body and headers
    const requestBody = JSON.stringify({ word: response });
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(process.env.API_URL, {
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
    </div>
  );
};

export default CloudForm;

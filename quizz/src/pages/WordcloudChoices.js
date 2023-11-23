import React, { useState } from "react";
import Cloud from "../components/Cloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

function WordcloudChoices() {
  const currentPath = window.location.pathname;
  const [hideForm, setHideForm] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    "Sécurité",
    "Bienveillance",
    "Protection",
    "Environnement de travail sain",
    "Harmonie avec l’équipe",
    "Connexion avec ma mission",
    "Confiance dans l’organisation",
    "Confiance en soi",
    "Justice",
  ];

  const handleCheckboxChange = (option) => {
    // Toggle the selected state of the option
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user has selected at least one option
    if (selectedOptions.length === 0) {
      console.error("Please select at least one option before submitting.");
      return;
    }

    // Define the request body and headers
    const requestBody = JSON.stringify({ choices: selectedOptions }); // Adjusted to match backend expectation
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`https://crb-quizz.vercel.app${currentPath}`, {
        method: "POST",
        headers,
        body: requestBody,
      });

      if (response.ok) {
        setHideForm(true);
        console.log("Choices sent successfully!");
      } else {
        console.error("Error sending the choices. Status: " + response.status);
      }
    } catch (error) {
      console.error("Error sending the choices:", error);
    }
  };

  const renderComponent = () => {
    if (hideForm) {
      console.log("Hide form true");
      // If hideForm is true, return the ReactCloud component
      return <Cloud endpoint={currentPath} />;
    } else {
      // Otherwise, render the form with modern checkboxes
      return (
        <div className="wordcloud">
          <div className="checkbox-wrapper">
            {options.map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="checkbox-input"
                />
                {option}
              </label>
            ))}
            <button className="button-red" onClick={handleSubmit}>
              Envoyer
            </button>
          </div>
        </div>
      );
    }
  };

  return <>{renderComponent()}</>;
}

export default WordcloudChoices;

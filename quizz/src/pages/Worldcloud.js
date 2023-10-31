import React from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import CloudForm from "../components/CloudForm";
import { useFetch } from "../services/useFetch";

function Worldcloud() {
  const urlApi = "http://localhost:3000/wordcloud";
  const data = useFetch(urlApi);
  var words;

  if (data) {
    words = data.map((item) => {
      return {
        text: item.word,
        value: item.count,
      };
    });
    console.log(words);
  }

  const options = {
    colors: ["#ed1c24", "#9FD5D8", "#efabb8", "#ffcb78", "#9ec58c"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "lato",
    fontSizes: [20, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  return (
    <div className="wordcloud">
      <ReactWordcloud options={options} words={words} />
      <CloudForm />
    </div>
  );
}

export default Worldcloud;

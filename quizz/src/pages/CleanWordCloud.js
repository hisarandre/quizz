import React from "react";
import { useFetch } from "../services/useFetch";

const CleanWordCloud = () => {
  const urlApi1 = `https://crb-quizz.vercel.app/wordcloud/integrite/1`;
  const urlApi2 = `https://crb-quizz.vercel.app/wordcloud/integrite/2`;
  const urlApi3 = `https://crb-quizz.vercel.app/wordcloud/integrite/3`;
  const urlApi4 = `https://crb-quizz.vercel.app/wordcloud/integrite/choice`;

  const dataIntegrite1 = useFetch(urlApi1);
  const dataIntegrite2 = useFetch(urlApi2);
  const dataIntegrite3 = useFetch(urlApi3);
  const dataIntegrite4 = useFetch(urlApi4);

  return <div></div>;
};

export default CleanWordCloud;

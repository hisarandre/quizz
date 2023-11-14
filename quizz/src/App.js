import "./App.css";
import "./index.css";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Flashcard from "./pages/Flashcard";
import Wordcloud from "./pages/Wordcloud";
import WordcloudComplex from "./pages/WordcloudComplex";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/flashcard" element={<Flashcard />} />
        <Route path="/wordcloud/secours" element={<Wordcloud endpoint="secours" />} />
        <Route path="/wordcloud/integrite/*" element={<WordcloudComplex endpoint="integrite/1" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import "./index.css";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Flashcard from "./pages/Flashcard";
import Wordcloud from "./pages/Wordcloud";
import WordcloudComplex from "./pages/WordcloudComplex";
import WordcloudChoices from "./pages/WordcloudChoices";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/flashcard" element={<Flashcard />} />
        <Route path="/wordcloud/secours" element={<Wordcloud endpoint="secours" />} />
        <Route path="/wordcloud/integrite/*" element={<WordcloudComplex />} />
        <Route path="/wordcloud/integrite/choice" element={<WordcloudChoices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

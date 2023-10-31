import "./App.css";
import "./index.css";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Flashcard from "./pages/Flashcard";
import Worldcloud from "./pages/Worldcloud";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/flashcard" element={<Flashcard />} />
        <Route path="/worldcloud" element={<Worldcloud />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

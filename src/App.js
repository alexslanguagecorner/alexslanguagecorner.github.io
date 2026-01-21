import { useState, useEffect } from "react";
import axios from "axios";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MemoryGame from "./components/games/memory/MemoryGame";
import LetterSoupSetup from "./components/ui/LetterSoupSetup";
import Header from "./components/ui/Header";
import MainTitle from "./components/ui/MainTitle";
import ContentMenu from "./components/ui/ContentMenu";
import GamesSection from "./components/ui/GamesSection";
import FlashcardGrid from "./components/flashcards/FlashcardGrid";
import Search from "./components/ui/Search";
import "./App.css";
import "./scss/main.scss";
import SentenceSetup from "./components/games/SentenceSetup";
import BookingSection from "./components/ui/BookingSection";

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  /* Move to its componets scss file */
  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        `https://raw.githubusercontent.com/olgamadej/JSONs/main/vocabulary.json`
      );

      setItems(result.data);
      setIsLoading(false);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter(
      (item) =>
        normalizeString(item.french_expression)
          .toLowerCase()
          .includes(normalizeString(query).toLowerCase()) ||
        normalizeString(item.english_expression)
          .toLowerCase()
          .includes(normalizeString(query).toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query, items]);

  // Scroll-to-top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="container">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="hero-section">
                  <div className="hero-left">
                    <MainTitle />
                  </div>
                  <ContentMenu />
                </div>
                <div>
                  <GamesSection />
                </div>
                <div>
                  <BookingSection />
                </div>
                <h1 className="voc-search-title caveat-big">
                  Vocabulary Search
                </h1>

                <Search
                  getQuery={(q) => setQuery(q)}
                  allExpressions={items.map((item) => item.french_expression)}
                />
                <FlashcardGrid isLoading={isLoading} items={filteredItems} />
              </>
            }
          />

          <Route path="/memory-game" element={<MemoryGame items={items} />} />
          <Route
            path="/letter-soup"
            element={<LetterSoupSetup items={items} />}
          />
          <Route path="/word-soup" element={<SentenceSetup items={items} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

const normalizeString = (str = "") =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

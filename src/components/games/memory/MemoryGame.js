import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./MemoryGame.scss";

function MemoryGame() {
  const [words, setWords] = useState([]);
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState(1);
  const [board, setBoard] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  let gridSize = 1 + level;
  let totalCards = gridSize * gridSize; // 3x3 will make an uneven number of cards, so:

  // Fetch words once
  useEffect(() => {
    const fetchWords = async () => {
      const result = await axios.get(
        "https://raw.githubusercontent.com/olgamadej/JSONs/main/vocabulary.json"
      );
      setWords(result.data);
    };

    fetchWords();
  }, []);

  // Stable shuffle function
  const shuffle = useCallback((array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, []);

  // Stable saveProgress
  const saveProgress = useCallback(() => {
    const saved = JSON.parse(localStorage.getItem("memoryGameProgress")) || {};
    saved[subject] = Math.max(saved[subject] || 1, level + 1);
    localStorage.setItem("memoryGameProgress", JSON.stringify(saved));
  }, [subject, level]);

  // Stable startNewGame
  const startNewGame = useCallback(() => {
    const filtered = words.filter((w) => w.subjects?.includes(subject));

    if (filtered.length < totalCards / 2) {
      alert(
        "Not enough words for this level. Try a lower level or another subject"
      );
      return;
    }

    const selectedPairs = shuffle(filtered).slice(0, totalCards / 2);

    const cardList = shuffle(
      selectedPairs.flatMap((item, index) => [
        {
          id: index * 2,
          content: item.french_expression,
          pairId: index,
          matched: false,
        },
        {
          id: index * 2 + 1,
          content: item.english_expression,
          pairId: index,
          matched: false,
        },
      ])
    );

    setBoard(cardList);
    setFlipped([]);
    setMatched([]);
    setGameOver(false);
  }, [words, subject, level, totalCards, shuffle]);

  // Start a new game when subject/level/words change

  useEffect(() => {
    if (subject && words.length > 0) {
      startNewGame();
    }
  }, [subject, level, words, startNewGame]);

  // Check win condition and save progress
  useEffect(() => {
    if (matched.length > 0 && matched.length === board.length) {
      setGameOver(true);
      saveProgress();
    }
  }, [matched, board, saveProgress]);

  const handleFlip = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || card.matched)
      return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped.map((id) =>
        board.find((c) => c.id === id)
      );

      if (first.pairId === second.pairId) {
        setMatched((prev) => [...prev, first.id, second.id]);
      }

      setTimeout(() => setFlipped([]), 2200);
    }
  };

  return (
    <div className="memory-game">
      <div className="memory-header">
        <h2 className="memory-title">Memory Game</h2>

        <div className="controls">
          <label className="subject-label">Choose Subject:</label>
          <select
            className="subject-select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {" "}
            <option value="">--Select--</option>
            {[...new Set(words.flatMap((w) => w.subjects))].map(
              (
                subj //What is the difference between map and flatMap??
              ) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              )
            )}
          </select>

          {subject && (
            <>
              <p>Level: {level}</p>
              <button onClick={() => startNewGame()}>Restart Level</button>
            </>
          )}
        </div>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {board.map((card) => (
          <div
            key={card.id}
            className={`card memory-card ${
              flipped.includes(card.id) || matched.includes(card.id)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleFlip(card)}
          >
            <div className="m-card-inner">
              <div className="m-card-front"></div>
              <div className="m-card-back">{card.content}</div>
            </div>
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h3>Level Complete!</h3>
          <button onClick={() => setLevel(level + 1)}>Next Level</button>
        </div>
      )}
    </div>
  );
}

export default MemoryGame;

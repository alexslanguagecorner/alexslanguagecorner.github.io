import React, { useState, useEffect } from "react";
import "./LetterSoup.scss";

const LetterSoupSetup = ({ items }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [mode, setMode] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [manualWords, setManualWords] = useState([]);

  useEffect(() => {
    const subjectsSet = new Set();
    items.forEach((item) => {
      if (Array.isArray(item.subjects) && item.subjects.length > 0) {
        item.subjects.forEach((subject) => {
          if (subject && typeof subject === "string") {
            subjectsSet.add(subject);
          }
        });
      }
      /*item.subjects.forEach((subject) => {
        if (subject) subjectsSet.add(subject);
      });*/
    });
    setAvailableSubjects(Array.from(subjectsSet).sort());
  }, [items]);

  const handleStart = () => {
    if (!selectedSubject || !mode) return;

    const gameState = {
      subject: selectedSubject,
      mode,
      ...(mode === "difficulty" && { difficulty }),
      ...(mode === "manual" && { words: manualWords }),
    };
    console.log("Starting Game with:", gameState);
    // Replace this with actual game logic or mavigation
  };

  return (
    <div
      id="ls-setup-container setup-container"
      className="ls-setup-container setup container"
    >
      <div className="ls-tagline">
        <h2>Set up your Letter Soup Game</h2>
        <label className="subject-label">Choose your subject:</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">-- Select subject --</option>
          {availableSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className="ls-menu"></div>
      <div className="sub-about"></div>
    </div>
  );
};

export default LetterSoupSetup;

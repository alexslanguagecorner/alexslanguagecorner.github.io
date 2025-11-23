import React, { useState, useEffect } from "react";
import "./SentenceSetup.scss";

const SentenceSetup = ({ items, onStart }) => {
  const [mode, setMode] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState([]);

  // uploading unique subjects only for sentences
  useEffect(() => {
    const subjectsSet = new Set();
    items.forEach((item) => {
      if (
        Array.isArray(item.subjects) &&
        (item.subjects.includes("sentences") ||
          item.subjects.includes("phrases"))
      ) {
        item.subjects.forEach((subject) => {
          if (subject && (subject !== "sentences" || subject !== "phrases")) {
            subjectsSet.add(subject);
          }
        });
      }
    });
    setAvailableSubjects(Array.from(subjectsSet).sort());
  }, [items]);

  const handleStart = () => {
    if (!mode) return;
    if (mode === "random" && !selectedSubject) return;

    const setupData = {
      mode,
      subject: mode === "random" ? selectedSubject : null,
    };

    console.log("Starting Word Soup Game with:", setupData);
    if (onStart) onStart(setupData);
  };

  return (
    <div className="sentence-setup-container">
      <div className="setup-container">
        <h2>Set up your Word Soup Game</h2>

        {/* Selection Container*/}
        <div className="selection-container">
          {/* Mode Choice */}
          <div className="mode-select">
            <label>
              <input
                type="radio"
                value="browse"
                checked={mode === "browse"}
                onChange={(e) => setMode(e.target.value)}
              />
              <span>Browse & Select</span>
            </label>
            <label>
              <input
                type="radio"
                value="random"
                checked={mode === "random"}
                onChange={(e) => setMode(e.target.value)}
              />
              <span>Random Sentences</span>
            </label>
          </div>

          {/* If random -> select subject*/}
          {mode === "random" && (
            <div className="subject-select">
              <label>Choose subject:</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value=""> --Select subject-- </option>
                {availableSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button onClick={handleStart} className="start-btn">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentenceSetup;

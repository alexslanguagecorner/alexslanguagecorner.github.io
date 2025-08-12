import React from "react";
import "./GamesSection.scss";

const GamesSection = () => {
  return (
    <div id="games-section" className="games-section">
      <div className="games-tagline">
        <h1>Pick a game and learn by playing.</h1>
      </div>
      <div className="games-menu">
        <a href="/memory-game" className="gm-card hero-card">
          <h3>Memory Game</h3>
          <p>
            Practice vocabulary and strengthen neural connections with this
            timeless classic.
          </p>
        </a>
        <a href="/letter-soup" className="gm-card hero-card">
          <h3>Letter Soup</h3>
          <p>
            Relax by practicing vocabulary while sipping your favourite
            bavarage.
          </p>
        </a>
      </div>
      <div className="sub-about"></div>
    </div>
  );
};

export default GamesSection;

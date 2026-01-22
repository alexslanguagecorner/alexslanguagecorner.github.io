import React from "react";
import { Link } from "react-router-dom";
import "./GamesSection.scss";

const GamesSection = () => {
  return (
    <div id="games-section" className="games-section">
      <div className="games-tagline">
        <h1>Pick a game and learn by playing.</h1>
      </div>
      <div className="games-menu">
        <Link to="/memory-game" className="gm-card hero-card">
          <h3>Memory Game</h3>
          <p>
            Practice vocabulary and strengthen neural connections with this
            timeless classic.
          </p>
        </Link>
        <Link to="/letter-soup" className="gm-card hero-card">
          <h3>Letter Soup</h3>
          <p>
            {/*Relax by practicing vocabulary while sipping your favourite
            bavarage.*/} 
            This game and other ones are coming soon.
          </p>
        </Link>
        <Link to="/word-soup" className="gm-card hero-card">
          <h3>Word Soup</h3>
          <p> Learn sentence structure by arranging a mix of words.</p>
        </Link>
      </div>
      <div className="sub-about"></div>
    </div>
  );
};

export default GamesSection;

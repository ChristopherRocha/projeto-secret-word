import React from "react";
//css
import "./GameOverScreen.css";

const GameOverScreen = ({ reiniciarJogo, score, selectedWord }) => {
  return (
    <div className="endgame_component">
      <h1>Game Over</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <h4>
        A palavra correta era:{" "}
        <span className="selectedWord">{selectedWord}</span>
      </h4>
      <button onClick={reiniciarJogo}>
        <i class="fa fa-refresh"></i>
      </button>
    </div>
  );
};

export default GameOverScreen;

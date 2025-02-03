import React, { useState, useRef } from "react";
//css
import "./GameScreen.css";

const GameScreen = ({
  verificarLetras,
  selectedWord,
  selectedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  score,
  guesses,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(letter);
    verificarLetras(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  return (
    <div className="game_component">
      <p className="points">Pontuação:{score}</p>
      <h1 className="game_title">Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{selectedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar alguma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras encontradas:</p>
        <span className="dinamic-letter">
          {guessedLetters.map((letter, i) => (
            <span key={i}>{letter},</span>
          ))}
        </span>
        <p>Letras erradas:</p>
        <span className="dinamic-letter">
          {wrongLetters.map((letter, i) => (
            <span>{letter},</span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default GameScreen;

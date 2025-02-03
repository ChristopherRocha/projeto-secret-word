// React
import { useState, useCallback, useEffect } from "react";
//CSS
import "./App.css";
//Data
import { wordsList } from "./data/words";
//Components
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import GameOverScreen from "./components/GameOverScreen";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [selectedWord, setSelectedWord] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const selectWordAndCategory = () => {
    //seleciona uma categoria aleatória
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //seleciona uma palavra aleatória
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };
  //inicia o jogo
  const iniciarJogo = () => {
    clearLetterStates();
    //escolhe a palavra inicial
    const { word, category } = selectWordAndCategory();

    //transforma a palavra em um array de letras

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((c) => c.toLowerCase());

    //preencher states

    setSelectedWord(word);
    setSelectedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  const verificarLetras = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    //termina o jogo
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  const reiniciarJogo = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  //Verifica condição de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (
      guessedLetters.length === uniqueLetters.length &&
      gameStage === "game"
    ) {
      //adiciona pontuação
      setScore((actualScore) => (actualScore += 100));

      //reescolhe uma palavra
      iniciarJogo();
    }
  }, [guessedLetters, letters, iniciarJogo]);

  return (
    <div className="MainApp">
      {gameStage === "start" && <StartScreen iniciarJogo={iniciarJogo} />}
      {gameStage === "game" && (
        <GameScreen
          verificarLetras={verificarLetras}
          selectedWord={selectedWord}
          selectedCategory={selectedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          score={score}
          guesses={guesses}
        />
      )}
      {gameStage === "end" && (
        <GameOverScreen
          reiniciarJogo={reiniciarJogo}
          score={score}
          selectedWord={selectedWord}
        />
      )}
    </div>
  );
}

export default App;

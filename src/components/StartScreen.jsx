import "./StartScreen.css";
const StartScreen = ({ iniciarJogo }) => {
  return (
    <div className="start_component">
      <div className="main_text">
        <h1>Secret Word</h1>
      </div>

      <button onClick={iniciarJogo}>&#9654;</button>
    </div>
  );
};

export default StartScreen;

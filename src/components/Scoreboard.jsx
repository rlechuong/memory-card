import "../styles/Scoreboard.css";

function Scoreboard({ scoreData }) {
  return (
    <div className="scoreboard">
      <p>
        Current Score: <strong>{scoreData.currentScore}</strong>
      </p>
      <p>
        Best Score: <strong>{scoreData.bestScore}</strong>
      </p>
    </div>
  );
}

export default Scoreboard;

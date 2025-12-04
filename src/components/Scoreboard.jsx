function Scoreboard({ scoreData }) {
  return (
    <div className="scoreboard">
      <p>Current Score: {scoreData.currentScore} </p>
      <p>Best Score: {scoreData.bestScore}</p>
    </div>
  );
}

export default Scoreboard;

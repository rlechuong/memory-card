import "../styles/GameStatus.css";

function GameStatus({ gameStatus, clickedTeams, scoreData, onPlayAgain, onTryAgain, onNewCards }) {
  return (
    <div className="game-status">
      {gameStatus?.type === "win" && (
        <div className="win-status">
          <h3>You Won!</h3>
          <button onClick={onPlayAgain}>Play Again!</button>
          <button onClick={onNewCards}>New Cards</button>
        </div>
      )}

      {gameStatus?.type === "loss" && (
        <div className="loss-status">
          <h3>You Lost! Final Score: {scoreData.currentScore}</h3>
          <button onClick={onTryAgain}>Try Again!</button>
          <button onClick={onNewCards}>New Cards</button>
        </div>
      )}

      {gameStatus === null && (
        <div className="playing-status">
          <p>
            {clickedTeams.length === 0
              ? "Click Each Team Once!"
              : `${clickedTeams.length} / 12 Teams Clicked`}
          </p>
        </div>
      )}
    </div>
  );
}

export default GameStatus;

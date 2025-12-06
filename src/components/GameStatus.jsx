function GameStatus({ gameStatus, scoreData, onPlayAgain, onTryAgain, onNewCards }) {
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
    </div>
  );
}

export default GameStatus;

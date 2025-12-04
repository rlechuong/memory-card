import Card from "./Card";

function GameBoard({ activeTeams }) {
  return (
    <div className="game-board">
      {activeTeams.map((team) => (
        <Card key={team.team.id} team={team} />
      ))}
    </div>
  );
}

export default GameBoard;

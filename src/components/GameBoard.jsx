import Card from "./Card";

function GameBoard({ activeTeams, onCardClick }) {
  return (
    <div className="game-board">
      {activeTeams.map((team) => (
        <Card key={team.team.id} team={team} onClick={() => onCardClick(team.team.id)} />
      ))}
    </div>
  );
}

export default GameBoard;

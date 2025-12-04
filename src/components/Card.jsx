function Card({ team, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={team.team.logos[0].href} alt={team.team.displayName} />
      <h3>{team.team.displayName}</h3>
    </div>
  );
}

export default Card;

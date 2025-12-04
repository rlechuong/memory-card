import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import GameBoard from "./components/GameBoard";
import Scoreboard from "./components/Scoreboard";

function App() {
  const [teams, setTeams] = useState([]);
  const [activeTeams, setActiveTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scoreData, setScoreData] = useState({ currentScore: 0, bestScore: 0 });

  const getRandomTeams = (teams, count) => {
    const shuffled = [...teams];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
  };

  const handleCardClick = (teamID) => {
    console.log("Clicked Team ID:", teamID);
  };

  useEffect(() => {
    fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams")
      .then((response) => response.json())
      .then((data) => {
        console.log("Full API Response:", data);
        console.log("Teams Array:", data.sports[0].leagues[0].teams);
        console.log("First Team Details:", data.sports[0].leagues[0].teams[0].team);
        const teamsData = data.sports[0].leagues[0].teams;
        setTeams(teamsData);
        setActiveTeams(getRandomTeams(teamsData, 12));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error Fetching Teams:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="App">
      <h1>Memory Card</h1>
      <Scoreboard scoreData={scoreData} />
      <p>Number Of Teams: {teams.length}</p>

      <GameBoard activeTeams={activeTeams} onCardClick={handleCardClick} />
    </div>
  );
}

export default App;

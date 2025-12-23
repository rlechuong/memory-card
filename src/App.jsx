import { useEffect, useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import GameStatus from "./components/GameStatus";
import Scoreboard from "./components/Scoreboard";

const shuffleTeams = (teams) => {
  const shuffled = [...teams];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const getRandomTeams = (teams, count) => {
  return shuffleTeams(teams).slice(0, count);
};

function App() {
  const [teams, setTeams] = useState([]);
  const [activeTeams, setActiveTeams] = useState([]);
  const [clickedTeams, setClickedTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scoreData, setScoreData] = useState({ currentScore: 0, bestScore: 0 });
  const [gameStatus, setGameStatus] = useState(null);

  const handleCardClick = (teamID) => {
    if (gameStatus !== null) {
      return;
    }

    if (clickedTeams.includes(teamID)) {
      if (scoreData.currentScore > scoreData.bestScore) {
        setScoreData({ ...scoreData, bestScore: scoreData.currentScore });
      }

      setGameStatus({ type: "loss" });
    } else {
      const newClickedTeams = [...clickedTeams, teamID];
      const newScore = scoreData.currentScore + 1;

      if (newClickedTeams.length === 12) {
        const finalBestScore = newScore > scoreData.bestScore ? newScore : scoreData.bestScore;

        setScoreData({ currentScore: newScore, bestScore: finalBestScore });
        setGameStatus({ type: "win" });
      } else {
        setScoreData({ ...scoreData, currentScore: newScore });
        setClickedTeams(newClickedTeams);
        setActiveTeams(shuffleTeams(activeTeams));
      }
    }
  };

  const handleTryAgain = () => {
    setClickedTeams([]);
    setScoreData({ ...scoreData, currentScore: 0 });
    setGameStatus(null);
  };

  const handlePlayAgain = () => {
    setActiveTeams(shuffleTeams(activeTeams));
    setClickedTeams([]);
    setScoreData({ currentScore: 0, bestScore: scoreData.bestScore });
    setGameStatus(null);
  };

  const handleNewCards = () => {
    setActiveTeams(getRandomTeams(teams, 12));
    setClickedTeams([]);
    setScoreData({ currentScore: 0, bestScore: scoreData.bestScore });
    setGameStatus(null);
  };

  useEffect(() => {
    fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams")
      .then((response) => response.json())
      .then((data) => {
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
    return (
      <div className="App">
        <div className="loading-container">
          <h2>Loading NBA Teams...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Memory Card</h1>
      <GameStatus
        gameStatus={gameStatus}
        clickedTeams={clickedTeams}
        scoreData={scoreData}
        onPlayAgain={handlePlayAgain}
        onTryAgain={handleTryAgain}
        onNewCards={handleNewCards}
      />
      <Scoreboard scoreData={scoreData} />
      <GameBoard activeTeams={activeTeams} onCardClick={handleCardClick} />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams")
      .then((response) => response.json())
      .then((data) => {
        console.log("Full API Response:", data);
        console.log("Teams Array:", data.sports[0].leagues[0].teams);
        console.log("First Team Details:", data.sports[0].leagues[0].teams[0].team);
        setTeams(data.sports[0].leagues[0].teams);
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
      <p>API Data in the browser console!</p>
      <p>Number Of Teams: {teams.length}</p>
    </div>
  );
}

export default App;

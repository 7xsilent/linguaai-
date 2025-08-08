import React from 'react';
import './LeaderboardPage.css';

const LeaderboardPage = () => {
  const leaderboardData = [
    { rank: 1, name: "Alex Johnson", score: 9850, badge: "🏆" },
    { rank: 2, name: "Sarah Miller", score: 9320, badge: "🥈" },
    { rank: 3, name: "David Chen", score: 8790, badge: "🥉" },
    { rank: 4, name: "Emma Wilson", score: 8450, badge: "⭐" },
    { rank: 5, name: "James Brown", score: 8120, badge: "⭐" },
    { rank: 6, name: "Olivia Davis", score: 7980, badge: "⭐" },
    { rank: 7, name: "Michael Taylor", score: 7650, badge: "⭐" },
    { rank: 8, name: "Sophia Martinez", score: 7320, badge: "⭐" },
    { rank: 9, name: "William Anderson", score: 6980, badge: "⭐" },
    { rank: 10, name: "Isabella Thomas", score: 6540, badge: "⭐" },
  ];

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-header">Leaderboard</h2>
      <p className="leaderboard-subtitle">Top learners and their achievements</p>
      
      <div className="table-container">
        <table className="leaderboard-table">
          <thead>
            <tr className="table-header-row">
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Badge</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user) => (
              <tr key={user.rank} className="table-row">
                <td>{user.rank}</td>
                <td>{user.name}</td>
                <td>{user.score.toLocaleString()}</td>
                <td>{user.badge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
const AchievementsPage = () => {
  // Sample achievements data
  const achievementsData = [
    { id: 1, name: "First Steps", description: "Complete your first lesson", earned: true, icon: "👣", date: "2023-05-15" },
    { id: 2, name: "Streak Starter", description: "Maintain a 3-day streak", earned: true, icon: "🔥", date: "2023-05-18" },
    { id: 3, name: "Vocabulary Builder", description: "Learn 50 words", earned: true, icon: "📚", date: "2023-06-02" },
    { id: 4, name: "Weekend Warrior", description: "Complete lessons on 5 weekends", earned: false, icon: "🏆", progress: "3/5" },
    { id: 5, name: "Perfect Pronunciation", description: "Score 100% on 10 speaking exercises", earned: false, icon: "🎤", progress: "6/10" },
    { id: 6, name: "Grammar Guru", description: "Complete all grammar units", earned: false, icon: "🧠", progress: "2/8" },
    { id: 7, name: "Daily Dedication", description: "Practice for 30 consecutive days", earned: false, icon: "⏳", progress: "12/30" },
    { id: 8, name: "Polyglot Path", description: "Learn 1000 words", earned: false, icon: "🌎", progress: "342/1000" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Your Achievements</h2>
      <p style={styles.subtitle}>Track your language learning milestones and badges</p>
      
      <div style={styles.achievementsGrid}>
        {achievementsData.map((achievement) => (
          <div 
            key={achievement.id} 
            style={{
              ...styles.achievementCard,
              backgroundColor: achievement.earned ? '#e3f2fd' : '#f5f5f5',
              opacity: achievement.earned ? 1 : 0.7,
            }}
          >
            <div style={styles.achievementIcon}>{achievement.icon}</div>
            <div style={styles.achievementContent}>
              <h3 style={styles.achievementName}>{achievement.name}</h3>
              <p style={styles.achievementDesc}>{achievement.description}</p>
              {achievement.earned ? (
                <p style={styles.achievementDate}>Earned on: {achievement.date}</p>
              ) : (
                <p style={styles.achievementProgress}>Progress: {achievement.progress}</p>
              )}
            </div>
            <div style={styles.achievementStatus}>
              {achievement.earned ? (
                <span style={styles.earnedBadge}>✓ Earned</span>
              ) : (
                <span style={styles.lockedBadge}>🔒 Locked</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// CSS styles
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '0.5rem',
    fontSize: '2.2rem',
  },
  subtitle: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '1.1rem',
  },
  achievementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  achievementCard: {
    display: 'flex',
    padding: '1.2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    position: 'relative',
    overflow: 'hidden',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
    },
  },
  achievementIcon: {
    fontSize: '2.5rem',
    marginRight: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    margin: '0 0 0.3rem 0',
    color: '#2c3e50',
    fontSize: '1.2rem',
  },
  achievementDesc: {
    margin: '0 0 0.5rem 0',
    color: '#7f8c8d',
    fontSize: '0.9rem',
  },
  achievementDate: {
    margin: '0',
    color: '#27ae60',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  achievementProgress: {
    margin: '0',
    color: '#e67e22',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  achievementStatus: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
  },
  earnedBadge: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '0.2rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
  },
  lockedBadge: {
    color: '#95a5a6',
    fontSize: '0.8rem',
  },
};

export default AchievementsPage;
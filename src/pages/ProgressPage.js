import { useState } from 'react';

const ProgressPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sample progress data
  const progressData = {
    streak: {
      current: 1,
      longest: 14,
      unit: 'days'
    },
    stats: {
      wordsLearned: 0,
      lessonsCompleted: 0,
      hoursSpent: 1,
      accuracy: 82
    },
    weeklyProgress: [
      { day: 'Mon', lessons: 3, minutes: 45 },
      { day: 'Tue', lessons: 4, minutes: 60 },
      { day: 'Wed', lessons: 2, minutes: 30 },
      { day: 'Thu', lessons: 5, minutes: 75 },
      { day: 'Fri', lessons: 1, minutes: 15 },
      { day: 'Sat', lessons: 0, minutes: 0 },
      { day: 'Sun', lessons: 2, minutes: 30 }
    ],
    monthlyProgress: [
      { week: 'Week 1', lessons: 12, words: 45 },
      { week: 'Week 2', lessons: 15, words: 62 },
      { week: 'Week 3', lessons: 8, words: 28 },
      { week: 'Week 4', lessons: 10, words: 38 }
    ]
  };

  // Helper function to render bar chart
  const renderBarChart = (data, key, color) => {
    const maxValue = Math.max(...data.map(item => item[key]));
    return (
      <div style={styles.chartContainer}>
        {data.map((item, index) => (
          <div key={index} style={styles.barChartItem}>
            <div style={styles.barLabel}>{item.day || item.week}</div>
            <div style={styles.barBackground}>
              <div 
                style={{
                  ...styles.barFill,
                  width: `${(item[key] / maxValue) * 100}%`,
                  backgroundColor: color
                }}
              />
            </div>
            <div style={styles.barValue}>{item[key]}</div>
          </div>
        ))}
      </div>
    );
  };

  // Dynamic styles based on dark mode
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: darkMode ? '#1a1a2e' : '#f9f9f9',
      color: darkMode ? '#e6e6e6' : '#333',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s, color 0.3s',
    },
    header: {
      color: darkMode ? '#f8f8f8' : '#2c3e50',
      textAlign: 'center',
      marginBottom: '0.5rem',
      fontSize: '2.2rem',
    },
    subtitle: {
      color: darkMode ? '#b8b8b8' : '#7f8c8d',
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: '1.1rem',
    },
    statsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      marginBottom: '2rem',
    },
    streakCard: {
      backgroundColor: darkMode ? '#16213e' : '#fff',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      textAlign: 'center',
      borderLeft: '5px solid #e74c3c',
      color: darkMode ? '#e6e6e6' : '#333',
      transition: 'background-color 0.3s, color 0.3s',
    },
    streakNumber: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#e74c3c',
      margin: '0.5rem 0',
    },
    streakUnit: {
      fontSize: '1rem',
      color: darkMode ? '#b8b8b8' : '#7f8c8d',
      marginBottom: '0.5rem',
    },
    streakRecord: {
      fontSize: '0.9rem',
      color: darkMode ? '#9ca3af' : '#95a5a6',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
    },
    statCard: {
      backgroundColor: darkMode ? '#16213e' : '#fff',
      padding: '1.2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      textAlign: 'center',
      color: darkMode ? '#e6e6e6' : '#333',
      transition: 'background-color 0.3s, color 0.3s',
    },
    cardHeader: {
      margin: '0 0 0.5rem 0',
      color: darkMode ? '#f8f8f8' : '#2c3e50',
      fontSize: '1rem',
    },
    statNumber: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: darkMode ? '#f8f8f8' : '#2c3e50',
      margin: '0.5rem 0',
    },
    chartSection: {
      backgroundColor: darkMode ? '#16213e' : '#fff',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      marginBottom: '1.5rem',
      color: darkMode ? '#e6e6e6' : '#333',
      transition: 'background-color 0.3s, color 0.3s',
    },
    sectionHeader: {
      margin: '0 0 1.5rem 0',
      color: darkMode ? '#f8f8f8' : '#2c3e50',
      fontSize: '1.2rem',
    },
    chartContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem',
    },
    barChartItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    barLabel: {
      width: '60px',
      fontSize: '0.9rem',
      color: darkMode ? '#b8b8b8' : '#7f8c8d',
    },
    barBackground: {
      flex: 1,
      height: '20px',
      backgroundColor: darkMode ? '#0f3460' : '#ecf0f1',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      borderRadius: '4px',
      transition: 'width 0.5s ease',
    },
    barValue: {
      width: '40px',
      textAlign: 'right',
      fontSize: '0.9rem',
      color: darkMode ? '#f8f8f8' : '#2c3e50',
    },
    toggleButton: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '0.5rem 1rem',
      backgroundColor: darkMode ? '#4b5563' : '#e5e7eb',
      color: darkMode ? '#f3f4f6' : '#111827',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      zIndex: 1000,
      transition: 'background-color 0.3s, color 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.toggleButton}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <h2 style={styles.header}>Your Learning Progress</h2>
      <p style={styles.subtitle}>Track your statistics and improvement over time</p>
      
      <div style={styles.statsContainer}>
        <div style={styles.streakCard}>
          <h3 style={styles.cardHeader}>Current Streak</h3>
          <div style={styles.streakNumber}>{progressData.streak.current}</div>
          <div style={styles.streakUnit}>{progressData.streak.unit}</div>
          <div style={styles.streakRecord}>
            Longest: {progressData.streak.longest} {progressData.streak.unit}
          </div>
        </div>
        
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3 style={styles.cardHeader}>Words Learned</h3>
            <div style={styles.statNumber}>{progressData.stats.wordsLearned}</div>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.cardHeader}>Lessons Completed</h3>
            <div style={styles.statNumber}>{progressData.stats.lessonsCompleted}</div>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.cardHeader}>Hours Spent</h3>
            <div style={styles.statNumber}>{progressData.stats.hoursSpent}</div>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.cardHeader}>Accuracy</h3>
            <div style={styles.statNumber}>{progressData.stats.accuracy}%</div>
          </div>
        </div>
      </div>
      
      <div style={styles.chartSection}>
        <h3 style={styles.sectionHeader}>Weekly Activity</h3>
        {renderBarChart(progressData.weeklyProgress, 'minutes', '#3498db')}
      </div>
      
      <div style={styles.chartSection}>
        <h3 style={styles.sectionHeader}>Monthly Progress</h3>
        {renderBarChart(progressData.monthlyProgress, 'lessons', '#2ecc71')}
      </div>
    </div>
  );
};

export default ProgressPage;
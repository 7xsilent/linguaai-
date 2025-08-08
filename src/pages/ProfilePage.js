import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#3f51b5',
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    userSelect: 'none',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: '1.4rem',
    fontWeight: '600',
  },
  userEmail: {
    color: '#666',
    marginTop: '0.3rem',
  },
  progressCard: {
    backgroundColor: '#f5f5f5',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  progressTitle: {
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#333',
  },
  buttonLogout: {
    marginTop: '2rem',
    padding: '10px 20px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

// Helper: get username from email (before '@')
const getUsernameFromEmail = (email) => {
  if (!email) return 'User';
  return email.split('@')[0];
};

// Helper: get first letter of username or fallback
const getInitialFromEmail = (email) => {
  const username = getUsernameFromEmail(email);
  return username.trim()[0]?.toUpperCase() || 'U';
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({
    lessonsCompleted: 0,
    quizzesTaken: 0,
    totalPoints: 0,
  });

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      // TODO: fetch real progress data from DB here
      setProgress({
        lessonsCompleted: 12,
        quizzesTaken: 8,
        totalPoints: 230,
      });
    }
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      alert('Logout failed. Please try again.');
    }
  };

  if (!user) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading profile...</p>;

  const username = getUsernameFromEmail(user.email);
  const initial = getInitialFromEmail(user.email);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Your Profile</h1>

      <section style={styles.profileSection}>
        <div
          style={{
            ...styles.avatar,
            backgroundColor: '#3f51b5',
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: '700',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          aria-label="User Initial"
        >
          {initial}
        </div>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{username}</div>
          <div style={styles.userEmail}>{user.email}</div>
        </div>
      </section>

      <section>
        <div style={styles.progressCard}>
          <div style={styles.progressTitle}>Lessons Completed</div>
          <div>{progress.lessonsCompleted}</div>
        </div>
        <div style={styles.progressCard}>
          <div style={styles.progressTitle}>Quizzes Taken</div>
          <div>{progress.quizzesTaken}</div>
        </div>
        <div style={styles.progressCard}>
          <div style={styles.progressTitle}>Total Points</div>
          <div>{progress.totalPoints}</div>
        </div>
      </section>

      <button style={styles.buttonLogout} onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default ProfilePage;

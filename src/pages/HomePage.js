// HomePage.js - Updated Version
import React from 'react';
import { FiAward, FiTrendingUp, FiBook, FiMic, FiCheckCircle, FiUsers } from 'react-icons/fi';
import './HomePage.css';

const HomePage = () => {
  const stats = [
    { value: '10,000+', label: 'Active Learners', icon: <FiUsers size={24} /> },
    { value: '98%', label: 'Satisfaction Rate', icon: <FiAward size={24} /> },
    { value: '500+', label: 'Lessons Available', icon: <FiBook size={24} /> }
  ];

  const features = [
    { 
      icon: <FiBook size={24} />, 
      title: 'Structured Curriculum', 
      desc: 'Progress from beginner to advanced with our comprehensive leveled courses designed by language experts' 
    },
    { 
      icon: <FiMic size={24} />, 
      title: 'Speaking Practice', 
      desc: 'Improve pronunciation and fluency with real-time AI feedback on your speaking exercises' 
    },
    { 
      icon: <FiCheckCircle size={24} />, 
      title: 'Grammar Mastery', 
      desc: 'Detailed grammar explanations, interactive exercises, and personalized recommendations' 
    },
    { 
      icon: <FiTrendingUp size={24} />, 
      title: 'Progress Tracking', 
      desc: 'Monitor your improvement with detailed analytics and personalized learning insights' 
    }
  ];

  return (
    <div className="home-container">
      <main className="home-content">
        <header className="hero-section">
          <h1>Master English with AI</h1>
          <p className="subtitle">Your personal digital English professor with adaptive learning technology</p>
          
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </header>

        <section className="features-section">
          <h2>Why Our English Program Works</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <h2>Start Your English Journey Today</h2>
          <p className="cta-subtext">Join thousands of students mastering English with our AI-powered platform</p>
          <div className="cta-buttons">
            <button className="primary-btn">Begin Learning Now</button>
            <button className="secondary-btn">Explore Sample Lessons</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
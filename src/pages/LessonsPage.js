import React, { useState } from "react";
import { generateLessonPlan } from "../services/geminiService";

const LessonsPage = () => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateLesson = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to generate a lesson.');
      return;
    }
    
    setLoading(true);
    setError('');
    setLessonData(null);

    try {
      const lesson = await generateLessonPlan(level, topic);
      
      if (!lesson || !lesson.title) {
        throw new Error('Failed to generate lesson content');
      }
      
      setLessonData(lesson);
    } catch (err) {
      setError(err.message || 'Failed to generate lesson. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const LessonPlanSkeleton = () => (
    <div className="lesson-skeleton">
      <div className="skeleton-header"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-section"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-section"></div>
      <div className="skeleton-activity"></div>
      <div className="skeleton-activity"></div>
    </div>
  );

  return (
    <div className="lessons-container">
      <div className="lesson-generator-card">
        <h2>Generate a New Lesson Plan</h2>
        <p>Fill out the details below to create a customized lesson plan</p>

        <div className="form-grid">
          <div className="form-group">
            <label>Topic</label>
            <input
              type="text"
              placeholder="e.g., Business English"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <button 
            onClick={handleGenerateLesson}
            disabled={loading}
            className="generate-btn"
          >
            {loading ? 'Generating...' : 'Generate Lesson'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      {loading && <LessonPlanSkeleton />}

      {lessonData && (
        <div className="lesson-plan-card">
          <div className="lesson-header">
            <h3>{lessonData.title}</h3>
            <span className="level-badge">{lessonData.subtitle || `${level} Level`}</span>
          </div>

          <div className="lesson-section">
            <h4>Objective</h4>
            <p>{lessonData.objective}</p>
          </div>

          <div className="lesson-section">
            <h4>Vocabulary</h4>
            <ul className="vocabulary-list">
              {lessonData.vocabulary?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="lesson-section">
            <h4>Activities</h4>
            <div className="activities-list">
              {lessonData.activities?.map((activity) => (
                <div key={activity.id} className="activity-card">
                  <div className="activity-header">
                    <span className="activity-number">{activity.id}</span>
                    <h5>{activity.title}</h5>
                    <span className="duration">{activity.duration}</span>
                  </div>
                  <p>{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .lessons-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .lesson-generator-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .lesson-generator-card h2 {
          font-size: 24px;
          margin-bottom: 8px;
          color: #2d3748;
        }

        .lesson-generator-card p {
          color: #718096;
          margin-bottom: 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 500;
          margin-bottom: 8px;
          color: #4a5568;
        }

        .form-group input,
        .form-group select {
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 16px;
        }

        .generate-btn {
          background: #4299e1;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 500;
          cursor: pointer;
          align-self: flex-end;
          transition: background 0.2s;
        }

        .generate-btn:hover {
          background: #3182ce;
        }

        .generate-btn:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }

        .error-message {
          color: #e53e3e;
          margin-top: 16px;
          padding: 12px;
          background: #fff5f5;
          border-radius: 8px;
          border: 1px solid #fed7d7;
        }

        .lesson-plan-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .lesson-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .lesson-header h3 {
          font-size: 22px;
          color: #2d3748;
          margin: 0;
        }

        .level-badge {
          background: #ebf8ff;
          color: #3182ce;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .lesson-section {
          margin-bottom: 24px;
        }

        .lesson-section h4 {
          font-size: 18px;
          color: #2d3748;
          margin-bottom: 12px;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 8px;
        }

        .vocabulary-list {
          list-style-type: disc;
          padding-left: 24px;
        }

        .vocabulary-list li {
          margin-bottom: 8px;
          color: #4a5568;
        }

        .activities-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-card {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
        }

        .activity-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .activity-number {
          background: #4299e1;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-weight: bold;
        }

        .activity-header h5 {
          margin: 0;
          flex-grow: 1;
          color: #2d3748;
        }

        .duration {
          color: #718096;
          font-size: 14px;
        }

        /* Skeleton Loading Styles */
        .lesson-skeleton {
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .skeleton-header,
        .skeleton-line,
        .skeleton-section,
        .skeleton-item,
        .skeleton-activity {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .skeleton-header {
          height: 32px;
          width: 60%;
          margin-bottom: 24px;
        }

        .skeleton-line {
          height: 16px;
          width: 100%;
        }

        .skeleton-line:nth-child(3) {
          width: 80%;
        }

        .skeleton-line:nth-child(4) {
          width: 70%;
          margin-bottom: 24px;
        }

        .skeleton-section {
          height: 24px;
          width: 30%;
          margin-bottom: 16px;
        }

        .skeleton-item {
          height: 16px;
          width: 90%;
          margin-left: 24px;
        }

        .skeleton-item:nth-child(7) {
          width: 85%;
        }

        .skeleton-activity {
          height: 80px;
          width: 100%;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .generate-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default LessonsPage;
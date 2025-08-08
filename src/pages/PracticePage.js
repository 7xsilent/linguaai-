import React, { useState } from 'react';
import { generatePracticeQuestions } from '../services/geminiService';

const PracticePage = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleStart = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic to practice');
      return;
    }
    setLoading(true);
    try {
      const generated = await generatePracticeQuestions(topic);
      setQuestions(generated);
      setStarted(true);
      setCurrentIndex(0);
      setScore(0);
      setShowScore(false);
      setCompleted(false);
      setSelectedAnswer('');
    } catch (err) {
      alert('Failed to load questions. Please try again.');
    }
    setLoading(false);
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    const currentQuestion = questions[currentIndex];
    if (currentQuestion.answer.trim().toLowerCase() === option.trim().toLowerCase()) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer('');
    } else {
      setCompleted(true);
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setTopic('');
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setCompleted(false);
    setStarted(false);
    setShowScore(false);
  };

  return (
    <div className={`practice-container ${darkMode ? 'dark-mode' : ''}`}>
      <button 
        className="toggle-button"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <div className="practice-header">
        <h1>📚 Language Practice</h1>
        <p>Test your knowledge with AI-generated questions</p>
      </div>

      {!started ? (
        <div className="start-screen">
          <div className="input-group">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g., verbs, nouns, tenses)"
              className="topic-input"
            />
            <button
              onClick={handleStart}
              disabled={loading}
              className="start-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating Questions...
                </>
              ) : (
                'Start Practice'
              )}
            </button>
          </div>
        </div>
      ) : null}

      {started && !completed && questions.length > 0 && questions[currentIndex] ? (
        <div className="question-card">
          <div className="progress-indicator">
            Question {currentIndex + 1} of {questions.length}
          </div>
          
          <h2 className="question-text">{questions[currentIndex].question}</h2>
          
          <div className="options-grid">
            {questions[currentIndex].options.map((opt, idx) => {
              const isCorrect = opt.trim().toLowerCase() === questions[currentIndex].answer.trim().toLowerCase();
              const isSelected = selectedAnswer === opt;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className={`option-button ${
                    selectedAnswer 
                      ? isCorrect 
                        ? 'correct' 
                        : isSelected 
                          ? 'incorrect' 
                          : ''
                      : ''
                  } ${selectedAnswer ? 'answered' : ''}`}
                  disabled={!!selectedAnswer}
                >
                  {opt}
                  {selectedAnswer && isCorrect && (
                    <span className="correct-indicator">✓ Correct Answer</span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <div className="feedback-section">
              <div className="answer-feedback">
                {selectedAnswer.trim().toLowerCase() === questions[currentIndex].answer.trim().toLowerCase() ? (
                  <p className="feedback-correct">✅ Correct! Well done!</p>
                ) : (
                  <p className="feedback-incorrect">❌ Incorrect. The correct answer was: <strong>{questions[currentIndex].answer}</strong></p>
                )}
              </div>
              <button onClick={handleNext} className="next-button">
                {currentIndex + 1 < questions.length ? (
                  <>
                    Next Question <span>→</span>
                  </>
                ) : (
                  'See Results'
                )}
              </button>
            </div>
          )}
        </div>
      ) : null}

      {showScore && (
        <div className="results-card">
          <div className="score-display">
            <h2>Test Completed! 🎉</h2>
            <div className="score-circle">
              <span>{score}</span>
              <small>/{questions.length}</small>
            </div>
            <p className="score-message">
              {score === questions.length
                ? 'Perfect! You nailed it!'
                : score >= questions.length / 2
                ? 'Good job! Keep practicing!'
                : 'Keep learning! You got this!'}
            </p>
          </div>
          <button onClick={handleRestart} className="restart-button">
            Practice Another Topic
          </button>
        </div>
      )}

      <style jsx>{`
        .practice-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #2d3748;
          transition: all 0.3s ease;
        }

        .dark-mode {
          background-color: #1a1a2e;
          color: #e6e6e6;
        }

        .dark-mode .practice-header h1 {
          color: #f8f8f8;
        }

        .dark-mode .practice-header p {
          color: #b8b8b8;
        }

        .dark-mode .start-screen,
        .dark-mode .question-card,
        .dark-mode .results-card {
          background-color: #16213e;
          color: #e6e6e6;
        }

        .dark-mode .topic-input {
          background-color: #0f3460;
          color: #e6e6e6;
          border-color: #374151;
        }

        .dark-mode .option-button {
          background-color: #0f3460;
          color: #e6e6e6;
          border-color: #374151;
        }

        .dark-mode .option-button:hover:not(.answered) {
          background-color: #1e3a8a;
        }

        .

        .dark-mode .toggle-button {
          background-color: #e5e7eb;
          color: #111827;
        }

        .practice-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .practice-header h1 {
          font-size: 2.5rem;
          color: #4a5568;
          margin-bottom: 0.5rem;
        }

        .practice-header p {
          color: #718096;
          font-size: 1.1rem;
        }

        .start-screen {
          background: #ffffff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .topic-input {
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .topic-input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
        }

        .start-button {
          padding: 1rem;
          background: #4299e1;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .start-button:hover {
          background: #3182ce;
        }

        .start-button:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }

        .spinner {
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .question-card {
          background: #ffffffff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
          position: relative;
        }

        .progress-indicator {
          color: #718096;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .question-text {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: #02060cff;
          line-height: 1.5;
        }

        .options-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .option-button {
          padding: 1rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .option-button:hover:not(.answered) {
          background: #ebf8ff;
          border-color: #bee3f8;
        }

        .option-button.correct {
          background: #f0fff4;
          border-color: #9ae6b4;
          color: #2f855a;
          border-left: 6px solid #38a169;
        }

        .option-button.incorrect {
          background: #fff5f5;
          border-color: #fed7d7;
          color: #c53030;
          border-left: 6px solid #e53e3e;
        }

        .option-button.answered {
          cursor: default;
        }

        .correct-indicator {
          position: absolute;
          right: 1rem;
          color: #38a169;
          font-weight: bold;
        }

        .feedback-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .answer-feedback {
          padding: 1rem;
          border-radius: 8px;
          background-color: #f8fafc;
        }

        .feedback-correct {
          color: #2f855a;
          font-weight: bold;
          margin: 0;
        }

        .feedback-incorrect {
          color: #c53030;
          margin: 0;
        }

        .dark-mode .feedback-correct {
          color: #34d399;
        }

        .dark-mode .feedback-incorrect {
          color: #f87171;
        }

        .dark-mode .answer-feedback {
          background-color: #0f3460;
        }

        .next-button {
          padding: 0.75rem 1.5rem;
          background: #4299e1;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          align-self: flex-end;
        }

        .next-button:hover {
          background: #3182ce;
        }

        .results-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          text-align: center;
        }

        .score-display {
          margin-bottom: 2rem;
        }

        .score-display h2 {
          color: #4a5568;
          margin-bottom: 1rem;
        }

        .score-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #ebf8ff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-weight: bold;
        }

        .score-circle span {
          font-size: 3rem;
          color: #2b6cb0;
        }

        .score-circle small {
          font-size: 1rem;
          color: #718096;
        }

        .score-message {
          font-size: 1.1rem;
          color: #4a5568;
        }

        .restart-button {
          padding: 1rem 2rem;
          background: #4299e1;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .restart-button:hover {
          background: #3182ce;
        }

        @media (max-width: 640px) {
          .practice-container {
            padding: 1rem;
          }
          
          .practice-header h1 {
            font-size: 2rem;
          }
          
          .question-card,
          .start-screen,
          .results-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PracticePage;
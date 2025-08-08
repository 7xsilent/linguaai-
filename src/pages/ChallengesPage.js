import React, { useState } from 'react';
import { generateChallengeFromGemini } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { speakText, stopSpeaking } from '../utils/speechUtils';
import './ChallengesPage.css';

const ChallengesPage = () => {
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const topic = `${selectedLevel}-level learner`;
    const result = await generateChallengeFromGemini(topic);
    setChallenge(result);
    setLoading(false);
  };

  const handleSpeak = () => {
    if (challenge) {
      speakText(challenge);
      setIsSpeaking(true);
    }
  };

  const handleStop = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  return (
    <div className="challenges-container">
      <h2>🎯 Language Challenge Generator</h2>

      <div className="level-selector">
        <label htmlFor="level">Choose Level:</label>
        <select
          id="level"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button 
          className="generate-btn"
          onClick={handleGenerate} 
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span> Generating...
            </>
          ) : (
            'Generate Challenge'
          )}
        </button>
      </div>

      {challenge && (
        <div className="challenge-content">
          <ReactMarkdown>{challenge}</ReactMarkdown>
        </div>
      )}
      
      {challenge && (
        <div className="action-buttons">
          <button onClick={() => setChallenge('')} className="clear-btn">
            ❌ Clear
          </button>
          <div className="speech-controls">
            <button onClick={handleSpeak} disabled={isSpeaking}>
              🔊 Speak
            </button>
            <button onClick={handleStop} disabled={!isSpeaking}>
              🔇 Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengesPage;
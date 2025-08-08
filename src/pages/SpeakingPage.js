// src/pages/SpeakingPage.js
import React, { useState, useRef } from 'react';
import './SpeakingPage.css';
import { getSpeakingFeedback, getPronunciationFeedback } from '../services/geminiService';

const synth = window.speechSynthesis;

const SpeakingPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFeedbackButton, setShowFeedbackButton] = useState(false);
  const utteranceRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = new SpeechRecognition();
  mic.continuous = false;
  mic.interimResults = false;
  mic.lang = 'en-US';

  const speak = (text) => {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/\*/g, ''));
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
    utteranceRef.current = utterance;
  };

  const stopSpeaking = () => {
    synth.cancel();
  };

  const startListening = () => {
    setTranscript('');
    setFeedback('');
    setPronunciation('');
    setIsListening(true);
    mic.start();

    mic.onresult = async (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setIsListening(false);
      mic.stop();
      setShowFeedbackButton(true); // Show feedback button after speech
      speak(`You said: ${result}. Let me check if it's correct.`);
    };

    mic.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      setIsListening(false);
    };
  };

  const handleAIPronunciationFeedback = async () => {
    setLoading(true);
    const response = await getPronunciationFeedback(transcript);
    setPronunciation(response);
    speak(response);
    setLoading(false);
  };

  return (
    <div className="speaking-page">
      <h2>🗣️ Speaking Practice</h2>
      
      <div className="chat-bar">
        <input
          type="text"
          value={transcript}
          placeholder="Speak something..."
          disabled
        />
        <button onClick={startListening} disabled={isListening}>
          🎤
        </button>
      </div>

      {transcript && (
        <div className="result">
          <strong>You said:</strong> {transcript}
        </div>
      )}

      {loading && <p>⏳ Getting feedback...</p>}

      {showFeedbackButton && (
        <button onClick={handleAIPronunciationFeedback} className="ai-feedback-button">
          🤖 AI Feedback
        </button>
      )}

      {pronunciation && (
        <div className="feedback">
          <strong>AI Feedback:</strong>
          <p>{pronunciation}</p>
          <button onClick={stopSpeaking} className="stop-speaking-button">
            🛑 Stop Speaking
          </button>
        </div>
      )}
    </div>
  );
};

export default SpeakingPage;

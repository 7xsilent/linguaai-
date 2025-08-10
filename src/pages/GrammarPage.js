// src/pages/GrammarPage.js
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { FiSend, FiRotateCw } from 'react-icons/fi';
import { BsCheckCircle, BsExclamationTriangle } from 'react-icons/bs';
import './pageStyles.css';
import { grammarCheck } from '../services/geminiService';

const GrammarPage = () => {
  const [input, setInput] = useState('');
  const [correction, setCorrection] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckGrammar = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setCorrection('');

    try {
      const result = await grammarCheck(input);
      setCorrection(result);
    } catch (err) {
      console.error(err);
      setError('Error fetching grammar correction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="header-section">
        <h2 className="page-title">
          <span className="highlight">Grammar</span> Checker
        </h2>
        <p className="page-subtitle">Polish your writing with AI-powered corrections</p>
      </div>

      <div className="input-section">
        <div className="textarea-container">
          <textarea
            className="input-area"
            placeholder="Enter your text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="5"
          />
          <div className="word-count">{input.length} characters</div>
        </div>

        <button 
          className={`submit-button ${loading ? 'loading' : ''}`} 
          onClick={handleCheckGrammar} 
          disabled={loading}
        >
          {loading ? (
            <>
              <FiRotateCw className="spin-icon" /> Processing...
            </>
          ) : (
            <>
              <FiSend /> Check Grammar
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <BsExclamationTriangle className="error-icon" />
          {error}
        </div>
      )}

      {correction && (
        <div className="result-section">
          <div className="result-header">
            <BsCheckCircle className="success-icon" />
            <h3>Grammar Analysis</h3>
          </div>
          <div className="output-box">
            <Markdown>{correction}</Markdown>
          </div>
        </div>
      )}

      <div className="tips-section">
        <h4>Writing Tips:</h4>
        <ul>
          <li>Keep sentences clear and concise</li>
          <li>Check subject-verb agreement</li>
          <li>Use active voice when possible</li>
          <li>Proofread for punctuation</li>
        </ul>
      </div>
    </div>
  );
};

export default GrammarPage;

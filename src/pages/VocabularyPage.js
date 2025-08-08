import React, { useState } from 'react';
import { getVocabulary } from '../services/geminiService';

const VocabularyPage = () => {
  const [vocabulary, setVocabulary] = useState([]);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }

    setLoading(true);
    setError('');
    setDownloadUrl(null);

    try {
      const response = await getVocabulary(topic);

      if (Array.isArray(response)) {
        setVocabulary(response);

        // Create CSV content
        const csv = ['Word,Meaning', ...response.map(item => `"${item.word}","${item.meaning}"`)].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        setDownloadUrl(URL.createObjectURL(blob));
      } else {
        throw new Error('Invalid vocabulary data');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch vocabulary. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vocabulary-container">
      <div className="vocabulary-header">
        <h1>📖 Vocabulary Builder</h1>
        <p>Generate and learn new words on any topic</p>
      </div>

      <div className="vocabulary-generator">
        <div className="input-group">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g., Business, Travel, Technology)"
            className="topic-input"
          />
          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="generate-button"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              'Generate Vocabulary'
            )}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      {vocabulary.length > 0 && (
        <div className="vocabulary-results">
          <div className="results-header">
            <h2>{topic} Vocabulary</h2>
            {downloadUrl && (
              <a 
                href={downloadUrl} 
                download={`${topic}-vocabulary.csv`}
                className="download-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
                Download CSV
              </a>
            )}
          </div>

          <div className="vocabulary-list">
            {vocabulary.map((item, index) => (
              <div key={index} className="vocabulary-card">
                <div className="word-header">
                  <span className="word-number">{index + 1}</span>
                  <h3>{item.word}</h3>
                </div>
                <p className="word-meaning">{item.meaning}</p>
                {item.example && (
                  <p className="word-example">
                    <em>Example: {item.example}</em>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .vocabulary-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #2d3748;
        }

        .vocabulary-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .vocabulary-header h1 {
          font-size: 2.5rem;
          color: #4a5568;
          margin-bottom: 0.5rem;
        }

        .vocabulary-header p {
          color: #718096;
          font-size: 1.1rem;
        }

        .vocabulary-generator {
          background: #ffffff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
        }

        .input-group {
          display: flex;
          gap: 1rem;
        }

        .topic-input {
          flex: 1;
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

        .generate-button {
          padding: 0 2rem;
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
        }

        .generate-button:hover {
          background: #3182ce;
        }

        .generate-button:disabled {
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

        .error-message {
          color: #e53e3e;
          margin-top: 1rem;
          padding: 0.75rem;
          background: #fff5f5;
          border-radius: 8px;
          border: 1px solid #fed7d7;
        }

        .vocabulary-results {
          background: #ffffff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .results-header h2 {
          font-size: 1.5rem;
          color: #2d3748;
          margin: 0;
        }

        .download-button {
          padding: 0.5rem 1rem;
          background: #f7fafc;
          color: #2d3748;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .download-button:hover {
          background: #ebf8ff;
          border-color: #bee3f8;
        }

        .vocabulary-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .vocabulary-card {
          background: #f7fafc;
          border-radius: 8px;
          padding: 1.5rem;
          border: 1px solid #e2e8f0;
          transition: all 0.2s;
        }

        .vocabulary-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .word-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .word-number {
          background: #4299e1;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .word-header h3 {
          margin: 0;
          color: #2d3748;
          font-size: 1.2rem;
        }

        .word-meaning {
          color: #4a5568;
          margin: 0.5rem 0 0 0;
          line-height: 1.5;
        }

        .word-example {
          color: #718096;
          margin: 0.5rem 0 0 0;
          font-style: italic;
          padding-left: 1rem;
          border-left: 2px solid #e2e8f0;
        }

        @media (max-width: 640px) {
          .input-group {
            flex-direction: column;
          }

          .generate-button {
            width: 100%;
            justify-content: center;
          }

          .results-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .vocabulary-container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VocabularyPage;
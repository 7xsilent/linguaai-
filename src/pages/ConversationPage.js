import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../services/geminiService';
import './ConversationPage.css';

const ConversationPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 0,
      sender: 'ai',
      text: 'Hello! I\'m your language tutor AI. Ask me anything about learning languages — grammar, vocabulary, pronunciation, or culture.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { id: messages.length, sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const aiResponse = await getChatbotResponse(input.trim());
      const aiMsg = { id: messages.length + 1, sender: 'ai', text: aiResponse.trim() };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg = { id: messages.length + 1, sender: 'ai', text: 'Sorry, something went wrong. Please try again.' };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage();
    }
  };

  return (
    <div className="conversation-container">
      <header className="conversation-header">Language Tutor Chat</header>
      <section className="messages-container">
        {messages.map(({ id, sender, text }) => (
          <div key={id} className={`message-row ${sender}`}>
            <div className={`message-bubble ${sender}`}>{text}</div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </section>

      <form className="input-container" onSubmit={(e) => { e.preventDefault(); if (!loading) sendMessage(); }}>
        <textarea
          rows={1}
          className="message-input"
          placeholder="Type your message about language learning..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          type="submit"
          className="send-button"
          disabled={loading || !input.trim()}
        >
          {loading ? 'Typing...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ConversationPage;
// src/utils/speechUtils.js

// Initialize Speech Synthesis API
const synth = window.speechSynthesis;

/**
 * Speak the provided text aloud using SpeechSynthesis.
 * @param {string} text - Text to be spoken aloud.
 */
export const speakText = (text) => {
  if (!text) return;

  // Stop any ongoing speech
  if (synth.speaking) {
    synth.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1; // Speaking speed
  utterance.pitch = 1; // Voice pitch
  utterance.lang = 'en-US'; // Language

  synth.speak(utterance);
};

/**
 * Stop any ongoing speech immediately.
 */
export const stopSpeaking = () => {
  if (synth.speaking) {
    synth.cancel();
  }
};

/**
 * Start listening for speech input and return the result via a callback.
 * @param {function} onResult - Called with recognized text.
 * @param {function} onEnd - Called when recognition ends.
 */
export const startListening = (onResult, onEnd) => {
  // Use browser's speech recognition API
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error('Speech recognition not supported in this browser.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  recognition.start();
};

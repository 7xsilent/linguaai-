// src/utils/speechUtils.js

let synth = window.speechSynthesis;

export const speakText = (text) => {
  if (synth.speaking) {
    synth.cancel(); // Stop any ongoing speech
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.lang = 'en-US';
  synth.speak(utterance);
};

export const stopSpeaking = () => {
  if (synth.speaking) {
    synth.cancel();
  }
};

export const startListening = (onResult, onEnd) => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
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

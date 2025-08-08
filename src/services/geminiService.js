// src/services/geminiService.js
import axios from "axios";

const API_KEY = "AIzaSyAti7ox9lWAUlWNNr4tD-fAFr0YyokmoG4"; // ✅ REPLACE with your actual API key
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function callGemini(messages) {
  try {
    const res = await axios.post(
      `${GEMINI_URL}?key=${API_KEY}`,
      { contents: messages },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (error) {
    console.error("Gemini API call failed:", error.message);
    throw error;
  }
}


// ✅ Grammar Check
export async function grammarCheck(text) {
  const messages = [{
    role: 'user',
    parts: [{ text: `Check this text for grammar and suggest corrections:\n\n${text}` }]
  }];
  return await callGemini(messages);
}

// ✅ Vocabulary Generator
export async function getVocabulary(topic, count = 10) {
  const messages = [{
    role: 'user',
    parts: [{
      text: `Generate a list of ${count} vocabulary words related to "${topic}". Format the result in JSON like this:
[
  {
    "word": "example",
    "meaning": "meaning of the word",
    "example": "example sentence using the word"
  }
]`
    }]
  }];

  try {
    const responseText = await callGemini(messages);
    const jsonStart = responseText.indexOf('[');
    const jsonEnd = responseText.lastIndexOf(']');
    const jsonString = responseText.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse vocabulary:', error);
    throw new Error('Failed to fetch vocabulary. Please try again later.');
  }
}

// ✅ AI Chatbot
export async function getChatbotResponse(message) {
  const messages = [{
    role: 'user',
    parts: [{ text: message }]
  }];
  return await callGemini(messages);
}

// ✅ Speaking Feedback
export async function getPronunciationFeedback(sentence) {
  const messages = [{
    role: 'user',
    parts: [{ text: `Evaluate my English speaking. Give me pronunciation feedback for this sentence: "${sentence}". Be specific and clear.` }]
  }];
  return await callGemini(messages);
}

// ✅ Pronunciation Analysis
export async function analyzePronunciation(phrase) {
  const messages = [{
    role: 'user',
    parts: [{
      text: `Analyze the pronunciation of this phrase: "${phrase}"

Provide feedback in this exact format:

## Pronunciation Analysis

### Overall Impression
[general assessment of pronunciation]

### Phonetic Breakdown
[IPA transcription and sound-by-sound analysis]

### Common Mistakes
- [list common errors for this phrase]

### Practice Tips
- [actionable practice suggestions]

### Intonation Guidance
[advice on pitch and rhythm]

Keep the feedback professional yet encouraging.
Use bullet points for clear organization.`
    }]
  }];

  return await callGemini(messages);
}

// ✅ Quiz Generator
export async function generateQuiz(topic) {
  const messages = [{
    role: 'user',
    parts: [{
      text: `Generate 5 multiple-choice quiz questions for the topic "${topic}". Format as JSON like:
[
  {
    "question": "What is...",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }
]`
    }]
  }];

  try {
    const responseText = await callGemini(messages);
    const jsonStart = responseText.indexOf('[');
    const jsonEnd = responseText.lastIndexOf(']');
    const jsonString = responseText.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Quiz parsing error:', error);
    throw new Error('Failed to generate quiz.');
  }
}

// ✅ Challenge Generator
export async function generateChallengeFromGemini(topic) {
  const messages = [{
    role: 'user',
    parts: [{
      text: `Generate a short and fun language learning challenge related to the topic: "${topic}". 
It should include instructions, be engaging, and suitable for a beginner to intermediate learner.`
    }]
  }];
  return await callGemini(messages);
}

// ✅ Lesson Plan
// geminiService.js

// src/services/geminiService.js

// In geminiService.js
export const generateLessonPlan = async (level, topic) => {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAti7ox9lWAUlWNNr4tD-fAFr0YyokmoG4',
      {
        contents: [{
          parts: [{
            text: `Create a detailed ${level} level English lesson plan about "${topic}". 
            Return the response in this EXACT JSON format:
            {
              "title": "Lesson Title",
              "subtitle": "Level",
              "objective": "Learning objective",
              "vocabulary": ["word1", "word2", "word3"],
              "activities": [
                {
                  "id": 1,
                  "title": "Activity Title",
                  "description": "Detailed instructions",
                  "duration": "10 mins"
                }
              ]
            }
            
            Only return the JSON object, nothing else.`
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const responseText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error("No content generated");
    }

    // Extract JSON from the response
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}');
    const jsonString = responseText.slice(jsonStart, jsonEnd + 1);
    
    const lessonData = JSON.parse(jsonString);
    
    // Fallback structure if Gemini doesn't return complete data
    return {
      title: lessonData.title || `${topic} Lesson`,
      subtitle: lessonData.subtitle || `${level} Level`,
      objective: lessonData.objective || `Learn about ${topic}`,
      vocabulary: lessonData.vocabulary || [`${topic} term 1`, `${topic} term 2`],
      activities: lessonData.activities || [
        {
          id: 1,
          title: "Introduction Activity",
          description: `Discuss what you know about ${topic}`,
          duration: "10 mins"
        }
      ]
    };

  } catch (error) {
    console.error("Error generating lesson plan:", error);
    // Return a default lesson structure if API fails
    return {
      title: `${topic} Lesson`,
      subtitle: `${level} Level`,
      objective: `Learn about ${topic}`,
      vocabulary: [
        `${topic} term 1`,
        `${topic} term 2`,
        `${topic} term 3`
      ],
      activities: [
        {
          id: 1,
          title: "Warm-up Discussion",
          description: `Brainstorm about ${topic}`,
          duration: "10 mins"
        },
        {
          id: 2,
          title: "Practice Exercise",
          description: "Create sample sentences",
          duration: "15 mins"
        }
      ]
    };
  }
};



// ✅ Practice Questions
export async function generatePracticeQuestions(topic) {
  const messages = [{
    role: 'user',
    parts: [{
      text: `You are an English language tutor. Create 5 varied practice questions (multiple choice) on the topic: "${topic}".

Format the response as JSON array like this:
[
  {
    "question": "What is ...?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  }
]

Only include the JSON array in your response, nothing else.`
    }]
  }];

  try {
    const responseText = await callGemini(messages);
    const jsonStart = responseText.indexOf('[');
    const jsonEnd = responseText.lastIndexOf(']');

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No JSON array found in response');
    }

    const jsonString = responseText.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error generating practice questions:', error);
    throw new Error('Failed to generate practice questions. Please try again.');
  }
}

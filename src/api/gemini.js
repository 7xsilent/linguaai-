// src/api/gemini.js
import axios from "axios";

const GEMINI_API_KEY = "AIzaSyCrGeGIvqm-4nn7SufyIDLN-Zm6jQK3s3M";

export const checkGrammar = async (text) => {
  const prompt = `Check grammar and correct this text. Also explain the mistakes briefly:\n\n"${text}"`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const output = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return output || "No response from Gemini.";
  } catch (error) {
    console.error("Gemini grammar error:", error);
    return "Error communicating with Gemini.";
  }
};

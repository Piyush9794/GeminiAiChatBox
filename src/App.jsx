import axios from 'axios';
import './App.css';
import { useState } from 'react';

function App() {
  const [question, SetQuestion] = useState("");
  const [answer, SetAnswer] = useState("");

  const GenerateQuery = async () => {
    SetAnswer("Loading...");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });

      const result = response.data.candidates[0].content.parts[0].text;
      SetAnswer(result);
    } catch (error) {
      console.error("Error generating response:", error);
      SetAnswer("Something went wrong.");
    }
  };

  return (
    <div className="ai-container">
      <h1 className="ai-title">💬 Gemini AI Chat</h1>
      <input
        type="text"
        placeholder="Ask me anything..."
        value={question}
        onChange={(e) => SetQuestion(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && GenerateQuery()}
        className="ai-input"
      />
      <button onClick={GenerateQuery} className="ai-button">Generate Answer</button>
      {answer && (
        <div className="ai-response-box">
          <p className="ai-response">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;

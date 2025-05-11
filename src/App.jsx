import axios from 'axios';
import './App.css';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

function App() {
  const [question, SetQuestion] = useState("");
  const [answer, SetAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [queryStarted, setQueryStarted] = useState(false);
  const [error, setError] = useState(""); // Error message

  const GenerateQuery = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setError(""); // Clear any previous errors
    setQueryStarted(true);
    setLoading(true);
    SetAnswer("");

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <h1 className="ai-title">💬 Gemini AI Chat</h1>

      <input
        type="text"
        placeholder="Ask me anything..."
        value={question}
        onChange={(e) => {
          SetQuestion(e.target.value);
          setError(""); // Clear error while typing
        }}
        onKeyDown={(e) => e.key === "Enter" && GenerateQuery()}
        className="ai-input"
        disabled={loading}
      />

      {error && <p className="error-message">{error}</p>}

      <button
        onClick={GenerateQuery}
        className="ai-button"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Answer'}
      </button>

      {queryStarted && (
        <div className="ai-response-box">
          {loading ? (
            <ClipLoader
              color="#36d7b7"
              loading={true}
              size={50}
              aria-label="Loading Spinner"
            />
          ) : (
            <p className="ai-response">{answer}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

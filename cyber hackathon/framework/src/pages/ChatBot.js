import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "./css/ChatBot.css"; 

// Dummy responses (Replace with AI logic later)
const databaseResponses = {
  "what are the case statuses": "Case statuses can be 'open' or 'closed'.",
  "list all officers": "Officers: John Doe, Jane Smith, Mark Lee.",
  "what fields are in cases table": "Columns: case_number, title, description, status, officer_id, year, month.",
  "show all criminals": "Criminals: Mike Ross, Harvey Specter, Louis Litt.",
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me about database schema." },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSend = () => {
    if (!userInput.trim()) return;

    // Append user message
    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    // Get bot response (Replace this with DistilBERT AI response)
    const botResponseText = databaseResponses[userInput.toLowerCase()] || "Sorry, I don't understand.";
    const botMessage = { sender: "bot", text: botResponseText };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setUserInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">ModusMapping AI Assistant</div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Ask about the database..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSend}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;

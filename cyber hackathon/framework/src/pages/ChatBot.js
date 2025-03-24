import React, { useState } from "react";
import { FaPaperPlane, FaRedo } from "react-icons/fa"; 
import axios from "axios";
import "./css/ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me about the database schema." },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isRetry, setIsRetry] = useState(false); // Track if retry is needed
  const [lastMessage, setLastMessage] = useState(""); // Store last failed message

  const handleSend = async (retryText = null) => {
    const messageText = retryText || userInput.trim();
    if (!messageText) return;

    setIsRetry(false); // Reset retry flag
    setLastMessage(""); // Clear last failed message

    const userMessage = { sender: "user", text: messageText };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Set a timeout of 20 seconds
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const response = await axios.post("http://localhost:8080/chat/ask", { text: messageText }, { signal: controller.signal });

      clearTimeout(timeoutId); // Clear timeout if request is successful
      const botMessage = { sender: "bot", text: response.data.response };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
    } catch (error) {
      console.error("Error fetching response:", error);

      // Show error message and enable retry
      setMessages((prev) => [...prev, { sender: "bot", text: "Error while getting response. Please try again." }]);
      setIsRetry(true);
      setLastMessage(messageText);
    }

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
          disabled={isRetry} // Disable input if retry button is shown
        />
        {!isRetry ? (
          <button onClick={() => handleSend()}>
            <FaPaperPlane />
          </button>
        ) : (
          <button onClick={() => handleSend(lastMessage)}>
            <FaRedo /> {/* Retry button */}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatBot;

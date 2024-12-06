import React, { useState } from "react";
import "../styles/pages/Chat.css";

// API request function to get AI response
const getAIResponse = async (userInput) => {
  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch AI response");
    }

    const data = await response.json();
    return (
      data.aiResponse ||
      "I'm here to help, but I couldn't understand that. Please try again."
    );
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "I'm here to help, but something went wrong. Please try again.";
  }
};

const ChatPage = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add the user message to the chat
    const newMessage = { sender: "user", text: inputMessage };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage(""); // Clear the input field

    // Fetch and display the AI response
    const aiResponse = await getAIResponse(inputMessage);
    const aiMessage = { sender: "ai", text: aiResponse };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
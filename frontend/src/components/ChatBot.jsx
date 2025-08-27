import React, { useState, useEffect, useRef } from "react";
import "./chatbot.css";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [typing, setTyping] = useState(false); // bot typing indicator
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  // Greet user when chat opens
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ sender: "bot", text: "Hello! How can I help you plan your travels today?" }]);
    }
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim() || waitingForNext) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setWaitingForNext(true);
    setTyping(true);

    try {
      const res = await fetch("http://localhost:3008/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setTimeout(() => {
        setMessages([...newMessages, { sender: "bot", text: data.reply }]);
        setTyping(false);
        setWaitingForNext(false);
      }, 800); // small delay for smooth typing effect
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Oops! Something went wrong." },
      ]);
      setTyping(false);
      setWaitingForNext(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div
        className={`chatbot-btn ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {open ? "✖" : "💬"}
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-window animate-slide">
          <div className="chat-header">🌍 Wanderlust AI</div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}

            {typing && (
              <div className="chat-bubble bot typing">
                <span></span><span></span><span></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about travel..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={waitingForNext}
            />
            <button onClick={sendMessage} disabled={waitingForNext}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

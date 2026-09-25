import { useState } from "react";
import {
  Sparkles,
  Wifi,
  KeyRound,
  Ticket,
  Wrench,
  Send,
  Bot,
  UserRound,
  CheckCircle2,
  Monitor,
  BookOpen,
} from "lucide-react";

import "./AICopilot.css";

function AICopilot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const suggestions = [
    {
      icon: Wrench,
      title: "Diagnose an issue",
      text: "Help me diagnose an IT problem",
    },
    {
      icon: KeyRound,
      title: "Reset password",
      text: "I need help resetting my password",
    },
    {
      icon: Wifi,
      title: "Network problem",
      text: "My Wi-Fi or network is not working",
    },
    {
      icon: Ticket,
      title: "Create a ticket",
      text: "I want to create a support ticket",
    },
  ];

  // =========================
  // CONNECT TO AI BACKEND
  // =========================

  const getAIResponse = async (userMessage) => {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    if (!response.ok) {
      throw new Error("AI server error");
    }

    const data = await response.json();

    return data.answer;
  };

  const sendMessage = async (text = message) => {
    const cleanMessage = text.trim();

    if (!cleanMessage) return;

    // Show user's message immediately
    setMessages((current) => [
      ...current,
      {
        type: "user",
        text: cleanMessage,
      },
    ]);

    setMessage("");

    try {
      // Send message to real AI backend
      const aiResponse = await getAIResponse(cleanMessage);

      // Show AI response
      setMessages((current) => [
        ...current,
        {
          type: "ai",
          text: aiResponse,
        },
      ]);
    } catch (error) {
      console.error("AI ERROR:", error);

      setMessages((current) => [
        ...current,
        {
          type: "ai",
          text: "Sorry, I couldn't connect to the AI server. Please make sure the backend is running.",
        },
      ]);
    }
  };

  return (
    <div className="copilot-page">

      {/* ================= HEADER ================= */}

      <div className="copilot-header">

        <div>
          <div className="copilot-title-row">

            <div className="copilot-title-icon">
              <Sparkles size={21} />
            </div>

            <div>
              <h1>AI Copilot</h1>
              <p>Your intelligent IT support assistant</p>
            </div>

          </div>
        </div>

        <div className="copilot-status">
          <span className="status-dot"></span>
          AI Online
        </div>

      </div>


      {/* ================= CONTENT ================= */}

      <div className="copilot-content">

        {/* ================= CHAT ================= */}

        <section className="copilot-chat-card">

          <div className="chat-card-header">

            <div className="chat-agent">

              <div className="chat-agent-icon">
                <Bot size={20} />
              </div>

              <div>
                <strong>HelpiQ Copilot</strong>
                <span>Intelligent IT Support</span>
              </div>

            </div>

            <div className="chat-online">
              <CheckCircle2 size={15} />
              Ready to help
            </div>

          </div>


          {/* ================= CHAT BODY ================= */}

          <div className="chat-body">

            {messages.length === 0 ? (

              <div className="copilot-welcome">

                <div className="welcome-ai-icon">
                  <Sparkles size={30} />
                </div>

                <h2>How can I help you today?</h2>

                <p>
                  Describe your IT issue and I'll help you
                  troubleshoot it step by step.
                </p>

                <div className="suggestion-grid">

                  {suggestions.map((item, index) => {

                    const Icon = item.icon;

                    return (
                      <button
                        key={index}
                        className="suggestion-card"
                        onClick={() => sendMessage(item.text)}
                      >

                        <div className="suggestion-icon">
                          <Icon size={18} />
                        </div>

                        <div>
                          <strong>{item.title}</strong>
                          <span>{item.text}</span>
                        </div>

                      </button>
                    );

                  })}

                </div>

              </div>

            ) : (

              <div className="messages-area">

                {messages.map((item, index) => (

                  <div
                    key={index}
                    className={`chat-message ${
                      item.type === "user"
                        ? "user-message"
                        : "ai-message"
                    }`}
                  >

                    <div className="message-avatar">

                      {item.type === "user" ? (
                        <UserRound size={17} />
                      ) : (
                        <Bot size={17} />
                      )}

                    </div>

                    <div className="message-content">

                      <div className="message-name">
                        {item.type === "user"
                          ? "You"
                          : "HelpiQ Copilot"}
                      </div>

                      <div className="message-bubble">
                        {item.text}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>


          {/* ================= INPUT ================= */}

          <div className="chat-input-area">

            <div className="chat-input-box">

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask anything about your IT issue..."
              />

              <button
                className="send-button"
                onClick={() => sendMessage()}
                aria-label="Send message"
              >
                <Send size={17} />
              </button>

            </div>

            <span className="input-hint">
              AI responses may need verification for critical issues.
            </span>

          </div>

        </section>


        {/* ================= RIGHT PANEL ================= */}

        <aside className="copilot-sidebar">

          {/* CONTEXT */}

          <div className="copilot-side-card">

            <div className="side-card-header">

              <div>
                <h3>Current Context</h3>
                <p>Support session information</p>
              </div>

              <Monitor size={19} />

            </div>

            <div className="context-list">

              <div className="context-row">
                <span>Device</span>
                <strong>Windows Laptop</strong>
              </div>

              <div className="context-row">
                <span>User</span>
                <strong>Ahamad Reza</strong>
              </div>

              <div className="context-row">
                <span>Network</span>

                <strong className="context-good">
                  <span></span>
                  Connected
                </strong>

              </div>

              <div className="context-row">
                <span>Recent Ticket</span>
                <strong>#TK-1024</strong>
              </div>

              <div className="context-row">
                <span>Priority</span>

                <strong className="priority-medium">
                  Medium
                </strong>

              </div>

            </div>

          </div>


          {/* KNOWLEDGE */}

          <div className="copilot-side-card">

            <div className="side-card-header">

              <div>
                <h3>Suggested Knowledge</h3>
                <p>Helpful resources for this session</p>
              </div>

              <BookOpen size={19} />

            </div>

            <div className="knowledge-list">

              <button>
                <span className="knowledge-icon">
                  <Wifi size={16} />
                </span>

                <span>
                  <strong>Wi-Fi Troubleshooting</strong>
                  <small>Network connection guide</small>
                </span>
              </button>

              <button>
                <span className="knowledge-icon">
                  <Monitor size={16} />
                </span>

                <span>
                  <strong>Windows Network Reset</strong>
                  <small>Reset network settings</small>
                </span>
              </button>

              <button>
                <span className="knowledge-icon">
                  <KeyRound size={16} />
                </span>

                <span>
                  <strong>Password & Access Guide</strong>
                  <small>Account recovery steps</small>
                </span>
              </button>

            </div>

          </div>


          {/* TIP */}

          <div className="copilot-tip">

            <div className="tip-icon">
              <Sparkles size={18} />
            </div>

            <div>
              <strong>Copilot Tip</strong>

              <p>
                Give detailed information about the issue
                for more useful troubleshooting steps.
              </p>
            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default AICopilot;
import { useState, useEffect, useRef } from "react";
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
  AlertCircle,
} from "lucide-react";

import "./AICopilot.css";

// Formatter for markdown elements (headers, bold, bullet points, numbers, code)
function formatBubbleContent(text) {
  if (!text) return null;
  const lines = text.split("\n");

  return lines.map((line, idx) => {
    if (line.startsWith("### ")) {
      return (
        <h4 key={idx} className="bubble-heading">
          {line.replace("### ", "")}
        </h4>
      );
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      return (
        <div key={idx} className="bubble-list-item">
          <span className="bubble-bullet">•</span>
          <span>{renderInlineStyles(line.slice(2))}</span>
        </div>
      );
    }
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      return (
        <div key={idx} className="bubble-numbered-item">
          <span className="bubble-num">{numberedMatch[1]}.</span>
          <span>{renderInlineStyles(numberedMatch[2])}</span>
        </div>
      );
    }
    if (line.trim() === "") {
      return <div key={idx} className="bubble-spacer" />;
    }
    return (
      <p key={idx} className="bubble-paragraph">
        {renderInlineStyles(line)}
      </p>
    );
  });
}

function renderInlineStyles(str) {
  const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="bubble-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// Client-side intelligent IT knowledge fallback when backend server is offline
function fallbackITSupport(userMessage) {
  const query = userMessage.toLowerCase().trim();

  if (
    query.includes("password") ||
    query.includes("reset") ||
    query.includes("login") ||
    query.includes("account locked")
  ) {
    return `### 🔑 Password & Account Reset Guide

Here is how you can resolve password and login issues:

1. **Self-Service Reset**: Visit the corporate login portal and click **"Forgot Password"**.
2. **Identity Verification**: Enter your registered email (\`ahamadreza09@gmail.com\`) and check your inbox or authenticator app for the 6-digit code.
3. **Password Requirements**:
   - At least 12 characters
   - Uppercase, lowercase, numbers, and symbols
   - Cannot match your previous 3 passwords
4. **Account Locked?**: If you made more than 5 failed attempts, wait 15 minutes for security cooldown or submit an urgent ticket.`;
  }

  if (
    query.includes("wifi") ||
    query.includes("wi-fi") ||
    query.includes("network") ||
    query.includes("internet") ||
    query.includes("dns") ||
    query.includes("offline")
  ) {
    return `### 🌐 Network & Wi-Fi Troubleshooting

Try these step-by-step diagnostic actions:

1. **Quick Toggle**: Turn Wi-Fi off, wait 10 seconds, and turn it back on.
2. **Forget & Reconnect**: In Windows Settings > *Network & Internet* > *Wi-Fi*, forget this network and reconnect.
3. **Flush DNS Cache**:
   - Open PowerShell or Command Prompt as Admin
   - Run: \`ipconfig /flushdns\`
   - Run: \`ipconfig /renew\`
4. **VPN Check**: Temporarily disconnect company VPN to test if local internet routing is functioning.`;
  }

  if (
    query.includes("ticket") ||
    query.includes("create ticket") ||
    query.includes("raise ticket") ||
    query.includes("support ticket")
  ) {
    return `### 🎫 IT Support Ticket Creation

I can help route this to the IT Support queue:

- **Suggested Category**: System & Hardware Diagnostics
- **Current Device**: Windows Laptop (User: Ahamad Reza)
- **Priority**: Medium

**Next Steps**:
1. Head over to the **User Portal** tab.
2. Click on **Create Ticket** and provide details or error screenshots.
3. Our support engineers typically respond within **15–30 minutes**.`;
  }

  if (
    query.includes("diagnose") ||
    query.includes("slow") ||
    query.includes("freeze") ||
    query.includes("crash") ||
    query.includes("performance") ||
    query.includes("cpu") ||
    query.includes("ram")
  ) {
    return `### ⚙️ System Performance Diagnostics

Let's troubleshoot what is slowing down your system:

1. **Open Task Manager**: Press \`Ctrl + Shift + Esc\` to identify processes with high CPU or Memory usage.
2. **Disk Cleanup**: Run \`cleanmgr\` to clear temporary files and cache.
3. **Check Updates**: Go to *Settings > Windows Update* to verify background updates aren't pending.
4. **Restart System**: A fresh reboot terminates hung threads and clears memory leaks.`;
  }

  if (query.includes("vpn") || query.includes("remote")) {
    return `### 🛡️ VPN & Remote Access Troubleshooting

1. Verify your local internet connection is active before connecting to VPN.
2. Check your phone's Authenticator app for pending MFA push notifications.
3. Restart the VPN client and verify you are connected to the nearest server gateway.`;
  }

  if (query.includes("printer") || query.includes("print")) {
    return `### 🖨️ Printer & Peripheral Troubleshooting

1. Verify the printer has power and is on the same local network.
2. Go to **Settings > Devices > Printers & Scanners** and clear any stuck print queues.
3. Restart the **Print Spooler** service via \`services.msc\` or restart your PC.`;
  }

  if (query.includes("email") || query.includes("outlook") || query.includes("mail") || query.includes("teams")) {
    return `### 📧 Email & Microsoft Teams Troubleshooting

1. **Verify Credentials**: Sign in to the web version (*outlook.office.com*) to check if your account is active.
2. **Clear Outlook Cache**:
   - Close Outlook.
   - Press \`Win + R\`, type \`%localappdata%\\Microsoft\\Outlook\`, and clear temp cache files.
3. **Teams Cache Reset**: Quit Teams from the system tray, then delete contents in \`%appdata%\\Microsoft\\Teams\`.
4. **Re-sync Account**: In Windows Settings > *Accounts* > *Access work or school*, disconnect and reconnect your corporate account.`;
  }

  if (query.includes("audio") || query.includes("mic") || query.includes("speaker") || query.includes("sound") || query.includes("camera")) {
    return `### 🎧 Audio & Camera Diagnostics

1. **Device Permissions**: Go to Windows Settings > *Privacy & Security* > *Microphone / Camera* and ensure app access is allowed.
2. **Default Output**: Right-click the speaker icon in taskbar > *Sound settings* and confirm the correct output device is set as Default.
3. **Driver Check**: Open Device Manager (\`devmgmt.msc\`), expand *Audio inputs and outputs*, right-click your device, and select **Update driver**.`;
  }

  if (query.includes("software") || query.includes("install") || query.includes("admin") || query.includes("permission")) {
    return `### 📦 Software & Installation Assistance

1. **Company Portal**: Check if the requested application is available in the **Company Portal** or self-service IT catalog.
2. **Admin Privileges**: If you see an *"Administrator credentials required"* prompt, submit a ticket requesting software deployment or elevated access.
3. **Compatibility**: Verify minimum system requirements and ensure your OS has the latest patches applied.`;
  }

  // Only trigger greeting if message is primarily a greeting, not a full question
  if (/^(hi|hello|hey|help|greetings|good morning|good afternoon|good evening)(\s+there|\s+copilot|\s+helpiq)?$/i.test(query)) {
    return `Hello! 👋 I'm **HelpIQ Copilot**, your intelligent IT support assistant.

How can I help you today? You can ask me to:
- 🔑 **Reset passwords** or unlock accounts
- 🌐 Troubleshoot **Wi-Fi & network** connection drops
- ⚙️ **Diagnose slow performance** or system crashes
- 📧 Fix **Outlook, Email, or Teams** issues
- 🎧 Troubleshoot **Audio, Mic, or Camera**
- 🎫 Guide you through **creating a support ticket**`;
  }

  return `### 💡 HelpIQ IT Assistant

I received your query regarding: **"${userMessage}"**.

**Recommended Actions:**
1. Check if the issue is resolved after restarting the affected app or system.
2. Review recent software updates or configuration changes.
3. If the problem continues, open a ticket in the **User Portal** with error details so our IT team can assist.`;
}

function AICopilot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(true);

  const messagesEndRef = useRef(null);

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

  // Auto-scroll chat on new messages or typing indicator
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Check backend server health on mount
  useEffect(() => {
    let isMounted = true;
    const checkServerHealth = async () => {
      try {
        const res = await fetch("/api/health");
        if (res.ok && isMounted) {
          setBackendConnected(true);
          return;
        }
      } catch {
        // Try direct localhost fallback
        try {
          const directRes = await fetch("http://localhost:5000/api/health");
          if (directRes.ok && isMounted) {
            setBackendConnected(true);
            return;
          }
        } catch {
          if (isMounted) setBackendConnected(false);
        }
      }
    };

    checkServerHealth();
    return () => {
      isMounted = false;
    };
  }, []);

  // Connect to backend or fallback gracefully
  const getAIResponse = async (userMessage) => {
    const endpoints = ["/api/chat", "http://localhost:5000/api/chat"];

    for (const url of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && data.answer) {
            setBackendConnected(true);
            return data.answer;
          }
        }
      } catch {
        // Continue to fallback
      }
    }

    // Backend is unavailable or timed out; use built-in intelligent IT knowledge base
    setBackendConnected(false);
    return fallbackITSupport(userMessage);
  };

  const sendMessage = async (text = message) => {
    const cleanMessage = text.trim();

    if (!cleanMessage || isLoading) return;

    // Show user's message immediately
    setMessages((current) => [
      ...current,
      {
        type: "user",
        text: cleanMessage,
      },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(cleanMessage);

      setMessages((current) => [
        ...current,
        {
          type: "ai",
          text: aiResponse,
        },
      ]);
    } catch (error) {
      console.error("AI ERROR:", error);

      // Even in rare uncaught errors, provide fallback response
      const fallback = fallbackITSupport(cleanMessage);
      setMessages((current) => [
        ...current,
        {
          type: "ai",
          text: fallback,
        },
      ]);
    } finally {
      setIsLoading(false);
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

        <div className={`copilot-status ${backendConnected ? "online" : "offline"}`}>
          <span className={`status-dot ${backendConnected ? "online" : "offline"}`}></span>
          {backendConnected ? "AI Online" : "Copilot Active (Offline Mode)"}
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
                  Describe your IT issue and I'll help you troubleshoot it step by step.
                </p>

                <div className="suggestion-grid">
                  {suggestions.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        className="suggestion-card"
                        onClick={() => sendMessage(item.text)}
                        disabled={isLoading}
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
                      item.type === "user" ? "user-message" : "ai-message"
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
                        {item.type === "user" ? "You" : "HelpiQ Copilot"}
                      </div>

                      <div className="message-bubble">
                        {item.type === "user" ? (
                          item.text
                        ) : (
                          formatBubbleContent(item.text)
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing / Loading indicator */}
                {isLoading && (
                  <div className="chat-message ai-message">
                    <div className="message-avatar">
                      <Bot size={17} />
                    </div>
                    <div className="message-content">
                      <div className="message-name">HelpiQ Copilot</div>
                      <div className="message-bubble typing-bubble">
                        <div className="typing-indicator">
                          <span className="typing-dot"></span>
                          <span className="typing-dot"></span>
                          <span className="typing-dot"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
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
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={isLoading}
                placeholder={
                  isLoading
                    ? "Copilot is analyzing your request..."
                    : "Ask anything about your IT issue..."
                }
              />

              <button
                className="send-button"
                onClick={() => sendMessage()}
                disabled={isLoading || !message.trim()}
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </div>

            <div className="input-hint-row">
              <span className="input-hint">
                AI responses provide actionable IT guidance. For critical outages, submit an urgent ticket.
              </span>
              {!backendConnected && (
                <span className="input-offline-badge" title="Node server not detected; using built-in knowledge engine">
                  <AlertCircle size={12} />
                  Offline Knowledge Engine
                </span>
              )}
            </div>
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
                <strong className="priority-medium">Medium</strong>
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
              <button
                onClick={() =>
                  sendMessage("Help me troubleshoot Wi-Fi connection drops")
                }
                disabled={isLoading}
              >
                <span className="knowledge-icon">
                  <Wifi size={16} />
                </span>
                <span>
                  <strong>Wi-Fi Troubleshooting</strong>
                  <small>Network connection guide</small>
                </span>
              </button>

              <button
                onClick={() =>
                  sendMessage("How do I perform a Windows network reset?")
                }
                disabled={isLoading}
              >
                <span className="knowledge-icon">
                  <Monitor size={16} />
                </span>
                <span>
                  <strong>Windows Network Reset</strong>
                  <small>Reset network settings</small>
                </span>
              </button>

              <button
                onClick={() =>
                  sendMessage("I need help with password recovery and access guide")
                }
                disabled={isLoading}
              >
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
                Give detailed information about the issue for more useful troubleshooting steps.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AICopilot;
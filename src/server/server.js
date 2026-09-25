import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from root or server directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "./.env") });
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 1. Check for Groq API Key (Primary)
const groqKey = process.env.GROQ_API_KEY;
const hasValidGroqKey =
  groqKey &&
  groqKey.trim() &&
  !groqKey.includes("YOUR_") &&
  groqKey !== "YOUR_API_KEY_HERE";

let groq = null;
if (hasValidGroqKey) {
  try {
    const { default: Groq } = await import("groq-sdk");
    groq = new Groq({ apiKey: groqKey.trim() });
  } catch (err) {
    console.warn("Groq SDK initialization failed:", err.message);
  }
}

// 2. Check for OpenAI API Key (Secondary fallback)
const openAiKey = process.env.OPENAI_API_KEY;
const hasValidOpenAIKey =
  openAiKey &&
  openAiKey.trim() &&
  !openAiKey.includes("YOUR_") &&
  openAiKey !== "YOUR_API_KEY_HERE";

let openai = null;
if (!groq && hasValidOpenAIKey) {
  try {
    const { default: OpenAI } = await import("openai");
    openai = new OpenAI({ apiKey: openAiKey.trim() });
  } catch (err) {
    console.warn("OpenAI package initialization failed:", err.message);
  }
}

// Intelligent IT Knowledge Base Responses for fallback / offline mode
function generateITSupportResponse(userMessage) {
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
2. **Identity Verification**: Enter your registered email (\`ahamadreza09@gmail.com\`) and check your inbox or authenticator app for the 6-digit security code.
3. **Password Requirements**:
   - At least 12 characters long
   - Include uppercase, lowercase, numbers, and special symbols
   - Cannot match your previous 3 passwords
4. **Account Locked?**: If you made more than 5 failed attempts, the account enters a 15-minute cooldown. If you need it unlocked immediately, click **"Create a ticket"** or contact the IT Helpdesk.`;
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
2. **Forget & Reconnect**: In Windows Settings > *Network & Internet* > *Wi-Fi* > *Manage known networks*, remove the connection and reconnect with your domain credentials.
3. **Flush DNS Cache**:
   - Open Command Prompt or PowerShell as Administrator
   - Run: \`ipconfig /flushdns\`
   - Run: \`ipconfig /renew\`
4. **Hardware Check**: Verify the router/access point lights. If on a company VPN, temporarily disconnect the VPN to check if local internet works.`;
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
1. Head over to the **"Create Ticket"** tab in the User Portal.
2. Provide a descriptive title, error screenshot, and urgency.
3. Once submitted, our team usually responds within **15–30 minutes**.`;
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

Let's identify what's slowing down your system:

1. **Check Task Manager**: Press \`Ctrl + Shift + Esc\` and check the **Processes** tab. Look for apps consuming >80% CPU or Memory.
2. **Clear Temp Files**: Press \`Win + R\`, type \`cleanmgr\`, select drive C: and perform a Disk Cleanup.
3. **Pending Windows Updates**: Go to *Settings > Windows Update* to check if updates are downloading in the background.
4. **Reboot**: A fresh system reboot clears hung processes and memory leaks.`;
  }

  if (query.includes("vpn") || query.includes("remote")) {
    return `### 🛡️ VPN & Remote Access Troubleshooting

To resolve VPN connection errors:

1. Verify your main internet connection is stable before initiating VPN.
2. Check your Multi-Factor Authentication (MFA) app for any pending push requests.
3. Restart the VPN client software and ensure you are connected to the closest gateway server.
4. If certificates have expired, contact IT to re-issue your client certificate.`;
  }

  if (query.includes("printer") || query.includes("print")) {
    return `### 🖨️ Printer & Peripheral Troubleshooting

1. Ensure the printer is powered on and connected to the same office Wi-Fi or Ethernet network.
2. Go to **Settings > Devices > Printers & Scanners**, select your printer, and click **"Open queue"** to cancel any stuck print jobs.
3. Restart the **Print Spooler** service via \`services.msc\` or restart your PC.`;
  }

  if (
    query.includes("hello") ||
    query.includes("hi") ||
    query.includes("hey") ||
    query.includes("help")
  ) {
    return `Hello! 👋 I'm **HelpIQ Copilot**, powered by **Groq AI**.

How can I help you today? You can ask me to:
- 🔑 **Reset passwords** or unlock accounts
- 🌐 Troubleshoot **Wi-Fi & network** connection drops
- ⚙️ **Diagnose slow performance** or system crashes
- 🎫 Guide you through **creating a support ticket**
- 🛡️ Resolve **VPN, Printer, or Software** issues`;
  }

  return `### 💡 HelpIQ IT Assistant Analysis

I have received your request regarding: **"${userMessage}"**.

**Recommended Actions:**
1. Check if the issue is reproducible after restarting the affected application or system.
2. Review recent updates or configuration changes on your device.
3. If this is preventing critical work, please submit a ticket with details or error logs via the **User Portal** so our support engineers can assist directly.`;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  const currentProvider = groq
    ? "groq (llama-3.3-70b-versatile)"
    : openai
    ? "openai (gpt-4o-mini)"
    : "intelligent-knowledge-base";

  res.json({
    status: "ok",
    aiProvider: currentProvider,
  });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const cleanMessage = message.trim();

    // 1. Try Groq (Ultra-fast Llama-3.3-70b)
    if (groq) {
      try {
        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are HelpIQ Copilot, an expert IT support assistant powered by Groq. Provide concise, clear, and actionable step-by-step troubleshooting steps for corporate and personal IT issues. Use markdown formatting when helpful.",
            },
            {
              role: "user",
              content: cleanMessage,
            },
          ],
          temperature: 0.6,
          max_tokens: 800,
        });

        const reply = completion.choices[0]?.message?.content;
        if (reply) {
          return res.json({
            answer: reply,
            provider: "groq (llama-3.3-70b-versatile)",
          });
        }
      } catch (groqError) {
        console.warn("Groq API call failed, attempting fallback:", groqError.message);
      }
    }

    // 2. Secondary fallback: OpenAI (if configured)
    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are HelpIQ Copilot, an expert IT support assistant. Provide concise, clear, and actionable step-by-step troubleshooting steps for corporate and personal IT issues. Use markdown formatting when helpful.",
            },
            {
              role: "user",
              content: cleanMessage,
            },
          ],
          temperature: 0.7,
          max_tokens: 600,
        });

        const reply = completion.choices[0]?.message?.content;
        if (reply) {
          return res.json({
            answer: reply,
            provider: "openai (gpt-4o-mini)",
          });
        }
      } catch (openAiError) {
        console.warn("OpenAI API call failed, falling back to IT knowledge base:", openAiError.message);
      }
    }

    // 3. Built-in IT Knowledge Base fallback
    const localAnswer = generateITSupportResponse(cleanMessage);
    return res.json({
      answer: localAnswer,
      provider: "intelligent-knowledge-base",
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({
      error: "Server response failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  const providerLabel = groq
    ? "Groq (llama-3.3-70b-versatile)"
    : openai
    ? "OpenAI (gpt-4o-mini)"
    : "Intelligent IT Knowledge Base";

  console.log(`HelpIQ AI server running on http://localhost:${PORT}`);
  console.log(`AI Provider mode: ${providerLabel}`);
});
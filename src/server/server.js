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

// ─────────────────────────────────────────────
//  PROVIDER DETECTION
// ─────────────────────────────────────────────

const rawGroqKey = process.env.GROQ_API_KEY;
const rawOpenRouterKey = process.env.OPENROUTER_API_KEY;
const rawOpenAiKey = process.env.OPENAI_API_KEY;

// Detect valid Groq key (starts with gsk_)
const groqApiKey =
  rawGroqKey &&
  rawGroqKey.startsWith("gsk_") &&
  !rawGroqKey.includes("YOUR_")
    ? rawGroqKey.trim()
    : null;

// Detect valid OpenRouter key (starts with sk-or-)
const openRouterApiKey =
  (rawOpenRouterKey &&
    !rawOpenRouterKey.includes("YOUR_") &&
    rawOpenRouterKey.trim()) ||
  (rawGroqKey && rawGroqKey.startsWith("sk-or-")
    ? rawGroqKey.trim()
    : null) ||
  (rawOpenAiKey && rawOpenAiKey.startsWith("sk-or-")
    ? rawOpenAiKey.trim()
    : null);

// Detect valid OpenAI key
const openAiApiKey =
  rawOpenAiKey &&
  rawOpenAiKey.startsWith("sk-") &&
  !rawOpenAiKey.startsWith("sk-or-") &&
  !rawOpenAiKey.includes("YOUR_")
    ? rawOpenAiKey.trim()
    : null;

// Initialise clients
let groq = null;
if (groqApiKey) {
  try {
    const { default: Groq } = await import("groq-sdk");
    groq = new Groq({ apiKey: groqApiKey });
    console.log("✅ Groq client initialised");
  } catch (err) {
    console.warn("Groq SDK init failed:", err.message);
  }
}

let openrouter = null;
if (!groq && openRouterApiKey) {
  try {
    const { default: OpenAI } = await import("openai");
    openrouter = new OpenAI({
      apiKey: openRouterApiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: { "HTTP-Referer": "http://localhost:5173", "X-Title": "HelpIQ" },
    });
    console.log("✅ OpenRouter client initialised");
  } catch (err) {
    console.warn("OpenRouter init failed:", err.message);
  }
}

let openai = null;
if (!groq && !openrouter && openAiApiKey) {
  try {
    const { default: OpenAI } = await import("openai");
    openai = new OpenAI({ apiKey: openAiApiKey });
    console.log("✅ OpenAI client initialised");
  } catch (err) {
    console.warn("OpenAI init failed:", err.message);
  }
}

// ─────────────────────────────────────────────
//  AGENTIC IT HELPDESK SYSTEM PROMPT
// ─────────────────────────────────────────────

const SYSTEM_PROMPT = `You are HelpIQ Copilot — an expert AI IT Helpdesk Agent for a corporate IT support team.

You operate as a multi-step intelligent agent with the following pipeline for every user issue:

1. UNDERSTAND: Identify the exact problem from the user message. Clarify ambiguities by asking one targeted follow-up question if needed.
2. CLASSIFY: Categorise the issue (e.g. Authentication, Network, Hardware, Software, Email, Performance, Security, Printer, VPN).
3. DIAGNOSE: Think step-by-step about what could be causing the problem. Consider system state, recent changes, error patterns, and environment (Windows/Mac/Linux, corporate vs personal network).
4. SEARCH KNOWLEDGE BASE: Recall relevant IT documentation, best practices, known fixes, and Windows/Linux/macOS command references.
5. TROUBLESHOOT: Provide a numbered, actionable resolution plan with specific commands, settings paths, and diagnostic steps.
6. SAFE FIXES: If suggesting commands or registry/config changes, always warn about risks and recommend taking a backup first.
7. VERIFY: End every response with 1–2 quick verification steps so the user can confirm the fix worked.
8. ESCALATE: If the issue is beyond self-service scope (hardware failure, data loss risk, security breach), instruct the user to create an urgent support ticket.

Response format rules:
- Use markdown: ### for section headings, **bold** for key terms, \`code\` for commands/paths.
- Number all steps clearly.
- Be concise but thorough — no fluff.
- Always end with a "✅ Verify it worked" section.
- Speak conversationally. You are a helpful expert, not a formal document.

You have access to knowledge about:
- Windows 10/11 administration and troubleshooting
- Active Directory, Azure AD, SSO, and MFA
- Microsoft 365 (Outlook, Teams, SharePoint, OneDrive)
- Network diagnostics (DNS, DHCP, VPN, TCP/IP)
- Hardware diagnostics (printers, displays, peripherals)
- Software deployment and permissions
- Cybersecurity best practices
- macOS and Linux basics for corporate environments`;

// ─────────────────────────────────────────────
//  GROQ MODEL PRIORITY ORDER  (most reliable first)
// ─────────────────────────────────────────────

const GROQ_MODELS = [
  "llama-3.3-70b-versatile",  // Most reliable, huge context, very capable
  "llama3-70b-8192",          // Stable fallback
  "qwen-2.5-32b",             // Qwen on Groq — try after llama
  "mixtral-8x7b-32768",       // Older but very stable
  "llama3-8b-8192",           // Lightweight fast fallback
];

// ─────────────────────────────────────────────
//  OFFLINE KNOWLEDGE BASE  (when no API keys)
// ─────────────────────────────────────────────

function offlineResponse(userMessage) {
  const q = userMessage.toLowerCase();

  if (q.includes("password") || q.includes("account locked") || q.includes("login") || q.includes("mfa") || q.includes("2fa")) {
    return `### 🔑 Authentication Issue Detected

**Step 1 — Self-Service Password Reset**
1. Go to your company's SSO portal and click **"Forgot Password"**.
2. Verify via your registered email or Microsoft Authenticator app.
3. If MFA is failing: check your phone's time sync (Settings → General → Date & Time → Set Automatically).

**Step 2 — Account Lockout**
- Active Directory locks accounts after **5 failed attempts** (15-min cooldown).
- If urgent, contact IT via the **Create Ticket** tab for immediate unlock.

**Step 3 — Password Requirements**
- Minimum 12 characters • Uppercase + lowercase + number + symbol
- Cannot reuse last 3 passwords

✅ **Verify it worked**: Log in at the SSO portal web page before trying the desktop app.`;
  }

  if (q.includes("wifi") || q.includes("wi-fi") || q.includes("network") || q.includes("internet") || q.includes("no connection") || q.includes("dns") || q.includes("offline")) {
    return `### 🌐 Network Connectivity Issue Detected

**Step 1 — Quick Restart Sequence**
1. Disconnect from Wi-Fi → wait 10 seconds → reconnect.
2. If on VPN: disconnect VPN first, test internet, then reconnect VPN.

**Step 2 — Flush DNS & Renew IP** (Run as Administrator)
\`\`\`
ipconfig /flushdns
ipconfig /release
ipconfig /renew
netsh winsock reset
\`\`\`
Restart your computer after running these.

**Step 3 — Forget & Rejoin Network**
- Settings → Network & Internet → Wi-Fi → Manage known networks → Remove → Reconnect with domain credentials.

**Step 4 — DNS Server Override** (if still failing)
- Network Adapter Settings → IPv4 → Use: \`8.8.8.8\` / \`8.8.4.4\`

✅ **Verify it worked**: Run \`ping google.com\` in PowerShell. You should see replies with <100ms latency.`;
  }

  if (q.includes("slow") || q.includes("freeze") || q.includes("hang") || q.includes("crash") || q.includes("cpu") || q.includes("ram") || q.includes("performance") || q.includes("lag")) {
    return `### ⚙️ System Performance Issue Detected

**Step 1 — Immediate Triage**
- Press \`Ctrl + Shift + Esc\` → Task Manager → **Processes** tab.
- Sort by **CPU** then **Memory**. Identify the top consumer.

**Step 2 — Quick Fixes**
\`\`\`powershell
# Clear temp files
Remove-Item -Path "$env:TEMP\\*" -Recurse -Force -ErrorAction SilentlyContinue
# Disable startup bloat
Get-CimInstance -Class Win32_StartupCommand | Select-Object Name, Command | Format-Table
\`\`\`

**Step 3 — Windows Disk Cleanup**
- Press \`Win + R\` → type \`cleanmgr\` → select C: → check all boxes → OK.

**Step 4 — Check for Windows Updates** draining resources in background
- Settings → Windows Update → Pause updates if a large download is in progress.

**Step 5 — Hardware Diagnostics**
- RAM: \`mdsched.exe\` (Memory Diagnostic) — schedule for next reboot.
- Disk: \`chkdsk C: /f\` — run after reboot.

✅ **Verify it worked**: Reboot and re-check Task Manager. CPU should idle below 15%.`;
  }

  if (q.includes("email") || q.includes("outlook") || q.includes("teams") || q.includes("onedrive") || q.includes("sharepoint") || q.includes("office") || q.includes("microsoft 365") || q.includes("m365")) {
    return `### 📧 Microsoft 365 Issue Detected

**Step 1 — Check Service Status**
- Visit [status.office.com](https://status.office.com) to check if Microsoft is experiencing an outage.

**Step 2 — Clear Outlook Cache**
1. Close Outlook completely (check system tray).
2. Press \`Win + R\` → \`%localappdata%\\Microsoft\\Outlook\`
3. Delete \`.ost\` file (it will rebuild automatically on next launch). ⚠️ Do NOT delete \`.pst\` files.

**Step 3 — Clear Teams Cache**
1. Quit Teams from the system tray.
2. Press \`Win + R\` → \`%appdata%\\Microsoft\\Teams\`
3. Delete all contents of this folder.
4. Relaunch Teams.

**Step 4 — Re-authenticate**
- File → Office Account → Sign Out → Sign In again with your corporate email.

✅ **Verify it worked**: Send a test email to yourself and confirm it appears in Sent Items.`;
  }

  if (q.includes("vpn") || q.includes("remote access") || q.includes("remote desktop") || q.includes("rdp")) {
    return `### 🛡️ VPN / Remote Access Issue Detected

**Step 1 — Pre-flight Checklist**
- ✅ Local internet working? (test \`ping 8.8.8.8\` in PowerShell)
- ✅ MFA app approved? Check your Authenticator for pending push notifications.
- ✅ VPN client up to date? Check your client version vs the IT-published version.

**Step 2 — Reconnect Sequence**
1. Disconnect VPN completely.
2. Flush DNS: \`ipconfig /flushdns\`
3. Reconnect to VPN → approve MFA.

**Step 3 — RDP-Specific Fixes**
- Ensure port 3389 is not blocked: \`Test-NetConnection -ComputerName [IP] -Port 3389\`
- Enable credential delegation in Group Policy if NLA errors appear.

**Step 4 — Certificate Issues**
If you see "Certificate expired" or "Untrusted certificate", contact IT — your client certificate needs renewal.

✅ **Verify it worked**: Run \`ipconfig\` after connecting — you should see a company-range VPN IP address.`;
  }

  if (q.includes("printer") || q.includes("print") || q.includes("scanner") || q.includes("toner")) {
    return `### 🖨️ Printer / Scanner Issue Detected

**Step 1 — Clear Print Queue**
1. Press \`Win + R\` → type \`services.msc\`
2. Find **Print Spooler** → right-click → **Stop**.
3. Navigate to \`C:\\Windows\\System32\\spool\\PRINTERS\` → delete all files inside.
4. Back in Services → right-click Print Spooler → **Start**.

**Step 2 — Remove & Re-add Printer**
- Settings → Devices → Printers & Scanners → Remove → Add a printer → search by IP or name.

**Step 3 — Driver Reinstall**
\`\`\`powershell
# Remove existing driver
pnputil /delete-driver [oem##.inf] /uninstall /force
\`\`\`
Then download the latest driver from the manufacturer's website.

✅ **Verify it worked**: Print a Windows Test Page (right-click printer → Printer Properties → Print Test Page).`;
  }

  if (q.includes("install") || q.includes("software") || q.includes("application") || q.includes("permission") || q.includes("admin right") || q.includes("access denied")) {
    return `### 📦 Software / Access Permission Issue Detected

**Step 1 — Check Company Software Portal**
- Open **Company Portal** (or Software Center for SCCM environments).
- Search for the application — it may be available for self-service install without admin rights.

**Step 2 — Request Admin Elevation**
If you need local admin for installation:
1. Submit a ticket via the User Portal with: software name, version, business justification.
2. IT will either deploy it centrally or grant temporary elevation.

**Step 3 — Access Denied to Files/Folders**
- Right-click → Properties → Security → check your username/group has Read or Modify.
- If denied on a network share, your AD group may need updating — contact your IT admin.

**Step 4 — UAC Override (safe)**
- Right-click installer → "Run as administrator" with IT-provided credentials.

✅ **Verify it worked**: Launch the application and confirm it opens without errors.`;
  }

  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)(\s+there|\s+copilot|\s+helpiq|\s+agent)?$/i.test(q.trim())) {
    return `Hello! 👋 I'm **HelpIQ Copilot** — your AI IT Helpdesk Agent.

I work like a real IT engineer:
1. 🔍 **Understand** your issue
2. 🧠 **Diagnose** the root cause
3. 🛠️ **Provide step-by-step fixes** with commands
4. ✅ **Verify** the resolution

What's your IT issue today? Describe it in as much detail as you can — the error message, what you were doing when it happened, and your operating system.`;
  }

  return `### 💡 HelpIQ IT Agent Analysis

**Issue received:** "${userMessage}"

**Diagnostic Steps:**
1. **Reproduce the issue** — note the exact error message and when it occurs.
2. **Check Event Viewer** — \`Win + R\` → \`eventvwr\` → Windows Logs → Application/System — look for red errors near the time of the issue.
3. **Recent changes** — did this start after a Windows Update, new software install, or network change?
4. **Restart** the affected service or application first.

If these steps don't resolve it, submit a support ticket via the **User Portal** with:
- Screenshot of the error
- Affected device name (run \`hostname\` in cmd)
- Time the issue started

✅ **Verify**: After trying the steps above, test the original workflow that was failing.`;
}

// ─────────────────────────────────────────────
//  ROUTES
// ─────────────────────────────────────────────

app.get("/api/health", (_req, res) => {
  const provider = groq
    ? `Groq (${GROQ_MODELS[0]})`
    : openrouter
    ? "OpenRouter"
    : openai
    ? "OpenAI"
    : "Offline Knowledge Base";

  res.json({ status: "ok", aiProvider: provider });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const cleanMessage = message.trim();

    // Build conversation messages with full history for context
    const conversationMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      // Include prior conversation turns (up to last 10 exchanges)
      ...history.slice(-20).map((m) => ({
        role: m.type === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: cleanMessage },
    ];

    // ── 1. Try Groq with model fallback cascade ──────────────────
    if (groq) {
      for (const model of GROQ_MODELS) {
        try {
          const completion = await groq.chat.completions.create({
            model,
            messages: conversationMessages,
            temperature: 0.5,
            max_tokens: 1024,
          });

          const reply = completion.choices[0]?.message?.content;
          if (reply && reply.trim()) {
            console.log(`✅ Groq responded with model: ${model}`);
            return res.json({ answer: reply.trim(), provider: `Groq (${model})` });
          }
        } catch (err) {
          console.warn(`⚠️  Groq model ${model} failed: ${err.message} — trying next model...`);
          // Short pause before retrying next model
          await new Promise((r) => setTimeout(r, 300));
        }
      }
    }

    // ── 2. Try OpenRouter ─────────────────────────────────────────
    if (openrouter) {
      const orModel = process.env.AI_MODEL || "qwen/qwen3.8-27b";
      for (const modelId of [orModel, `${orModel}:free`, "meta-llama/llama-3.3-70b-instruct"]) {
        try {
          const completion = await openrouter.chat.completions.create({
            model: modelId,
            messages: conversationMessages,
            temperature: 0.5,
            max_tokens: 1024,
          });
          const reply = completion.choices[0]?.message?.content;
          if (reply && reply.trim()) {
            console.log(`✅ OpenRouter responded with model: ${modelId}`);
            return res.json({ answer: reply.trim(), provider: `OpenRouter (${modelId})` });
          }
        } catch (err) {
          console.warn(`⚠️  OpenRouter model ${modelId} failed: ${err.message}`);
        }
      }
    }

    // ── 3. Try OpenAI ─────────────────────────────────────────────
    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: conversationMessages,
          temperature: 0.5,
          max_tokens: 1024,
        });
        const reply = completion.choices[0]?.message?.content;
        if (reply && reply.trim()) {
          return res.json({ answer: reply.trim(), provider: "OpenAI (gpt-4o-mini)" });
        }
      } catch (err) {
        console.warn("OpenAI failed:", err.message);
      }
    }

    // ── 4. Offline Knowledge Base ─────────────────────────────────
    return res.json({
      answer: offlineResponse(cleanMessage),
      provider: "intelligent-knowledge-base",
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: "Server response failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const provider = groq
    ? `Groq → models: ${GROQ_MODELS.slice(0, 3).join(", ")}`
    : openrouter
    ? "OpenRouter"
    : openai
    ? "OpenAI"
    : "⚠️  No API key found — using Offline Knowledge Base";

  console.log(`\nHelpIQ AI server → http://localhost:${PORT}`);
  console.log(`Provider: ${provider}\n`);
});
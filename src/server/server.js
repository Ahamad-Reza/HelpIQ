import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    res.json({
      answer: `HelpIQ received your message: "${message}". This is a temporary local test response.`,
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    res.status(500).json({
      error: "Server response failed",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`HelpIQ AI server running on http://localhost:${PORT}`);
});
console.log("Starting server...");
console.log("Current working directory:", process.cwd());

import dotenv from "dotenv";
dotenv.config({ path: ['.env'] });



import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import cors from "cors";


const app = express();

app.use(cors({
  origin: "http://localhost:4200",
  methods: "GET,POST",
  allowedHeaders: "Content-Type"
}));

console.log("API KEY:", process.env.GOOGLE_API_KEY);

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post("/devops/src/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const result = await model.generateContent(prompt);

    // COMPATIBLE RETURN FORMAT
    res.json({ response: result.response?.text() ?? result.text() });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



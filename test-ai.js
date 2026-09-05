import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log(
  "Chave existe:",
  Boolean(process.env.ANTHROPIC_API_KEY)
);

console.log(
  "Modelo:",
  process.env.ANTHROPIC_MODEL
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

try {
  const response = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
    max_tokens: 100,
    messages: [
      {
        role: "user",
        content: "Responda apenas: OK",
      },
    ],
  });

  console.log("RESPOSTA:", response.content);
} catch (error) {
  console.error("ERRO:", error);
}
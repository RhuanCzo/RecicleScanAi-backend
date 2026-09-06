import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { scanRouter } from "./routes/scan.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://recicle-scan-ai-frontend-6929vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "reciclescanai-backend",
  });
});

app.use("/api", scanRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada.",
  });
});

app.listen(PORT, () => {
  console.log(`♻️ recicleScanAI backend rodando na porta ${PORT}`);
});
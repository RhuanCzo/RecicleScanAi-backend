import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config";

import { scanRouter } from "./routes/scan.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3001",
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
  console.log(
    `♻️ recicleScanAI backend rodando em http://localhost:${PORT}`
  );
});
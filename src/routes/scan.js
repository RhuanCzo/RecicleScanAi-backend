import { Router } from "express";
import multer from "multer";
import { classifyWasteImage } from "../services/aiService.js";
import { getCatalogEntry } from "../services/wasteCatalog.js";
import { saveScan, listRecentScans } from "../db.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
});

export const scanRouter = Router();

scanRouter.post("/scan", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Envie uma imagem no campo 'image'." });
    }

    const classification = await classifyWasteImage(req.file.buffer, req.file.mimetype);
    const catalogEntry = getCatalogEntry(classification.material);

    const result = {
      itemLabel: classification.itemLabel,
      material: classification.material,
      confidence: classification.confidence,
      reasoning: classification.reasoning,
      ...catalogEntry,
    };

    const saved = await saveScan({
      itemLabel: result.itemLabel,
      material: result.material,
      binColor: result.binColor,
      binName: result.binName,
      recycles: result.recycles,
      decomposeMinYears: result.decomposeMinYears,
      decomposeMaxYears: result.decomposeMaxYears,
      recycleTimeLabel: result.recycleTimeLabel,
      confidence: result.confidence,
      tips: result.tips,
    });

    res.status(201).json({ result, scanId: saved.id, createdAt: saved.created_at });
  } catch (err) {
    console.error("[POST /api/scan] erro:", err.message);
    res.status(500).json({ error: "Não foi possível analisar essa imagem. Tente novamente." });
  }
});

scanRouter.get("/history", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const scans = await listRecentScans(limit);
    res.json({ scans });
  } catch (err) {
    console.error("[GET /api/history] erro:", err.message);
    res.status(500).json({ error: "Não foi possível carregar o histórico." });
  }
});

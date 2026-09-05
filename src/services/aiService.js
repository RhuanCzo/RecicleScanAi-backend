import ollama from "ollama";
import { VALID_MATERIALS } from "./wasteCatalog.js";

const MODEL = "gemma3:4b";

const SYSTEM_PROMPT = `
Você é um classificador de resíduos para o app recicleScanAI.

Você recebe a foto de UM item de lixo.

Sua tarefa é identificar o objeto e determinar seu material principal.

Responda SOMENTE com JSON válido.

Formato obrigatório:

{
  "itemLabel": "nome curto e específico do item em português",
  "material": "categoria do material",
  "confidence": 0.0,
  "reasoning": "explicação curta"
}

As únicas categorias permitidas são:

${VALID_MATERIALS.join(", ")}

REGRAS:

- material deve ser EXATAMENTE uma das categorias permitidas.
- Não crie novas categorias.
- Identifique o objeto mostrado na imagem.
- Se houver vários materiais, escolha o material predominante.
- Se não conseguir identificar o objeto com segurança, use "naoReciclavel".
- confidence deve ser um número entre 0 e 1.
- reasoning deve ser uma frase curta.
- Não invente tempo de decomposição.
`;

export async function classifyWasteImage(imageBuffer, mimeType) {
  if (!imageBuffer || !imageBuffer.length) {
    throw new Error("Imagem inválida ou vazia.");
  }

  console.log("Enviando imagem para Ollama...");

  const response = await ollama.chat({
    model: MODEL,

    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content:
          "Analise a imagem e classifique o item de lixo seguindo exatamente o formato JSON solicitado.",

        images: [
          imageBuffer.toString("base64"),
        ],
      },
    ],

    options: {
      temperature: 0,
    },
  });

  const text = response.message?.content?.trim();

  if (!text) {
    throw new Error("O Ollama não retornou uma resposta.");
  }

  console.log("Resposta da IA:", text);

  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let parsed;

  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    throw new Error(
      `Não foi possível interpretar a resposta da IA: ${text}`
    );
  }

  if (!parsed.itemLabel) {
    throw new Error("A IA não retornou um itemLabel válido.");
  }

  if (!VALID_MATERIALS.includes(parsed.material)) {
    parsed.material = "naoReciclavel";
  }

  if (
    typeof parsed.confidence !== "number" ||
    parsed.confidence < 0 ||
    parsed.confidence > 1
  ) {
    parsed.confidence = 0.3;
  }

  if (!parsed.reasoning) {
    parsed.reasoning =
      "Não foi possível determinar o material com segurança.";
  }

  return parsed;
}
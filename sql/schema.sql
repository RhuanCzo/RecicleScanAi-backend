-- recicleScanAI · schema do PostgreSQL

CREATE TABLE IF NOT EXISTS scans (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    item_label      TEXT NOT NULL,          -- nome do item identificado (ex.: "garrafa PET")
    material        TEXT NOT NULL,          -- categoria de material (ex.: "plastico")
    bin_color       TEXT NOT NULL,          -- cor da lata recomendada
    bin_name        TEXT NOT NULL,          -- nome da lata (ex.: "Lata Vermelha - Plástico")
    recycles        BOOLEAN NOT NULL,       -- se é reciclável
    decompose_min_years NUMERIC,            -- estimativa mínima (anos) para sumir na natureza
    decompose_max_years NUMERIC,            -- estimativa máxima (anos) para sumir na natureza
    recycle_time_label  TEXT,               -- tempo aproximado do ciclo de reciclagem
    confidence      NUMERIC,                -- confiança da IA (0-1)
    tips            TEXT,                   -- dica curta de descarte
    image_ref       TEXT                    -- referência opcional da imagem (se armazenada)
);

CREATE INDEX IF NOT EXISTS idx_scans_created_at ON scans (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scans_material ON scans (material);

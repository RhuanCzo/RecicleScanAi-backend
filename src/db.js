import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("[postgres] erro inesperado no pool:", err.message);
});

export async function saveScan(scan) {
  const {
    itemLabel,
    material,
    binColor,
    binName,
    recycles,
    decomposeMinYears,
    decomposeMaxYears,
    recycleTimeLabel,
    confidence,
    tips,
    imageRef,
  } = scan;

  const { rows } = await pool.query(
    `INSERT INTO scans
      (item_label, material, bin_color, bin_name, recycles,
       decompose_min_years, decompose_max_years, recycle_time_label,
       confidence, tips, image_ref)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [
      itemLabel,
      material,
      binColor,
      binName,
      recycles,
      decomposeMinYears,
      decomposeMaxYears,
      recycleTimeLabel,
      confidence,
      tips,
      imageRef ?? null,
    ]
  );

  return rows[0];
}

export async function listRecentScans(limit = 20) {
  const { rows } = await pool.query(
    `SELECT * FROM scans ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );
  return rows;
}

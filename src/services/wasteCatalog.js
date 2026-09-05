/**
 * Catálogo de referência: material -> lata correta + tempo de decomposição/reciclagem.
 *
 * As cores seguem a Resolução CONAMA nº 275/2001 (padrão brasileiro de coleta seletiva).
 * Os tempos de decomposição são estimativas amplamente divulgadas por órgãos ambientais
 * (CETESB, Ministério do Meio Ambiente) e podem variar conforme o ambiente.
 *
 * A IA só decide QUAL material o item é; o tempo/lata sempre vem daqui,
 * para evitar números "alucinados".
 */

export const WASTE_CATALOG = {
  plastico: {
    binColor: "#E23B32",
    binName: "Lata Vermelha · Plástico",
    recycles: true,
    decomposeMinYears: 100,
    decomposeMaxYears: 450,
    recycleTimeLabel: "O ciclo de reciclagem leva de algumas semanas a poucos meses, da coleta até virar matéria-prima nova",
    tips: "Esvazie e, se possível, esmague a embalagem antes de descartar.",
  },
  papel: {
    binColor: "#2F6FED",
    binName: "Lata Azul · Papel",
    recycles: true,
    decomposeMinYears: 0.25,
    decomposeMaxYears: 0.5,
    recycleTimeLabel: "Pode ser reciclado em poucos dias em uma usina de papel",
    tips: "Evite descartar papel sujo de gordura ou comida — vai para o lixo comum.",
  },
  vidro: {
    binColor: "#2E9E52",
    binName: "Lata Verde · Vidro",
    recycles: true,
    decomposeMinYears: 1000,
    decomposeMaxYears: 4000,
    recycleTimeLabel: "É 100% reciclável e pode voltar às prateleiras em cerca de 30 dias",
    tips: "Embale cacos com cuidado para não machucar os coletores.",
  },
  metal: {
    binColor: "#F4B400",
    binName: "Lata Amarela · Metal",
    recycles: true,
    decomposeMinYears: 200,
    decomposeMaxYears: 500,
    recycleTimeLabel: "Alumínio pode virar uma lata nova em cerca de 60 dias",
    tips: "Latinhas de alumínio são um dos materiais mais lucrativos de reciclar.",
  },
  organico: {
    binColor: "#8B5E34",
    binName: "Lata Marrom · Orgânico",
    recycles: true,
    decomposeMinYears: 0.05,
    decomposeMaxYears: 0.5,
    recycleTimeLabel: "Vira composto/adubo em semanas a poucos meses em compostagem",
    tips: "Ótimo candidato para compostagem doméstica em vez do lixo comum.",
  },
  eletronico: {
    binColor: "#8E44AD",
    binName: "Ponto de Coleta · Lixo Eletrônico (E-lixo)",
    recycles: true,
    decomposeMinYears: 500,
    decomposeMaxYears: 1000,
    recycleTimeLabel: "Precisa de logística reversa em ponto especializado; não vai no lixo comum",
    tips: "Leve a um ecoponto ou assistência técnica — contém metais pesados tóxicos.",
  },
  perigoso: {
    binColor: "#D9006C",
    binName: "Descarte Especial · Resíduo Perigoso",
    recycles: false,
    decomposeMinYears: 100,
    decomposeMaxYears: 1000,
    recycleTimeLabel: "Não deve ir ao lixo comum — exige descarte em ponto especializado (pilhas, baterias, químicos)",
    tips: "Procure pontos de coleta de pilhas/baterias em farmácias e supermercados.",
  },
  naoReciclavel: {
    binColor: "#6B7280",
    binName: "Lata Cinza · Rejeito (não reciclável)",
    recycles: false,
    decomposeMinYears: 50,
    decomposeMaxYears: 600,
    recycleTimeLabel: "Não entra no ciclo de reciclagem — segue para aterro sanitário",
    tips: "Reduza o consumo desse tipo de material sempre que possível.",
  },
};

export function getCatalogEntry(material) {
  return WASTE_CATALOG[material] ?? WASTE_CATALOG.naoReciclavel;
}

export const VALID_MATERIALS = Object.keys(WASTE_CATALOG);

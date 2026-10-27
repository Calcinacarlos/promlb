import { obtenerResultado } from "../data/matchups";

const puntosMeta = {
  S: 5,
  A: 4,
  B: 3,
  C: 2,
  D: 1,
};

export function recomendarHeroes(
  heroes,
  rol,
  meta,
  matchups,
  picksEnemigos,
  noDisponibles
) {
  const usados = new Set(
    noDisponibles.filter(Boolean).map((h) => h.id)
  );

  return heroes
    // Excluir héroes utilizados
    .filter((h) => !usados.has(h.id))

    // Solo héroes clasificados para esta posición
    .filter((h) => puntosMeta[meta[`${rol}-${h.id}`]] !== undefined)

    .map((h) => {
      const tier = meta[`${rol}-${h.id}`];

      let victorias = 0;
      let derrotas = 0;
      let empates = 0;
      let desconocidos = 0;

      picksEnemigos.filter(Boolean).forEach((rival) => {
        const resultado = obtenerResultado(
          matchups,
          h.id,
          rival.id
        );

        if (resultado === "WIN") {
          victorias++;
        } else if (resultado === "LOSE") {
          derrotas++;
        } else if (resultado === "DRAW") {
          empates++;
        } else {
          desconocidos++;
        }
      });

      const puntos =
        puntosMeta[tier] +
        victorias * 2 -
        derrotas * 2;

      return {
        heroe: h,
        tier,
        puntos,
        victorias,
        derrotas,
        empates,
        desconocidos,
        evaluados: victorias + derrotas + empates,
      };
    })

    // Orden estratégico
    .sort((a, b) => {
      // 1. Menos counters en contra
      if (a.derrotas !== b.derrotas) {
        return a.derrotas - b.derrotas;
      }

      // 2. Más enfrentamientos favorables
      if (a.victorias !== b.victorias) {
        return b.victorias - a.victorias;
      }

      // 3. Mejor META
      if (a.puntos !== b.puntos) {
        return b.puntos - a.puntos;
      }

      // 4. Más enfrentamientos evaluados
      return b.evaluados - a.evaluados;
    });
}
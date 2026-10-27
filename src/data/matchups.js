const inversos = {
  WIN: "LOSE",
  DRAW: "DRAW",
  LOSE: "WIN",
};

export function obtenerResultado(registros, heroA, heroB) {
  const menor = Math.min(heroA, heroB);
  const mayor = Math.max(heroA, heroB);

  const resultado = registros[`${menor}-${mayor}`];

  if (!resultado) return null;

  return heroA === menor
    ? resultado
    : inversos[resultado];
}

export function guardarResultado(registros, heroA, heroB, resultado) {
  if (heroA === heroB || !inversos[resultado]) {
    return registros;
  }

  const menor = Math.min(heroA, heroB);
  const mayor = Math.max(heroA, heroB);

  return {
    ...registros,
    [`${menor}-${mayor}`]:
      heroA === menor ? resultado : inversos[resultado],
  };
}
export function eliminarResultado(registros, heroA, heroB) {
  const menor = Math.min(heroA, heroB);
  const mayor = Math.max(heroA, heroB);

  const nuevos = { ...registros };

  delete nuevos[`${menor}-${mayor}`];

  return nuevos;
}
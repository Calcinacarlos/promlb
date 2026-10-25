
export function crearDraftInicial() {
  return {
    currentStep: 0,

    teams: {
      A: {
        bans: Array(5).fill(null),
        picks: Array(5).fill(null),
      },

      B: {
        bans: Array(5).fill(null),
        picks: Array(5).fill(null),
      },
    },
  };
}


export function obtenerPasoActual(draft, template) {
  const paso = template[draft.currentStep];

  return paso ?? null;
}


export function registrarHeroe(draft, template, heroe) {
  const paso = obtenerPasoActual(draft, template);

  // Verificar que exista un turno y un héroe válido
  if (!paso || heroe?.id == null) {
    return draft;
  }

  // Comprobar que el héroe no haya sido utilizado
  const utilizados = Object.values(draft.teams)
    .flatMap(equipo => [...equipo.bans, ...equipo.picks]);

  if (utilizados.some(h => h?.id === heroe.id)) {
    return draft;
  }

  // Identificar la acción y el equipo
  const tipo = paso.action === "ban" ? "bans"
    : paso.action === "pick" ? "picks"
    : null;

  const equipo = draft.teams[paso.team];

  if (
    !tipo ||
    !equipo ||
    !Number.isInteger(paso.slot) ||
    paso.slot < 0 ||
    paso.slot >= equipo[tipo].length ||
    equipo[tipo][paso.slot] !== null
  ) {
    return draft;
  }

  // Actualizar el espacio correspondiente
  return {
    ...draft,
    currentStep: draft.currentStep + 1,
    teams: {
      ...draft.teams,
      [paso.team]: {
        ...equipo,
        [tipo]: equipo[tipo].map((actual, indice) =>
          indice === paso.slot ? heroe : actual
        ),
      },
    },
  };
}

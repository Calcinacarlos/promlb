export const draftTemplates = {
  rankedFirstPick: [
    // bans
    { action: "ban", team: "A", slot: 0 },
    { action: "ban", team: "A", slot: 1 },
    { action: "ban", team: "A", slot: 2 },

    { action: "ban", team: "B", slot: 0 },
    { action: "ban", team: "B", slot: 1 },
    { action: "ban", team: "B", slot: 2 },

    { action: "ban", team: "A", slot: 3 },
    { action: "ban", team: "A", slot: 4 },

    { action: "ban", team: "B", slot: 3 },
    { action: "ban", team: "B", slot: 4 },

    // picks
    { action: "pick", team: "A", slot: 0 },

    { action: "pick", team: "B", slot: 0 },
    { action: "pick", team: "B", slot: 1 },

    { action: "pick", team: "A", slot: 1 },
    { action: "pick", team: "A", slot: 2 },

    { action: "pick", team: "B", slot: 2 },
    { action: "pick", team: "B", slot: 3 },

    { action: "pick", team: "A", slot: 3 },
    { action: "pick", team: "A", slot: 4 },

    { action: "pick", team: "B", slot: 4 },
  ],
};

draftTemplates.rankedSecondPick =
  draftTemplates.rankedFirstPick.map((paso) => {
    if (paso.action === "pick") {
      return {
        ...paso,
        team: paso.team === "A" ? "B" : "A",
      };
    }

    return { ...paso };
  });

function crearPlantillaTorneo(fases) {
  const contadores = {
    ban: { A: 0, B: 0 },
    pick: { A: 0, B: 0 },
  };

  return fases.flatMap(({ action, orden }) =>
    [...orden].map((team) => ({
      action,
      team,
      slot: contadores[action][team]++,
    }))
  );
}

draftTemplates.tournamentFirstPick = crearPlantillaTorneo([
  { action: "ban", orden: "ABABAB" },
  { action: "pick", orden: "ABBAAB" },
  { action: "ban", orden: "BABA" },
  { action: "pick", orden: "BAAB" },
]);

draftTemplates.tournamentSecondPick =
  draftTemplates.tournamentFirstPick.map((paso) => ({
    ...paso,
    team: paso.team === "A" ? "B" : "A",
  }));


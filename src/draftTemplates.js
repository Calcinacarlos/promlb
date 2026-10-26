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


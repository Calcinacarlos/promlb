import { useState } from "react";
import { draftTemplates } from "../draftTemplates";
import { heroes } from "../data/heroes";
import "./drafts.css";
import { recomendarHeroes } from "../Analisis/recomendaciones";

function Drafts() {
  const [modoDraft, setModoDraft] = useState("rankedFirstPick");
  const [rolActivo, setRolActivo] = useState("TODOS");
  const [metaDraft] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mlbb-meta") || "{}");
    } catch {
      return {};
    }
  });
  const [wdlDraft] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("mlbb-matchups") || "{}"
      );
    } catch {
      return {};
    }
  });

  const roles = ["TODOS", "EXP", "JG", "MID", "GOLD", "ROAM"];

  const template = draftTemplates[modoDraft];

  const [currentStep, setCurrentStep] = useState(0);

  const [heroeS, setHeroeS] = useState(null);
  console.log(template[currentStep]);
  

  const [myBans, setMyBans] = useState(Array(5).fill(null));
  const [enemyBans, setEnemyBans] = useState(Array(5).fill(null));
  const [myPicks, setMyPicks] = useState(Array(5).fill(null));
  const [rolesPicksA, setRolesPicksA] = useState(
    Array(5).fill("FLEX")
  );
  const [enemyPicks, setEnemyPicks] = useState(Array(5).fill(null));


  const pasoActual = template[currentStep];

  const bansA = myBans;

  const bansB = enemyBans;
  //A
  const picksA = myPicks;
  //B
  const picksB = enemyPicks;
  //m

  const asignarHeroe = () => {
    if (heroeS === null) return;
      if (!pasoActual) return;

        const { action, team, slot } = pasoActual;
        
        if (modoDraft.startsWith("tournament") && action === "ban") {
          const heroesUsados = [
            ...myBans,
            ...enemyBans,
            ...myPicks,
            ...enemyPicks,
          ];

          const repetido = heroesUsados.some(
            (heroe) => heroe?.id === heroeS.id
          );

          if (repetido) {
            alert("Este héroe ya fue utilizado en el torneo");
            return;
          }
        }

        if (action === "ban") {
          const bansDelEquipo = team === "A" ? myBans : enemyBans;

          const repetidoPropio = bansDelEquipo.some(
            (h) => h !== null && h.id === heroeS.id
          );

          const bansFase1 = [
            ...myBans.slice(0, 3),
            ...enemyBans.slice(0, 3),
          ];

          const repetidoFase1 = bansFase1.some(
            (h) => h !== null && h.id === heroeS.id
          );

          if (repetidoPropio || (slot >= 3 && repetidoFase1)) {
            alert("Este héroe ya está baneado y no puede repetirse");
            return;
          }
        }

        if (action === "pick") {
          const todosLosBans = [...myBans, ...enemyBans];

          const estaBaneado = todosLosBans.some(
            (h) => h !== null && h.id === heroeS.id
          );

          if (estaBaneado) {
            alert("Este héroe está baneado y no puede seleccionarse");
            return;
          }
          const todosLosPicks = [...myPicks, ...enemyPicks];

          const yaSeleccionado = todosLosPicks.some(
            (h) => h !== null && h.id === heroeS.id
          );

          if (yaSeleccionado) {
            alert("Este héroe ya fue seleccionado por un equipo");
            return;
          }
        }
        console.log("Acción:", action);
        console.log("Equipo:", team);
        console.log("Casilla:", slot);
        if (action === "ban" && team === "A") {
          const nuevosBans = [...myBans];

          nuevosBans[slot] = heroeS;

          setMyBans(nuevosBans);

          setCurrentStep((prev) => prev + 1);
          setHeroeS(null);
        }
        if (action === "ban" && team === "B") {
          const nuevosBans = [...enemyBans];
          nuevosBans[slot] = heroeS;
          setEnemyBans(nuevosBans);

          setCurrentStep((prev) => prev + 1);
          setHeroeS(null);
        }

        if (action === "pick" && team === "A") {
          const nuevosPicks = [...myPicks];

          nuevosPicks[slot] = heroeS;

          setMyPicks(nuevosPicks);

          setCurrentStep((prev) => prev + 1);
          setHeroeS(null);
        }

        if (action === "pick" && team === "B") {
          const nuevosPicks = [...enemyPicks];

          nuevosPicks[slot] = heroeS;

          setEnemyPicks(nuevosPicks);

          setCurrentStep((prev) => prev + 1);
          setHeroeS(null);
        }
        return;
  };



    const reiniciarDraft = () => {
      setRolesPicksA(Array(5).fill("FLEX"));
      setCurrentStep(0);
      setHeroeS(null);

      setMyBans(Array(5).fill(null));
      setEnemyBans(Array(5).fill(null));

      setMyPicks(Array(5).fill(null));
      setEnemyPicks(Array(5).fill(null));
    };
    const recomendaciones = rolActivo === "TODOS"
      ? []
      : recomendarHeroes(
          heroes,
          rolActivo,
          metaDraft,
          wdlDraft,
          enemyPicks,
          []
        );

    const ordenRecomendaciones = new Map(
      recomendaciones.map((r, indice) => [
        r.heroe.id,
        indice
      ])
    );

  return (
    <div className="draft-container">
      {/* ================= PICKS ================= */}
      <div className="picks-row">
        {/* EQUIPO A: PICKS Y BANS */}
        <div className="team-column">
          {/* ROLES DE LOS PICKS ALIADOS */}
          <div className="team-row">
            {picksA.map((heroe, i) => (
              <select
                key={i}
                value={rolesPicksA[i]}
                disabled={!heroe}
                onChange={(e) => {
                  const nuevosRoles = [...rolesPicksA];
                  nuevosRoles[i] = e.target.value;
                  setRolesPicksA(nuevosRoles);
                }}
                style={{
                  flex: "1 1 0",
                  minWidth: 0,
                  fontSize: "10px",
                  padding: "2px 0",
                }}
              >
                <option value="FLEX">FLEX</option>
                <option value="EXP">EXP</option>
                <option value="JG">JG</option>
                <option value="MID">MID</option>
                <option value="GOLD">GOLD</option>
                <option value="ROAM">ROAM</option>
              </select>
            ))}
          </div>
          <div className="team-row">
            {picksA.map((s, i) => (
              <div key={i} className="pick-slot">
                {s ? <img src={s.img} alt={s.name} /> : "Vacío"}
              </div>
            ))}
          </div>
            
          <div className="team-row">
            {bansA.map((s, i) => (
              <div key={i} className="slot ban">
                {s ? <img src={s.img} alt={s.name} /> : "Vacío"}
              </div>
            ))}
          </div>

        </div>
        {/* HEROES CENTRO */}
        <div className="heroes-panel">

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "nowrap",
              gap: "5px",
              marginBottom: "10px",
              overflowX: "auto",
              maxWidth: "100%",
            }}
          >
            {roles.map((rol) => (
              <button
                key={rol}
                type="button"
                onClick={() => setRolActivo(rol)}
                style={{
                  background: rolActivo === rol ? "#2563eb" : "#333",
                  color: "white",
                  padding: "6px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                {rol}
              </button>
            ))}
          </div>

          <div className="heroes">
            {heroes
              .filter((h) => {
                if (rolActivo === "TODOS") return true;

                return ["S", "A", "B", "C", "D"].includes(
                  metaDraft[`${rolActivo}-${h.id}`]
                );
              })
              .filter((h) => {
                if (!pasoActual) return true;

                const { action, team, slot } = pasoActual;

                const todosLosBans = [...myBans, ...enemyBans];
                const todosLosPicks = [...myPicks, ...enemyPicks];

                // PICKS: excluir todos los héroes utilizados
                if (action === "pick") {
                  return ![...todosLosBans, ...todosLosPicks]
                    .some((heroe) => heroe?.id === h.id);
                }

                // BANS DE TORNEO: no permitir repeticiones
                if (action === "ban" && modoDraft.startsWith("tournament")) {
                  return ![...todosLosBans, ...todosLosPicks]
                    .some((heroe) => heroe?.id === h.id);
                }

                // BANS DE RANKED: respetar las reglas actuales
                if (action === "ban") {
                  const bansPropios = team === "A" ? myBans : enemyBans;

                  const repetidoPropio = bansPropios.some(
                    (heroe) => heroe?.id === h.id
                  );

                  const bansFase1 = [
                    ...myBans.slice(0, 3),
                    ...enemyBans.slice(0, 3),
                  ];

                  const repetidoFase1 = bansFase1.some(
                    (heroe) => heroe?.id === h.id
                  );

                  return !repetidoPropio && !(slot >= 3 && repetidoFase1);
                }

                return true;
                })
                .sort((a, b) => {
                  const posicionA =
                    ordenRecomendaciones.get(a.id) ?? Infinity;

                  const posicionB =
                    ordenRecomendaciones.get(b.id) ?? Infinity;

                  return posicionA - posicionB;
                })
                .map((h) => (
                <div
                  key={h.id}
                  className="hero"
                  onClick={() => setHeroeS(h)}
                  style={{
                    cursor: "pointer",
                    border:
                      heroeS?.id === h.id
                        ? "2px solid yellow"
                        : "2px solid blue",
                  }}
                >
                  <img src={h.img} alt={h.name} />
                </div>
              ))}
          </div>
                      
            <label htmlFor="modoDraft">Modo de draft: </label>

            <select
              id="modoDraft"
              value={modoDraft}
              onChange={(event) => {
                setModoDraft(event.target.value);
                reiniciarDraft();
              }}
            >
            
              <option value="tournamentFirstPick">
                Torneo - First Pick
              </option>

              <option value="tournamentSecondPick">
                Torneo - Second Pick
              </option>

              <option value="rankedFirstPick">
                Ranked - First Pick
              </option>

              <option value="rankedSecondPick">
                Ranked - Second Pick
              </option>
            </select>

          <button onClick={asignarHeroe}>Seleccionar</button>
          <button onClick={reiniciarDraft}>
            Reiniciar Draft
          </button>
        </div>
                {/* EQUIPO B: PICKS Y BANS */}
        <div className="team-column">

          <div className="team-row reverse">
            {picksB.map((s, i) => (
              <div key={i} className="pick-slot">
                {s ? <img src={s.img} alt={s.name} /> : "Vacío"}
              </div>
            ))}
          </div>

          <div className="team-row reverse">
            {bansB.map((s, i) => (
              <div key={i} className="slot ban">
                {s ? <img src={s.img} alt={s.name} /> : "Vacío"}
              </div>
            ))}
          </div>

        </div>

      </div> {/* Cierre de picks-row */}
    </div>   /* Cierre de draft-container */
  );
}

export default Drafts;


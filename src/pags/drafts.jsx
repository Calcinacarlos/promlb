import { useState } from "react";
import { draftTemplates } from "../draftTemplates";
import { heroes } from "../data/heroes";
import "./drafts.css";

function Drafts() {
  const [modoDraft, setModoDraft] = useState("rankedFirstPick");

  const template = draftTemplates[modoDraft];

  const [currentStep, setCurrentStep] = useState(0);

  const [heroeS, setHeroeS] = useState(null);
  console.log(template[currentStep]);
  

  const [myBans, setMyBans] = useState(Array(5).fill(null));
  const [enemyBans, setEnemyBans] = useState(Array(5).fill(null));
  const [myPicks, setMyPicks] = useState(Array(5).fill(null));
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
      setCurrentStep(0);
      setHeroeS(null);

      setMyBans(Array(5).fill(null));
      setEnemyBans(Array(5).fill(null));

      setMyPicks(Array(5).fill(null));
      setEnemyPicks(Array(5).fill(null));
    };

  return (
    <div className="draft-container">
      {/* ================= PICKS ================= */}
      <div className="picks-row">
        {/* EQUIPO A: PICKS Y BANS */}
        <div className="team-column">

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
          <div className="heroes">
            {heroes.map((h, i) => {
              let bloqueado = false;
              if (
                pasoActual?.action === "pick" ||
                (modoDraft.startsWith("tournament") && pasoActual?.action === "ban")
              ) {
                const noDisponibles = [
                  ...myBans,
                  ...enemyBans,
                  ...myPicks,
                  ...enemyPicks,
                ];

                bloqueado = noDisponibles.some(
                  (heroe) => heroe?.id === h.id
                );
              }

              return (
                <div
                  key={i}
                  className="hero"
                  onClick={() => {
                    if (!bloqueado) {
                      setHeroeS(h);
                    }
                  }}
                  style={{
                    opacity: bloqueado ? 0.3 : 1,
                    cursor: bloqueado ? "not-allowed" : "pointer",
                    border:
                      heroeS === h ? "2px solid yellow" : "2px solid blue",
                  }}
                >
                  <img src={h.img} alt={h.name} />
                </div>
              );
            })}
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


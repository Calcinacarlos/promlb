import arlotImg from "../heroes/Arlot.jpg";
import baxiaImg from "../heroes/Baxia.jpg";
import chouImg from "../heroes/Chou.jpg";
import zhuxinImg from "../heroes/Chuchin.jpg";
import claudeImg from "../heroes/Claude.jpg";
import fredrinImg from "../heroes/Fredrin.jpg";
import gatotImg from "../heroes/Gatot.jpg";
import glooImg from "../heroes/Gloo.jpg";
import gordImg from "../heroes/Gord.jpg";
import guinevereImg from "../heroes/Guinevere.jpg";
import harithImg from "../heroes/Harith.jpg";
import harleyImg from "../heroes/Harley.jpg";
import hildaImg from "../heroes/Hilda.jpg";
import hilosImg from "../heroes/Hilos.jpg";
import kaleaImg from "../heroes/Kalea.jpg";
import kaledImg from "../heroes/Kaled.jpg";
import karrieImg from "../heroes/Karrie.jpg";
import kimmyImg from "../heroes/Kimmy.jpg";
import lapulapuImg from "../heroes/Lapu.jpg";
import leomordImg from "../heroes/Lomasroto.jpg";
import marcelImg from "../heroes/Marcel.jpg";
import moskovImg from "../heroes/Moskito.jpg";
import pharsaImg from "../heroes/Pharsa.jpg";
import phoveusImg from "../heroes/Phoveus.jpg";
import soraImg from "../heroes/Sora.jpg";
import suyouImg from "../heroes/Suyou.jpg";
import valentinaImg from "../heroes/Valentina.jpg";
import aliceImg from "../heroes/Vampirameta.jpg";
import yizunzinImg from "../heroes/Yizun.jpg";
import yveImg from "../heroes/Yve.jpg";

import { useState } from "react";
import { draftTemplates } from "../draftTemplates";
import "./drafts.css";
function Drafts() {
  const heroes = [
    { id: 1, name: "Arlot", img: arlotImg },
    { id: 2, name: "Baxia", img: baxiaImg },
    { id: 3, name: "Chou", img: chouImg },
    { id: 4, name: "Zhuxin", img: zhuxinImg },
    { id: 5, name: "Claude", img: claudeImg },
    { id: 6, name: "Gatot", img: gatotImg },
    { id: 7, name: "Gloo", img: glooImg },
    { id: 8, name: "Gord", img: gordImg },
    { id: 9, name: "Guinevere", img: guinevereImg },
    { id: 10, name: "Harith", img: harithImg },
    { id: 11, name: "Harley", img: harleyImg },
    { id: 12, name: "Hilda", img: hildaImg },
    { id: 13, name: "Hilos", img: hilosImg },
    { id: 14, name: "Kalea", img: kaleaImg },
    { id: 15, name: "Kaled", img: kaledImg },
    { id: 16, name: "Karrie", img: karrieImg },
    { id: 17, name: "Kimmy", img: kimmyImg },
    { id: 18, name: "LapuLapu", img: lapulapuImg },
    { id: 19, name: "Leomord", img: leomordImg },
    { id: 20, name: "Marcel", img: marcelImg },
    { id: 21, name: "Moscov", img: moskovImg },
    { id: 22, name: "Pharsa", img: pharsaImg },
    { id: 23, name: "Phoveus", img: phoveusImg },
    { id: 24, name: "Sora", img: soraImg },
    { id: 25, name: "Suyou", img: suyouImg },
    { id: 26, name: "Valentina", img: valentinaImg },
    { id: 27, name: "Alice", img: aliceImg },
    { id: 28, name: "Yizunzin", img: yizunzinImg },
    { id: 29, name: "Yve", img: yveImg },
    { id: 30, name: "Fredrin", img: fredrinImg },
  ];
  const template = draftTemplates.rankedFirstPick;

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
        {/* TEAM A PICKS */}
        <div className="team-row">
          {picksA.map((s, i) => {
            return (
              <div key={i} className="pick-slot">
                {s ? <img src={s.img} alt={s.name} /> : "Vacío"}
              </div>
            );
          })}
        </div>
        {/* HEROES CENTRO */}
        <div className="heroes-panel">
          <div className="heroes">
            {heroes.map((h, i) => {
              let bloqueado = false;
              if (pasoActual?.action === "pick") {
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
          <button onClick={asignarHeroe}>Seleccionar</button>
          <button onClick={reiniciarDraft}>
            Reiniciar Draft
          </button>
        </div>
        {/* TEAM B PICKS (invertido ) */}
        <div className="team-row reverse">
          {picksB.map((s, i) => {
            return (
              <div key={i} className="pick-slot">
                {s ? <img src={s.img} alt={s.name} /> : "Vacío"}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= BANS ================= */}
      {/* ================= A ================= */}
      <div className="bans-row">
        <div className="team-row">
          {bansA.map((s, i) => {
            return (
              <div key={i} className="slot ban">
                {s ? <img src={s.img} alt={s.name} /> : "Vacío"}
              </div>
            );
          })}
        </div>
        {/* ================= B ================= */}

        <div style={{ width: "200px" }} />

        <div className="team-row reverse">
          {bansB.map((s, i) => {
            return (
              <div key={i} className="slot ban">
                {s ? <img src={s.img} alt={s.name} /> : "Vacío"}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Drafts;

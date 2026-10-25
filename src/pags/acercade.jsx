import "./acercade.css";

import loggoo from "../componentes/loggoo.png";
import logtel from "../componentes/logtel.png";
import couchImg from "../componentes/couch.png";

function Acer() {
  return (
    <div className="acerca-container">
      <h1>ACERCA DE</h1>

      <div className="acerca-card">
        <p>
          Este proyecto tiene como objetivo facilitar el aprendizaje de nuevos
          jugadores de Mobile Legends y mejorar la toma de decisiones en la fase
          de drafts. El sistema simula el proceso de selección y bloqueo de
          héroes utilizado en partidas competitivas, permitiendo entender mejor
          las estrategias de picks y bans. Además, la base de datos de héroes
          ayuda a visualizar posibles enfrentamientos y ventajas entre
          personajes.
        </p>
      </div>

      <div className="acerca-redes">
        <img src={loggoo} alt="Google" />
        <img src={logtel} alt="Telegram" />
      </div>

      <img src={couchImg} alt="Logo" className="acerca-logo" />
    </div>
  );
}

export default Acer;

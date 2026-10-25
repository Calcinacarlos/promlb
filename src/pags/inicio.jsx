import { Link } from "react-router-dom";
import couchImg from "../componentes/couch.png";
import "./inicio.css";
function Inicio() {
  return (
    <div className="inicio-container">
      <h1>ASISTENTE DE DRAFTS</h1>

      <img src={couchImg} alt="Logo" className="inicio-logo" />

      <p>
        Herramienta de apoyo para la fase de drafts de Mobile Legends: Bang
        Bang, orientada a optimizar las decisiones de picks y bans tanto en
        entornos competitivos como para jugadores en proceso de aprendizaje.
      </p>

      <Link to="/drafts">
        <button>INICIO</button>
      </Link>
    </div>
  );
}

export default Inicio;

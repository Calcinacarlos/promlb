import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="nav-global">
      <div className="nav-links">
        <Link to="/">INICIO</Link>
        <Link to="/drafts">DRAFTS</Link>
        <Link to="/base">BASE</Link>
        <Link to="/ayuda">AYUDA</Link>
        <Link to="/acercade">ACERCA DE ..</Link>
      </div>
    </nav>
  );
}

export default Navbar;

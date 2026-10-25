import { useLocation } from "react-router-dom";
import loggoo from "./loggoo.png";
import logtel from "./logtel.png";
import "./footer.css";

function Footer() {
  const location = useLocation();

  if (location.pathname === "/acercade") {
    return null;
  }
  return (
    <footer className="footer-global">
      <div className="footer-icons">
        <img src={logtel} alt="icono 1" />
        <img src={loggoo} alt="icono 2" />
      </div>
    </footer>
  );
}

export default Footer;

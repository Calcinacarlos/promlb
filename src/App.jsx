
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./componentes/navbar";
import Footer from "./componentes/footer";

import Drafts from "./pags/drafts";
import Base from "./pags/base";
import Ayuda from "./pags/ayuda";
import Inicio from "./pags/inicio";
import Acer from "./pags/acercade";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <main className="contenido">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/base" element={<Base />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/acercade" element={<Acer />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

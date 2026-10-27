import { useState, useEffect } from "react";
import "./base.css";
import { heroes } from "../data/heroes";
import { obtenerResultado, guardarResultado, eliminarResultado,} from "../data/matchups";

function Base() {
  const [heroeSeleccionado, setHeroeSeleccionado] = useState(heroes[0].id);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaRival, setBusquedaRival] = useState("");

  const [categoriaActiva, setCategoriaActiva] = useState("WIN");
  const [infoBase, setInfoBase] = useState(() => {
  try {
    const datos = localStorage.getItem("mlbb-base-info");

    return datos
      ? JSON.parse(datos)
      : {
          nombre: "Mi base WDL",
          autor: "Personal",
        };
  } catch {
    return {
      nombre: "Mi base WDL",
      autor: "Personal",
    };
  }
});
const [clasificaciones, setClasificaciones] = useState(() => {
  
  try {
    const datos = localStorage.getItem("mlbb-matchups");
    return datos ? JSON.parse(datos) : {};
  } catch {
    return {};
  }
});
const exportarWDL = () => {
  const datos = {
    version: 1,
    nombre: infoBase.nombre,
    autor: infoBase.autor,
    matchups: clasificaciones,
  };

  const archivo = new Blob(
    [JSON.stringify(datos, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(archivo);

  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = "mlbb-matchups.json";
  enlace.click();

  URL.revokeObjectURL(url);
};
const importarWDL = async (event) => {
  const archivo = event.target.files[0];

  if (!archivo) return;

  try {
    const texto = await archivo.text();
    const datos = JSON.parse(texto);

    if (
      datos.version !== 1 ||
      !datos.matchups ||
      typeof datos.matchups !== "object" ||
      Array.isArray(datos.matchups) ||
      !Object.entries(datos.matchups).every(
        ([clave, resultado]) =>
          /^\d+-\d+$/.test(clave) &&
          ["WIN", "DRAW", "LOSE"].includes(resultado)
      )
    ) {
      alert("El archivo no contiene una base W/D/L válida");
      return;
    }

    const confirmar = window.confirm(
      "¿Reemplazar las evaluaciones actuales por las del archivo?"
    );

    if (!confirmar) return;

    setClasificaciones(datos.matchups);
    if (
      typeof datos.nombre === "string" &&
      typeof datos.autor === "string"
    ) {
      setInfoBase({
        nombre: datos.nombre,
        autor: datos.autor,
      });
    }

    alert("Base W/D/L importada correctamente");
  } catch {
    alert("No se pudo leer el archivo JSON");
  } finally {
    event.target.value = "";
  }
};
const limpiarWDL = () => {
  const confirmar = window.confirm(
    "¿Seguro que deseas eliminar TODAS las evaluaciones W/D/L? Esta acción no se puede deshacer."
  );

  if (!confirmar) return;

  setClasificaciones({});

  alert("Las tablas W/D/L quedaron vacías.");
};
useEffect(() => {
  localStorage.setItem(
    "mlbb-matchups",
    JSON.stringify(clasificaciones)
  );
}, [clasificaciones]);

useEffect(() => {
  localStorage.setItem(
    "mlbb-base-info",
    JSON.stringify(infoBase)
  );
}, [infoBase]);

const heroeActual = heroes.find(
  (heroe) => heroe.id === heroeSeleccionado
);
const consultarResultado = (rivalId) => {
  return obtenerResultado(
    clasificaciones,
    heroeSeleccionado,
    rivalId
  );
};
const evaluadosHeroe = heroes.filter(
  (heroe) =>
    heroe.id !== heroeSeleccionado &&
    consultarResultado(heroe.id) !== null
).length;

const totalEnfrentamientos =
  heroes.length * (heroes.length - 1);

const enfrentamientosEvaluados =
  Object.keys(clasificaciones).length * 2;
  return (
    <div className="base-container">
      <h2>Base W/D/L — {heroes.length} héroes</h2>
      <div className="wdl-progreso">
        <h3>Progreso de evaluaciones</h3>

        <p>
          {enfrentamientosEvaluados} de {totalEnfrentamientos}
          {" "}enfrentamientos evaluados
        </p>

        <progress
          value={enfrentamientosEvaluados}
          max={totalEnfrentamientos}
        />
      </div>
      <div className="base-info">
      <label>Nombre de la base:</label>

      <input
        type="text"
        value={infoBase.nombre}
        onChange={(e) =>
          setInfoBase({
            ...infoBase,
            nombre: e.target.value,
          })
        }
      />

      <label>Autor:</label>

      <input
        type="text"
        value={infoBase.autor}
        onChange={(e) =>
          setInfoBase({
            ...infoBase,
            autor: e.target.value,
          })
        }
      />
    </div>
      <button onClick={exportarWDL}>
        📥 Exportar W/D/L
      </button>
      <label htmlFor="importar-wdl" className="btn btn-primary">
        📤 Importar W/D/L
      </label>
      <input
        id="importar-wdl"
        type="file"
        accept=".json,application/json"
        onChange={importarWDL}
        style={{ display: "none" }}
      />
      <button
        className="btn btn-danger"
        onClick={limpiarWDL}
      >
        🗑️ Comenzar desde cero
      </button>
      <input
        type="text"
        placeholder="🔍 Buscar héroe..."
        value={busqueda}
        onChange={(e) => {
          const texto = e.target.value;
          setBusqueda(texto);

          const encontrados = heroes.filter((heroe) =>
            heroe.name.toLowerCase().includes(texto.toLowerCase())
          );

          if (texto.trim() && encontrados.length === 1) {
            setHeroeSeleccionado(encontrados[0].id);
          }
        }}
      />
      <select
      value={heroeSeleccionado}
      onChange={(e) => setHeroeSeleccionado(Number(e.target.value))}
      >
      
      {heroes
      .filter((heroe) =>
        heroe.name.toLowerCase().includes(busqueda.toLowerCase())
      )
      .map((heroe) => (
      <option key={heroe.id} value={heroe.id}>
      {heroe.name}
      </option>
      ))}
      </select>
      <div className="hero-card">
  <img
    src={heroeActual.img}
    alt={heroeActual.name}
    className="hero-mini"
  />

  <h3>{heroeActual.name}</h3>
  <p>
    Enfrentamientos evaluados: {evaluadosHeroe} de {heroes.length - 1}
  </p>

</div>
<div className="wdl-container">
  {["WIN", "DRAW", "LOSE"].map((categoria) => (
    <div className="wdl-row" key={categoria}>

      <button
  className={`wdl-label ${categoria.toLowerCase()}`}
  onClick={() => setCategoriaActiva(categoria)}
  style={{
    border: categoriaActiva === categoria ? "3px solid white" : "none",
    cursor: "pointer",
  }}
>
  {categoria}
</button>

      <div className="wdl-heroes">
  {heroes
    .filter(
  (heroe) =>
    consultarResultado(heroe.id) === categoria
)
    .map((heroe) => (
      <img
      key={heroe.id}
      src={heroe.img}
      alt={heroe.name}
      title={`Quitar clasificación de ${heroe.name}`}
      className="hero-mini"
      style={{ cursor: "pointer" }}
      onClick={() => {
  setClasificaciones((prev) =>
    eliminarResultado(
      prev,
      heroeSeleccionado,
      heroe.id
    )
  );
}}
      />
    ))}
</div>

    </div>
  ))}
</div>
<h3>Héroes sin clasificar</h3>
<input
  type="text"
  placeholder="🔍 Buscar rival..."
  value={busquedaRival}
  onChange={(e) => setBusquedaRival(e.target.value)}
/>

<div className="wdl-pendientes">
  {heroes
  .filter(
  (heroe) =>
    heroe.id !== heroeSeleccionado &&
    !consultarResultado(heroe.id)
)
.filter((heroe) =>
  heroe.name.toLowerCase().includes(busquedaRival.toLowerCase())
)
  .map((heroe) => (
      <img
        key={heroe.id}
        src={heroe.img}
        alt={heroe.name}
        title={heroe.name}
        className="hero-mini"
        onClick={() => {
          setClasificaciones((prev) =>
          guardarResultado(
      prev,
      heroeSeleccionado,
      heroe.id,
      categoriaActiva
    )
  );
}}
      />
    ))}
</div>
    </div>
  );
}



export default Base;

import { useState, useEffect } from "react";
import { heroes } from "../data/heroes";
function Ayuda() {
  const [rolActivo, setRolActivo] = useState("EXP");
  const [tierActiva, setTierActiva] = useState("S");
  const [clasificacionesMeta, setClasificacionesMeta] = useState(() => {
    try {
      const datos = localStorage.getItem("mlbb-meta");
      return datos ? JSON.parse(datos) : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem(
      "mlbb-meta",
      JSON.stringify(clasificacionesMeta)
    );
  }, [clasificacionesMeta]);
  const exportarMeta = () => {
    const datos = {
      version: 1,
      tipo: "mlbb-meta",
      clasificaciones: clasificacionesMeta,
    };

    const archivo = new Blob(
      [JSON.stringify(datos, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(archivo);

    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "mlbb-meta.json";
    enlace.click();

    URL.revokeObjectURL(url);
  };
  const importarMeta = async (event) => {
    const archivo = event.target.files[0];

    if (!archivo) return;

    try {
      const texto = await archivo.text();
      const datos = JSON.parse(texto);

      const clasificaciones = datos.clasificaciones;

      const valido =
        datos.version === 1 &&
        datos.tipo === "mlbb-meta" &&
        clasificaciones !== null &&
        typeof clasificaciones === "object" &&
        !Array.isArray(clasificaciones) &&
        Object.entries(clasificaciones).every(
          ([clave, tier]) => {
            const [rol, id] = clave.split("-");

            return (
              ["EXP", "JG", "MID", "GOLD", "ROAM"].includes(rol) &&
              heroes.some((heroe) => String(heroe.id) === id) &&
              ["S", "A", "B", "C", "D"].includes(tier)
            );
          }
        );

      if (!valido) {
        alert("El archivo META no es válido");
        return;
      }

      if (!window.confirm("¿Reemplazar las clasificaciones META actuales?")) {
        return;
      }

      setClasificacionesMeta(clasificaciones);
      alert("META importado correctamente");

    } catch {
      alert("No se pudo leer el archivo JSON");
    } finally {
      event.target.value = "";
    }
  };
  const limpiarMeta = () => {
    const confirmar = window.confirm(
      "¿Eliminar TODAS las clasificaciones META? Esta acción no se puede deshacer."
    );

    if (!confirmar) return;

    setClasificacionesMeta({});
  };
  const roles = ["EXP", "JG", "MID", "GOLD", "ROAM"];
  const tiers = ["S", "A", "B", "C", "D"];
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        META GLOBAL
      </h1>
      <div className="text-center mb-3">
        <button
          className="btn btn-success"
          onClick={exportarMeta}
        >
          📥 Exportar META
        </button>
        <label
          htmlFor="importar-meta"
          className="btn btn-primary ms-2"
        >
          📤 Importar META
        </label>

        <input
          id="importar-meta"
          type="file"
          accept=".json,application/json"
          onChange={importarMeta}
          style={{ display: "none" }}
        />
        <button
          className="btn btn-danger ms-2"
          onClick={limpiarMeta}
        >
          🗑️ Comenzar desde cero
        </button>
      </div>

      <p className="text-center">
        Clasificación competitiva de héroes por posición.
      </p>
      <div className="d-flex justify-content-center gap-2 my-4">
        {roles.map((rol) => (
          <button
            key={rol}
            className={`btn ${
              rolActivo === rol ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setRolActivo(rol)}
          >
            {rol}
          </button>
        ))}
      </div>

      <h3 className="text-center">
        Meta actual: {rolActivo}
      </h3>
      <div className="mt-4">
        {tiers.map((tier) => (
          <div
            key={tier}
            className="d-flex gap-2 mb-2"
            style={{ minHeight: "85px" }}
          >
            <button
              className="d-flex align-items-center justify-content-center"
              onClick={() => setTierActiva(tier)}
              title={`Seleccionar tier ${tier}`}
              style={{
                width: "90px",
                background: {
                  S: "#d4a017",
                  A: "#9b59b6",
                  B: "#2980b9",
                  C: "#7f8c8d",
                  D: "#c0392b",
                }[tier],
                color: "white",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              {tier}
            </button>

            <div
              className="flex-grow-1 rounded p-2"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              {heroes
              .filter(
                (heroe) =>
                  clasificacionesMeta[`${rolActivo}-${heroe.id}`] === tier
              )
              .map((heroe) => (
                <img
                  key={heroe.id}
                  src={heroe.img}
                  alt={heroe.name}
                  title={heroe.name}
                  onClick={() => {
                    setClasificacionesMeta((prev) => {
                      const nuevas = { ...prev };

                      delete nuevas[`${rolActivo}-${heroe.id}`];

                      return nuevas;
                    });
                  }}
                  style={{
                    width: "55px",
                    height: "55px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    margin: "3px",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <h3 className="mt-4">Héroes disponibles</h3>
      <p>
        Rol: {rolActivo} | Tier seleccionada: {tierActiva}
      </p>

        <div
          className="d-flex flex-wrap gap-2 p-3 rounded"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            background: "rgba(255,255,255,0.1)",
          }}
        >
          {heroes
            .filter(
              (heroe) =>
                !clasificacionesMeta[`${rolActivo}-${heroe.id}`]
            )
            .map((heroe) => (
            <img
              key={heroe.id}
              src={heroe.img}
              alt={heroe.name}
              title={heroe.name}
              style={{
                width: "65px",
                height: "65px",
                objectFit: "cover",
                borderRadius: "8px",
                cursor: "pointer",
              }}
                onClick={() => {
                setClasificacionesMeta((prev) => ({
                  ...prev,
                  [`${rolActivo}-${heroe.id}`]: tierActiva,
                }));
              }}
            />
          ))}
        </div>
    </div>
  );
}

export default Ayuda;
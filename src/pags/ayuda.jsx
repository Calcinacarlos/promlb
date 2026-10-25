import Accordion from "react-bootstrap/Accordion";

function Ayuda() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">AYUDA</h1>

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Drafts</Accordion.Header>
          <Accordion.Body>
            En la sección Drafts se encuentra el simulador de la fase de
            selección del modo Clasificatoria de Mobile Legends: Bang Bang con
            primer pick para el equipo aliado.
            <br />
            <br />
            El proceso inicia con la primera fase de bans. Primero se realizan
            los 3 bans aliados y posteriormente los 3 bans enemigos.
            <br />
            <br />
            Después se habilita la segunda fase de bans, donde se realizan 2
            bans aliados seguidos de 2 bans enemigos.
            <br />
            <br />
            Durante la primera fase de bans es posible que ambos equipos repitan
            un mismo héroe, simulando el comportamiento del modo Clasificatoria.
            Sin embargo, un mismo equipo no puede repetir sus propios bans.
            <br />
            <br />
            La opción de no realizar un ban aún no se encuentra implementada.
            <br />
            <br />
            Finalizadas las fases de bans, comienza la fase de picks siguiendo
            el orden:
            <br />
            <br />
            <strong>A - B - B - A - A - B - B - A - A - B</strong>
            <br />
            <br />
            donde A representa al equipo aliado y B al equipo enemigo.
            <br />
            <br />
            Durante esta fase no es posible seleccionar héroes previamente
            baneados o ya elegidos por alguno de los equipos.
            <br />
            <br />
            El objetivo de esta sección es simular de forma sencilla el
            comportamiento de una partida clasificatoria para facilitar la
            planificación de composiciones y estrategias.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Base</Accordion.Header>
          <Accordion.Body>
            La sección Base contiene la base de relaciones entre los héroes
            disponibles en el proyecto.
            <br />
            <br />
            Cada héroe almacena información sobre enfrentamientos favorables,
            neutros y desfavorables frente a otros personajes de la base de
            datos.
            <br />
            <br />
            El propósito de esta sección es servir como apoyo durante la toma de
            decisiones en la fase de picks y bans, permitiendo identificar
            opciones más convenientes según la composición observada.
            <br />
            <br />
            Actualmente la base se encuentra limitada a 30 héroes, seleccionados
            con fines académicos y de demostración para el proyecto.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Ayuda;

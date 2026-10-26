import heroCeplin from "./hero-ceplin.json";

const imagenes = import.meta.glob("../heroes/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

export const heroes = heroCeplin.map((heroe) => ({
  id: heroe.id_hero,
  name: heroe.name_hero,
  img: imagenes[`../heroes/${heroe["images-hero"]}`],
  classes: heroe.role,
}));

console.log("HÉROES CARGADOS:", heroes.length);

console.log(
  "HÉROES SIN IMAGEN:",
  heroes.filter((heroe) => !heroe.img)
);
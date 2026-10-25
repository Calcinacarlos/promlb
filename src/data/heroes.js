const imagenes = import.meta.glob("../heroes/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
const imagenHeroe = (archivo) => {
  return imagenes[`../heroes/${archivo}.jpg`];
};

export const heroes = [
  { id: 1, name: "Arlot", img: imagenHeroe("Arlot") },
  { id: 2, name: "Baxia", img: imagenHeroe("Baxia") },
  { id: 3, name: "Chou", img: imagenHeroe("Chou") },
  { id: 4, name: "Zhuxin", img: imagenHeroe("Chuchin") },
  { id: 5, name: "Claude", img: imagenHeroe("Claude") },
  { id: 6, name: "Gatot", img: imagenHeroe("Gatot") },
  { id: 7, name: "Gloo", img: imagenHeroe("Gloo") },
  { id: 8, name: "Gord", img: imagenHeroe("Gord") },
  { id: 9, name: "Guinevere", img: imagenHeroe("Guinevere") },
  { id: 10, name: "Harith", img: imagenHeroe("Harith") },
  { id: 11, name: "Harley", img: imagenHeroe("Harley") },
  { id: 12, name: "Hilda", img: imagenHeroe("Hilda") },
  { id: 13, name: "Hilos", img: imagenHeroe("Hilos") },
  { id: 14, name: "Kalea", img: imagenHeroe("Kalea") },
  { id: 15, name: "Kaled", img: imagenHeroe("Kaled") },
  { id: 16, name: "Karrie", img: imagenHeroe("Karrie") },
  { id: 17, name: "Kimmy", img: imagenHeroe("Kimmy") },
  { id: 18, name: "LapuLapu", img: imagenHeroe("Lapu") },
  { id: 19, name: "Leomord", img: imagenHeroe("Lomasroto") },
  { id: 20, name: "Marcel", img: imagenHeroe("Marcel") },
  { id: 21, name: "Moscov", img: imagenHeroe("Moskito") },
  { id: 22, name: "Pharsa", img: imagenHeroe("Pharsa") },
  { id: 23, name: "Phoveus", img: imagenHeroe("Phoveus") },
  { id: 24, name: "Sora", img: imagenHeroe("Sora") },
  { id: 25, name: "Suyou", img: imagenHeroe("Suyou") },
  { id: 26, name: "Valentina", img: imagenHeroe("Valentina") },
  { id: 27, name: "Alice", img: imagenHeroe("Vampirameta") },
  { id: 28, name: "Yizunzin", img: imagenHeroe("Yizun") },
  { id: 29, name: "Yve", img: imagenHeroe("Yve") },
  { id: 30, name: "Fredrin", img: imagenHeroe("Fredrin") },
];

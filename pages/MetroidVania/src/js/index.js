//TinyVania by Lance Smith
//Entry file
import Game from "./game.js";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game");
  const game = new Game(canvas);
});

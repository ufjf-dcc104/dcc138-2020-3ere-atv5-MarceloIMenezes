import Cena from "./Cena.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");

const cena = new Cena(canvas);
const s1 = new Sprite();

cena.addSprite(s1);
cena.addSprite(new Sprite({x: 60, vx: -10, color: "blue"}));

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "p":
        case "P":
            cena.parar();
            break;
        default:
            cena.iniciar();
    }
});
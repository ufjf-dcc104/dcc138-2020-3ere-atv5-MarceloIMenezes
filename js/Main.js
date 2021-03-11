import Cena from "./Cena.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");

const cena = new Cena(canvas);
const s1 = new Sprite();

cena.addSprite(s1);
cena.desenhaCena();
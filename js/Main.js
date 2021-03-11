import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");

const asset = new AssetManager()
const cena = new Cena(canvas, asset);
const s1 = new Sprite();

cena.addSprite(s1);
cena.addSprite(new Sprite({x: 60, vx: -10, color: "blue"}));

cena.iniciarMenu();
if (asset.porcentagemCarregada() == 100) {
    cena.parar();
    cena.iniciar();

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
}
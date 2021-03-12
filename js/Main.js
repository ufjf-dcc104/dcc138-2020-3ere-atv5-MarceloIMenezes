import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");

const asset = new AssetManager();
const mapa = new Mapa();
const mixer = new Mixer();
const cena = new Cena(canvas, asset);

cena.configuraMapa(mapa);

cena.addSprite(new Sprite());
cena.addSprite(new Sprite({x: 60, vx: -10, color: "blue"}));

cena.iniciarMenu();
if (asset.porcentagemCarregada() == 100 || asset.porcentagemCarregada() == -1) {
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
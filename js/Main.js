import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import {mapa1 as mapa1} from "../maps/mapa1.js";

const canvas = document.querySelector("canvas");
canvas.width = 16*32;
canvas.height = 12*32;

const asset = new AssetManager();
const mixer = new Mixer();
const cena = new Cena(canvas, asset);

const mapa = new Mapa(12, 16, 32);
mapa.carregaMapa(mapa1);
cena.configuraMapa(mapa);



cena.iniciarMenu();
if (asset.porcentagemCarregada() == 100 || asset.porcentagemCarregada() == -1) {
    cena.parar();
    cena.iniciar();
    cena.geraSpriteRandom();

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
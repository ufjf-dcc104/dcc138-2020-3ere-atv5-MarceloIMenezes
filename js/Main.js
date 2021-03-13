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

asset.carregaImagem("tijolo_pedra01", "asset/pedra.jpg");
asset.carregaImagem("tijolo_pedra02", "asset/tijolo_pedra2.png");
asset.carregaImagem("tijolo_pedra03", "asset/piso_de_banheiro.png");

const mapa = new Mapa(12, 16, 32);
mapa.carregaMapa(mapa1);
cena.configuraMapa(mapa);



//cena.iniciarMenu();
//if (asset.porcentagemCarregada() == 100 || asset.porcentagemCarregada() == -1) {
//    cena.parar();
    cena.iniciar();

    let vezesRepetidas = 0; 
    var repeat = setInterval(() => {
        
        cena.geraSpriteRandom();
        vezesRepetidas++;
        if (vezesRepetidas === 100) {
            clearInterval(repeat); 
        }
    } 
    , 4000);

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
//}
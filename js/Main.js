import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import {mapa1 as mapa1} from "../maps/mapa1.js";
import InputManager from "./InputManager.js";

const canvas = document.querySelector("canvas");
canvas.width = 16*32;
canvas.height = 12*32;

const input = new InputManager();
const asset = new AssetManager();
const mixer = new Mixer(10);
const cena = new Cena(canvas, asset);

cena.adicionaMixer(mixer);

asset.carregaImagem("tijolo_pedra01", "asset/pedra.jpg");
asset.carregaImagem("tijolo_pedra02", "asset/tijolo_pedra2.png");
asset.carregaImagem("tijolo_pedra03", "asset/piso_de_banheiro.png");
asset.carregaAudio("colisao", "asset/colisao.wav");

input.configTeclado({
    "ArrowLeft": "ANDA_ESQUERDA",
    "ArrowRight": "ANDA_DIREITA",
    "ArrowUp": "ANDA_CIMA",
    "ArrowDown": "ANDA_BAIXO"
})

const mapa = new Mapa(12, 16, 32);
mapa.carregaMapa(mapa1);
cena.configuraMapa(mapa);

const pc = new Sprite({x: 2*mapa.SIZE - 16, y: (mapa.LINHAS-1)*mapa.SIZE - 16, color: "blue", cena: cena});
pc.controle = function(dt) {
    switch (true) {
        case input.comandos.get("ANDA_ESQUERDA"):
            this.vx = -50;
            break;
        case input.comandos.get("ANDA_DIREITA"):
            this.vx = 50;
            break;
        default:
            this.vx = 0;       
    }
    switch (true) {
        case input.comandos.get("ANDA_CIMA"):
            this.vy = -50;
            break;
        case input.comandos.get("ANDA_BAIXO"):
            this.vy = 50;
            break;
        default:
            this.vy = 0;       
    }
}


//cena.iniciarMenu();
//if (asset.porcentagemCarregada() == 100 || asset.porcentagemCarregada() == -1) {
//    cena.parar();
    cena.iniciar();

    cena.addSprite(pc);

    /*
    let vezesRepetidas = 0; 
    var repeat = setInterval(() => {
        
        cena.geraSpriteRandom();
        vezesRepetidas++;
        if (vezesRepetidas === 100) {
            clearInterval(repeat); 
        }
    } 
    , 4000);
    */

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
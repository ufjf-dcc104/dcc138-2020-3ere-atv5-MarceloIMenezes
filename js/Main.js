import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import {mapa1 as mapa1} from "../maps/mapa1.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import TelaLoad from "./TelaLoad.js";
import EndGame from "./EndGame.js";
import CenaJogo from "./CenaJogo.js";

const canvas = document.querySelector("canvas");
canvas.width = 16*32;
canvas.height = 12*32;

const input = new InputManager();
const asset = new AssetManager();
const game = new Game(canvas, asset, input);
const mixer = new Mixer(10);

const cena = new Cena(canvas, asset);
const fase1 = new CenaJogo(canvas, asset);
const load = new TelaLoad(canvas, asset);
const endgame = new EndGame(canvas, asset);

fase1.adicionaMixer(mixer);

asset.carregaImagem("tijolo_pedra01", "asset/pedra.jpg");
asset.carregaImagem("tijolo_pedra02", "asset/tijolo_pedra2.png");
asset.carregaImagem("tijolo_pedra03", "asset/piso_de_banheiro.png");
asset.carregaAudio("colisao", "asset/colisao.wav");

input.configTeclado({
    "ArrowLeft": "ANDA_ESQUERDA",
    "ArrowRight": "ANDA_DIREITA",
    "ArrowUp": "ANDA_CIMA",
    "ArrowDown": "ANDA_BAIXO",
    " ": "INICIA_JOGO"
})

const mapa = new Mapa(12, 16, 32);
mapa.carregaMapa(mapa1);
fase1.configuraMapa(mapa);
game.addCena("load", load);
game.addCena("cena", cena);
game.addCena("fase1", fase1);
game.addCena("endGame", endgame);

const pc = new Sprite({x: 2*mapa.SIZE - 16, y: (mapa.LINHAS-1)*mapa.SIZE - 16, color: "blue", cena: fase1});
pc.tags.add("pc");
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

    game.iniciar();

    fase1.addSprite(pc);

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "p":
            case "P":
                game.parar();
                break;
            case "d":
            case "D":
                game.iniciar();
                break;
        }
    });
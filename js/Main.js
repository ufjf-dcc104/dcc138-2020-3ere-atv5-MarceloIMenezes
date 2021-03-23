import AssetManager from "./AssetManager.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import TelaLoad from "./TelaLoad.js";
import EndGame from "./EndGame.js";
import CenaJogo from "./CenaJogo.js";
import EndGameVit from "./EndGameVit.js";

const canvas = document.querySelector("canvas");
canvas.width = 16*32;
canvas.height = 12*32;

const input = new InputManager();
const asset = new AssetManager();
const game = new Game(canvas, asset, input);


const fase1 = new CenaJogo(canvas);
const load = new TelaLoad(canvas);
const endgame = new EndGame(canvas);
const endgamevit = new EndGameVit(canvas);

game.addCena("load", load);
game.addCena("fase1", fase1);
game.addCena("endGame", endgame);
game.addCena("endGameVit", endgamevit);

asset.carregaImagem("tijolo_pedra01", "asset/pedra.jpg");
asset.carregaImagem("tijolo_pedra02", "asset/tijolo_pedra2.png");
asset.carregaImagem("tijolo_pedra03", "asset/piso_de_banheiro.png");
asset.carregaAudio("colisao", "asset/colisao.wav");
asset.carregaAudio("coin", "asset/coin.wav");
asset.carregaImagem("goldCoin", "asset/goldCoin9.png");


input.configTeclado({
    "ArrowLeft": "ANDA_ESQUERDA",
    "ArrowRight": "ANDA_DIREITA",
    "ArrowUp": "ANDA_CIMA",
    "ArrowDown": "ANDA_BAIXO",
    " ": "INICIA_JOGO"
})

game.iniciar();

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
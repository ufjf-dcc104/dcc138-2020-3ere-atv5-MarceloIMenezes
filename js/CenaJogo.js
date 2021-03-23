import Cena from "./Cena.js"
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import {mapa1 as mapa1} from "../maps/mapa1.js";

export default class EndGame extends Cena {
    addSprColisao(sprA, sprB) {
        if (!this.sprColisao.includes(sprA))
            this.sprColisao.push(sprA);
        if (!this.sprColisao.includes(sprB))
            this.sprColisao.push(sprB);
        if (sprA.tags.has("pc") && sprB.tags.has("en") ||
            sprA.tags.has("en") && sprB.tags.has("pc")) {
                this.game.selecionaCena("endGame");
        }
    }
    preparar() {
        super.preparar();
        this.tParaProxSprite = 4;

        const mapa = new Mapa(12, 16, 32);
        mapa.carregaMapa(mapa1);
        this.configuraMapa(mapa);

        const mixer = new Mixer(10);
        this.adicionaMixer(mixer);

        const pc = new Sprite({x: 2*this.mapa.SIZE - 16, y: (this.mapa.LINHAS-1)*this.mapa.SIZE - 16, color: "blue", cena: this});
        pc.tags.add("pc");
        pc.controle = function() {
            switch (true) {
                case this.cena.game.input.comandos.get("ANDA_ESQUERDA"):
                    this.vx = -50;
                    break;
                    case this.cena.game.input.comandos.get("ANDA_DIREITA"):
                        this.vx = 50;
                    break;
                default:
                    this.vx = 0;       
            }
            switch (true) {
                case this.cena.game.input.comandos.get("ANDA_CIMA"):
                    this.vy = -50;
                    break;
                case this.cena.game.input.comandos.get("ANDA_BAIXO"):
                    this.vy = 50;
                    break;
                default:
                    this.vy = 0;       
            }
        }
        this.addSprite(pc);
    }
    quadro(t) {
        super.quadro(t);
        if ((t/1000).toFixed(0) % 4 === 0) {
            if ((t/1000).toFixed(0) == this.tParaProxSprite) {
                this.geraSpriteRandom();
                this.tParaProxSprite += 4;
            }
        }
    }
    geraSpriteRandom() {
        const sizeSpr = 16;
        const vx = Math.random() * (50 + 50) - 50;
        const vy = Math.random() * (50 + 50) - 50;

        while (true) { //procura posicao valida
            var l = Math.floor(Math.random() * (this.mapa.LINHAS - 1) + 1);
            var c = Math.floor(Math.random() * (this.mapa.COLUNAS - 1) + 1);
            if (this.mapa.tiles[l][c] == 0)
                break;
        }
        const xSpr = c*this.mapa.SIZE + (Math.random() * (3*sizeSpr/2 - sizeSpr/2) + sizeSpr/2);
        const ySpr = l*this.mapa.SIZE + (Math.random() * (3*sizeSpr/2 - sizeSpr/2) + sizeSpr/2);

        const en = new Sprite({x: xSpr, y: ySpr, w: sizeSpr, h: sizeSpr, vx: vx, vy: vy, cena: this})
        en.tags.add("en");
        this.addSprite(en);
    }
}
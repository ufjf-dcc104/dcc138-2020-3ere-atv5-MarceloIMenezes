import Sprite from "../js/Sprite.js";

export default class Cena {
    constructor(canvas = null, assets = null) {
        this.CANVAS = canvas;
        this.CTX = this.CANVAS?.getContext("2d");
        this.assets = assets;
        this.game = null;
        this.preparar();
    }
    iniciar() {
        this.exec = true;
        this.idAnim = requestAnimationFrame((t) => {this.quadro(t);});
        this.t0 = null;
        this.dt = 0;
    }
    parar() {
        this.exec = false;
        cancelAnimationFrame(this.idAnim);
        this.t0 = null;
        this.dt = 0;
    }
    quadro(t) {
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;

        this.passo(this.dt);
        this.verificaColisao()
        this.removeSprColisao();
        this.desenhaCena();
        
        if (this.exec)
            this.iniciar();

        this.t0 = t;
    }
    passo(dt) {
        for (const sprite of this.sprites) {
            sprite.movimento(dt);
        }
    }
    desenhaCena() {
        this.CTX.fillStyle = "grey";
        this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);

        this.mapa.desenhaTile(this.CTX, this.assets);
        
        this.CTX.fillStyle = "lightgreen";
        this.CTX.textAlign = "center";
        this.CTX.font = "15px Comic Sans MS";
        this.CTX.fontWeight = "bolder";
        this.CTX.fillText("Pontuação: " + this.game.pontuacao, 2*this.mapa.SIZE+this.mapa.SIZE/2, this.mapa.SIZE/2+5);

        for (const sprite of this.sprites) {
            sprite.desenhaSprite(this.CTX);
        }
    }
    addSprite(sprite) {
        this.sprites.push(sprite);
    }
    
    verificaColisao() {
        for (let i=0; i < this.sprites.length - 1; i++) {
            for (let j= i + 1; j < this.sprites.length; j++) {
                if (this.sprites[i].isColidindo(this.sprites[j])) {
                    this.addSprColisao(this.sprites[i], this.sprites[j]);
                }
            }
        }
    }
    addSprColisao(sprA, sprB) {
        this.verSprColisao(sprA);
        this.verSprColisao(sprB);
    }
    verSprColisao(spr) {
        if (!this.sprColisao.includes(spr))
            this.sprColisao.push(spr);
    }
    removeSprColisao() {
        for (const spr of this.sprColisao) {
            if (this.sprites.indexOf(spr) >= 0) {
                this.sprites.splice(this.sprites.indexOf(spr), 1);
            }
        }
        this.sprColisao = [];
    }
    configuraMapa(mapa) {
        this.mapa = mapa;
    }
    adicionaMixer(mixer) {
        this.mixer = mixer;
    }
    preparar() {
        this.sprites = [];
        this.sprColisao = []; // vetor dos sprites que colidiram
        this.mapa = null;
        this.mixer = null;
        this.t0 = null;
        this.dt = 0;
        this.idAnim = null;
        this.exec = true;
    }
}
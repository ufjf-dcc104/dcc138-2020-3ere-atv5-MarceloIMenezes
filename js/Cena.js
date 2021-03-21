import Sprite from "../js/Sprite.js";

export default class Cena {
    constructor(canvas = null, assets = null) {
        this.CANVAS = canvas;
        this.CTX = this.CANVAS?.getContext("2d");
        this.sprites = [];
        this.sprColisao = []; // vetor dos sprites que colidiram
        this.assets = assets;
        this.mapa = null;
        this.mixer = null;
        this.game = null;

        this.exec = true;
        this.tParaProxSprite = 4;

        this.t0 = null;
        this.dt = 0;
        this.idAnim = null;
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
        
        if ((t/1000).toFixed(0) % 4 === 0) {
            if ((t/1000).toFixed(0) == this.tParaProxSprite) {
                this.geraSpriteRandom();
                this.tParaProxSprite += 4;
            }
        }
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

        for (const sprite of this.sprites) {
            sprite.desenhaSprite(this.CTX);
        }
    }
    addSprite(sprite) {
        this.sprites.push(sprite);
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
    verificaColisao() {
        for (let i=0; i < this.sprites.length - 1; i++) {
            for (let j= i + 1; j < this.sprites.length; j++) {
                if (this.sprites[i].isColidindo(this.sprites[j])) {
                    this.mixer.play(this.assets.audio("colisao"));
                    this.addSprColisao(this.sprites[i], this.sprites[j]);
                }
            }
        }
    }
    addSprColisao(sprA, sprB) {
        if (!this.sprColisao.includes(sprA))
            this.sprColisao.push(sprA);
        if (!this.sprColisao.includes(sprB))
            this.sprColisao.push(sprB);
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
        
    }
}
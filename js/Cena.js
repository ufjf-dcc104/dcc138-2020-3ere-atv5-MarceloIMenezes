export default class Cena {
    constructor(canvas) {
        this.CANVAS = canvas;
        this.CTX = this.CANVAS.getContext("2d");
        this.sprites = [];
        
        this.t0 = 0;
        this.dt = 0;
        this.idAnim = null;
    }
    iniciar() {
        this.idAnim = requestAnimationFrame((t) => {this.quadro(t);});
    }
    parar() {
        cancelAnimationFrame(this.idAnim);
    }
    quadro(t) {
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;

        this.passo(this.dt);
        this.desenhaCena();

        this.iniciar();
        this.t0 = t;
    }
    passo(dt) {
        for (const sprite of this.sprites) {
            sprite.movimento(dt);
        }
    }
    desenhaCena() {
        this.CTX.fillStyle = "black";
        this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);

        for (const sprite of this.sprites) {
            sprite.desenhaSprite(this.CTX);
        }
    }
    addSprite(sprite) {
        this.sprites.push(sprite);
    }
}
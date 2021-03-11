export default class Cena {
    constructor(canvas) {
        this.CANVAS = canvas;
        this.CTX = this.CANVAS.getContext("2d");
        this.sprites = [];
        
        this.t0 = 0;
        this.dt = 0;
    }
    quadro(t) {
        this.t0 = t0 ?? t;
        this.dt = (t - this.t0)/1000;

        this.passo();
        this.desenhaCena();

        this.t0 = t;
    }
    passo(dt) {
        for (const sprite of this.sprites) {
            sprite.movimento(dt);
        }
    }
    desenhaCena() {
        this.fillStyle = "black";
        this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);

        for (const sprite of this.sprites) {
            sprite.desenhaSprite(this.CTX);
        }
    }
    addSprite(sprite) {
        this.sprites.push(sprite);
    }
}
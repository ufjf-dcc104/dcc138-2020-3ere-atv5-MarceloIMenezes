export default class Cena {
    constructor(canvas) {
        this.CANVAS = canvas;
        this.CTX = this.CANVAS.getContext("2d");
        this.sprites = [];
    }
    desenhaCena() {
        this.fillStyle = "black";
        this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);

        for (var i=0; i < this.sprites.length; i++) {
            this.sprites[i].desenhaSprite(this.CTX);
        }
    }
    addSprite(sprite) {
        this.sprites.push(sprite);
    }
}
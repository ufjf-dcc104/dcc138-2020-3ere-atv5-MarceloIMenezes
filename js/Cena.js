export default class Cena {
    constructor(canvas) {
        this.CANVAS = canvas;
        this.CTX = this.CANVAS.getContext("2d");
    }
    desenhaCena() {
        this.fillStyle = "black";
        this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);
    }
}
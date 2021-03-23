export default class Game {
    constructor(canvas, assets, input) {
        this.canvas = canvas;
        this.CTX = this.canvas.getContext("2d");
        this.assets = assets;
        this.input = input;
        this.cenas = new Map();
        this.cenaAtual = null;

        this.pontuacao = 0;
    }
    addCena(chave, cena) {
        cena.game = this;
        cena.canvas = this.canvas;
        cena.assets = this.assets;
        cena.input = this.input;
        cena.CTX = this.CTX;
        this.cenas.set(chave, cena);
        if (this.cenaAtual === null)
            this.cenaAtual = cena;
    }
    selecionaCena(chave) {
        if (this.cenas.has(chave)) {
            this.parar();
            this.cenaAtual = this.cenas.get(chave);
            this.cenaAtual.preparar();
            this.iniciar();
        }
    }
    iniciar() {
        this.cenaAtual?.iniciar();
    }
    parar() {
        this.cenaAtual?.parar();
    }
}
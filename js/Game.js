export default class Game {
    constructor(canvas, assets, input) {
        this.canvas = canvas;
        this.assets = assets;
        this.input = input;
        this.cenas = new Map();
        this.cenaAtual = null;
    }
    addCena(chave, cena) {
        this.cenas.set(chave, cena);
        cena.game = this;
        cena.canvas = this.canvas;
        cena.assets = this.assets;
        cena.input = this.input;
        if (this.cenaAtual === null)
            this.cenaAtual = cena;
    }
    selecionaCena(chave) {
        if (this.cenas.has(chave))
            this.parar();
            this.cenaAtual = this.cenas.get(chave);
            this.iniciar();
    }
    iniciar() {
        this.cenaAtual?.iniciar();
    }
    parar() {
        this.cenaAtual?.parar();
    }
}
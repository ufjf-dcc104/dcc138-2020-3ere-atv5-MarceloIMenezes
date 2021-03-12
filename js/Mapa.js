export default class Mapa {
    constructor(linhas=12, colunas=16, size=32) {
        this.LINHAS = linhas;
        this.COLUNAS = colunas;
        this.SIZE = size;
        this.tiles = [];
        for (let i=0; i<this.LINHAS; i++) {
            this.tiles[i] = [];
            for (let j=0; j<this.COLUNAS; j++) {
                this.tiles[i][j] = 0;
            }
        }
    }
    desenhaTile(ctx) {
        for (let i=0; i<this.LINHAS; i++) {
            for (let j=0; j<this.COLUNAS; j++) {
                switch (this.tiles[i][j]) {
                    default:
                        ctx.fillStyle = "black";
                        ctx.fillRect(i*this.SIZE, j*this.SIZE, this.SIZE, this.SIZE);
                }
            }
        }
    }
}
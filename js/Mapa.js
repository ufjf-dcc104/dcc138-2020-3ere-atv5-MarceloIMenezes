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
                    case 0:
                        ctx.linewidth = 1;
                        ctx.strokeStyle = "white";
                        ctx.strokeRect(j*this.SIZE, i*this.SIZE, this.SIZE, this.SIZE);
                        ctx.fillStyle = "black";
                        ctx.fillRect(j*this.SIZE, i*this.SIZE, this.SIZE, this.SIZE);
                        break;
                    case 1:
                        ctx.fillStyle = "orange";
                        ctx.fillRect(j*this.SIZE, i*this.SIZE, this.SIZE, this.SIZE);
                        break;
                    default:
                        ctx.fillStyle = "black";
                        ctx.fillRect(j*this.SIZE, i*this.SIZE, this.SIZE, this.SIZE);
                }
            }
        }
    }
    carregaMapa(mapa) {
        this.LINHAS = mapa.length;
        this.COLUNAS = mapa[0]?.length ?? 0;

        this.tiles = [];
        for (let i=0; i<this.LINHAS; i++) {
            this.tiles[i] = [];
            for (let j=0; j<this.COLUNAS; j++) {
                this.tiles[i][j] = mapa[i][j];
            }
        }
    }
}
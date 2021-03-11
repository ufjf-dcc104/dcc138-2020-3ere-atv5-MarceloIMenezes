export default class AssetManager {
    constructor() {
        this.nTotalImg = 0;
        this.nCarregado = 0;

        this.imagens = new Map();
    }

    carregaImagem(chave, src) {
        const img = new Image();
        img.addEventListener("load", () => {
            nCarregado++;
        });
        img.src = src;
        this.imagens.set(chave, img);
        this.nTotalImg++;
    }
    imagem(chave) {
        return this.imagens.get(chave);
    }

    porcentagemCarregada() {
        if (this.nTotalImg > 0)
            return ((this.nCarregado/this.nTotalImg)*100).toFixed(2);
        return -1;
    }
}
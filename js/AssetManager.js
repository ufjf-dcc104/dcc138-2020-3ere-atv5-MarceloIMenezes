export default class AssetManager {
    constructor() {
        this.nTotalAssets = 0;
        this.nCarregado = 0;

        this.imagens = new Map();
        this.audios = new Map();
    }

    carregaImagem(chave, src) {
        const img = new Image();
        img.addEventListener("load", () => {
            this.nCarregado++;
        });
        img.src = src;
        this.imagens.set(chave, img);
        this.nTotalAssets++;
    }
    imagem(chave) {
        return this.imagens.get(chave);
    }
    carregaAudio(chave, src) {
        const audio = new Audio();
        audio.addEventListener("loadeddata", () => {
            this.nCarregado++;
        });
        audio.src = src;
        this.audios.set(chave, audio);
        this.nTotalAssets++;
    }
    audio(chave) {
        return this.audios.get(chave);
    }

    porcentagemCarregada() {
        if (this.nTotalAssets > 0)
            return `${((this.nCarregado/this.nTotalAssets)*100).toFixed(2)}%`;
        return "Nada para ser carregado";
    }
    
    acabouCarregar() {
        if (this.nTotalAssets === this.nCarregado)
            return true;
        return false;
    }
}
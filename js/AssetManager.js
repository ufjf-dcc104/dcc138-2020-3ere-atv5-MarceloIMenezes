export default class AssetManager {
    constructor() {
        this.nTotalImg = 0;
        this.nCarregado = 0;
    }

    porcentagemCarregada() {
        if (this.nTotalImg > 0)
            return ((this.nCarregado/this.nTotalImg)*100).toFixed(2);
        return -1;
    }
}
export default class Mixer {
    constructor(nCanais) {
        this.MAXCANAIS = 0;
        this.canais = [];
        this.configuraCanais(nCanais);
    }
    
    configuraCanais(nCanais) {
        this.MAXCANAIS = nCanais;
        this.canais = [];
        for (let i=0; i<nCanais; i++) {
            const canal = {
                audio: new Audio(),
                fim: new Date().getTime()
            };
            this.canais[i] = canal;
        }
    }
    play(audio) {
        now = new Date().getTime();
        for (let i=0; i<this.MAXCANAIS; i++) {
            const canal = this.canais[i];
            if (canal.fim < now) {
                canal.audio.src = audio.src;
                canal.fim = now + audio.duration()*100;
                canal.audio.play();
                break;
            }
        }
    }
}
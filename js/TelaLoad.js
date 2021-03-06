import Cena from "./Cena.js"

export default class TelaLoad extends Cena {
    desenhaCena() {
        this.CTX.fillStyle = "black";
        this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);

        this.CTX.fillStyle = "lightgreen";
        this.CTX.textAlign = "center";
        this.CTX.font = "40px Comic Sans MS";
        this.CTX.fillText(this.assets?.porcentagemCarregada(), this.CANVAS.width/2, this.CANVAS.height/2);
        
        if (this.assets?.acabouCarregar()) {
            this.CTX.fillStyle = "black";
            this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);
            
            this.CTX.fillStyle = "lightgreen";
            this.CTX.textAlign = "center";
            this.CTX.font = "20px Comic Sans MS";
            this.CTX.fillText("Aperte espaço para continuar", this.CANVAS.width/2, this.CANVAS.height/2);    
        }
    }
    quadro(t) {
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;

        if (this.assets?.acabouCarregar()) {
            if (this.input.comandos.get("INICIA_JOGO")) {
                this.game.selecionaCena("fase1");
                return;
            }
        }
        this.passo(this.dt);

        this.desenhaCena();

        this.iniciar();
        this.t0 = t;
    }
}
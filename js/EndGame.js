export default class EndGame extends Cena {
    desenhaCena() {
        this.CTX.fillStyle = "black";
        this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);
        
        this.CTX.fillStyle = "lightgreen";
        this.CTX.textAlign = "center";
        this.CTX.font = "20px Comic Sans MS";
        this.CTX.fillText("PERDESTE", this.CANVAS.width/2, this.CANVAS.height/2);    
    }

}
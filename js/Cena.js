export default class Cena {
    constructor(canvas, assets) {
        this.CANVAS = canvas;
        this.CTX = this.CANVAS.getContext("2d");
        this.sprites = [];
        this.sprColisao = []; // vetor dos sprites que colidiram
        this.assets = assets;
        this.mapa = null;

        this.t0 = 0;
        this.dt = 0;
        this.idAnim = null;
    }
    iniciar() {
        this.idAnim = requestAnimationFrame((t) => {this.quadro(t);});
        this.t0 = null;
        this.dt = 0;
    }
    parar() {
        cancelAnimationFrame(this.idAnim);
        this.t0 = null;
        this.dt = 0;
    }
    quadro(t) {
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;

        this.passo(this.dt);
        this.verificaColisao()
        this.removeSprColisao();
        this.desenhaCena();
        
        this.iniciar();
        this.t0 = t;
    }
    passo(dt) {
        for (const sprite of this.sprites) {
            sprite.movimento(dt);
        }
    }
    iniciarMenu() {
        this.idAnim = requestAnimationFrame((t) => {this.menu(t);});
        this.t0 = null;
        this.dt = 0;
    }
    menu(t) {
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0)/1000;

        this.CTX.fillStyle = "black";
        this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);

        this.CTX.fillStyle = "white";
        const pCar = this.assets.porcentagemCarregada();
        if (pCar >= 0 && pCar != 100)
            this.CTX.fillText(pCar + "%", this.CANVAS.width/2, this.CANVAS.height/2);
        else if (pCar == 100)
            this.CTX.fillText("Pressione qualquer tecla para começar", this.CANVAS.width/2, this.CANVAS.height/2);
        else     
            this.CTX.fillText("Nada para ser carregado", this.CANVAS.width/2, this.CANVAS.height/2);

        this.iniciarMenu();
        this.t0 = t;
    }
    desenhaCena() {
        this.CTX.fillStyle = "grey";
        this.CTX.fillRect(0, 0, this.CANVAS.width, this.CANVAS.height);

        this.mapa.desenhaTile(this.CTX);

        for (const sprite of this.sprites) {
            sprite.desenhaSprite(this.CTX);
        }
    }
    addSprite(sprite) {
        this.sprites.push(sprite);
    }
    verificaColisao() {
        for (let i=0; i < this.sprites.length - 1; i++) {
            for (let j= i + 1; j < this.sprites.length; j++) {
                if (this.sprites[i].isColidindo(this.sprites[j])) {
                    this.addSprColisao(this.sprites[i], this.sprites[j]);
                }
            }
        }
    }
    addSprColisao(sprA, sprB) {
        if (!this.sprColisao.includes(sprA))
            this.sprColisao.push(sprA);
        if (!this.sprColisao.includes(sprB))
            this.sprColisao.push(sprB);
    }
    removeSprColisao() {
        for (const spr of this.sprColisao) {
            if (this.sprites.indexOf(spr) >= 0) {
                this.sprites.splice(spr, 1);
            }
        }
        this.sprColisao = [];
    }
    configuraMapa(mapa) {
        this.mapa = mapa;
    }
}
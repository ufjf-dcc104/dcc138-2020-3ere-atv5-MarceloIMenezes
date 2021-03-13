export default class Sprite {
    constructor({x=60, y=100, w=16, h=16, vx=0, vy=0, color="red", cena=null} = {}) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.cena = cena;
        this.gridSX = 0; //grid onde a ponta sup esq do bloco esta
        this.gridSY = 0;
        this.gridIX = 0; //grid onde a ponta inf dir do bloco esta
        this.gridIY = 0; 
    }
    movimento(dt) {
        this.x = this.x + this.vx*dt;
        this.y = this.y + this.vy*dt;

        this.gridSX = Math.floor((this.x - this.w/2) / (this.cena?.mapa.SIZE ?? 1));
        this.gridSY = Math.floor((this.y - this.h/2) / (this.cena?.mapa.SIZE ?? 1));
        this.gridIX = Math.floor((this.x + this.w/2) / (this.cena?.mapa.SIZE ?? 1));
        this.gridIY = Math.floor((this.y + this.h/2) / (this.cena?.mapa.SIZE ?? 1));
        
        this.bateuParede(dt);
    }

    desenhaSprite(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
    }
    isColidindo(spr) {
        return !(
            this.x - this.w/2 > spr.x + spr.w/2 ||
            this.x + this.w/2 < spr.x - spr.w/2 ||
            this.y - this.h/2 > spr.y + spr.h/2 ||
            this.y + this.h/2 < spr.y - spr.h/2
        );
    }
    bateuParede(dt) {
        for (let i = this.gridSY; i <= this.gridIY; i++) {
            this.bateuDireita(this.gridSX, i);
            this.bateuEsquerda(this.gridIX, i);
        }
        for (let j = this.gridSX; j <= this.gridIX; j++) {
            this.bateuBaixo(j, this.gridSY);
            this.bateuCima(j, this.gridIY);
        }
    }
    bateuEsquerda(prGridX, prGridY) {
        if (this.vx > 0) {
            const size = this.cena.mapa.SIZE;
            if (this.cena.mapa.tiles[prGridY][prGridX] != 0) {
                const parede = {
                    x: prGridX*size + size/2,
                    y: prGridY*size + size/2,
                    w: size,
                    h: size
                };
                if (this.isColidindo(parede) && this.cena.mapa.tiles[prGridY-1][prGridX] != 0) {
                    this.vx = 0;
                    this.x = parede.x - parede.w/2 - this.w/2 - 1;
                }
            }
        }
    }
    bateuDireita(prGridX, prGridY) {
        if (this.vx < 0) {
            const size = this.cena.mapa.SIZE;
            if (this.cena.mapa.tiles[prGridY][prGridX] != 0) {
                const parede = {
                    x: prGridX*size + size/2,
                    y: prGridY*size + size/2,
                    w: size,
                    h: size
                };
                if (this.isColidindo(parede)) {
                    this.vx = 0;
                    this.x = this.x + 1; // parede.x + parede.w/2 + this.w/2 + 1;
                }
            }
        }
    }
    bateuCima(prGridX, prGridY) {
        if (this.vy > 0) {
            const size = this.cena.mapa.SIZE;
            if (this.cena.mapa.tiles[prGridY][prGridX] != 0) {
                const parede = {
                    x: prGridX*size + size/2,
                    y: prGridY*size + size/2,
                    w: size,
                    h: size
                };
                if (this.isColidindo(parede)) {
                    this.vy = 0;
                    this.y = this.y - 1; //parede.y - parede.h/2 - this.h/2 - 1;
                }
            }
        }
    }
    bateuBaixo(prGridX, prGridY) {
        if (this.vy < 0) {
            const size = this.cena.mapa.SIZE;
            if (this.cena.mapa.tiles[prGridY][prGridX] != 0) {
                const parede = {
                    x: prGridX*size + size/2,
                    y: prGridY*size + size/2,
                    w: size,
                    h: size
                };
                if (this.isColidindo(parede)) {
                    this.vy = 0;
                    this.y = this.y + 1; //parede.y + parede.h/2 + this.h/2 + 1;
                }
            }
        }
    }
}
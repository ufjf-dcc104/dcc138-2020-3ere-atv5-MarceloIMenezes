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
        this.gridX = 0;
        this.gridY = 0;
    }
    movimento(dt) {
        this.x = this.x + this.vx*dt;
        this.y = this.y + this.vy*dt;
        this.gridX = Math.floor(this.x / (this.cena?.mapa.SIZE ?? 1));
        this.gridY = Math.floor(this.y / (this.cena?.mapa.SIZE ?? 1));
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
        this.bateuEsquerda(this.gridX + 1, this.gridY - 1);
        this.bateuEsquerda(this.gridX + 1, this.gridY);
        this.bateuEsquerda(this.gridX + 1, this.gridY + 1);

        this.bateuDireita(this.gridX - 1, this.gridY - 1);
        this.bateuDireita(this.gridX - 1, this.gridY);
        this.bateuDireita(this.gridX - 1, this.gridY + 1);

        this.bateuBaixo(this.gridX, this.gridY - 1);

        this.bateuCima(this.gridX, this.gridY + 1);

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
                if (this.isColidindo(parede)) {
                    this.vx = 0;
                    this.x = parede.x - parede.w/2 - this.w/2;
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
                    this.x = parede.x + parede.w/2 + this.w/2;
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
                    this.y = parede.y - parede.h/2 - this.h/2;
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
                    this.y = parede.y + parede.h/2 + this.h/2;
                }
            }
        }
    }
}
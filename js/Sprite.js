export default class Sprite {
    constructor({x=10, y=10, w=16, h=16, vx=0, vy=0, color="red", cena=null} = {}) {
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
}
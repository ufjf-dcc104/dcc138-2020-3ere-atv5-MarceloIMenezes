export default class Sprite {
    constructor({x=10, y=10, w=16, h=16, vx=0, vy=0, color="red"} = {}) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
    }
    movimento(dt) {
        this.x = this.x + this.vx*dt;
        this.y = this.y + this.vy*dt;
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
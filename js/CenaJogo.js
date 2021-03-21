import Cena from "./Cena.js"

export default class EndGame extends Cena {
    addSprColisao(sprA, sprB) {
        if (!this.sprColisao.includes(sprA))
            this.sprColisao.push(sprA);
        if (!this.sprColisao.includes(sprB))
            this.sprColisao.push(sprB);
        if (sprA.tags.has("pc") && sprB.tags.has("en") ||
            sprA.tags.has("en") && sprB.tags.has("pc"))
            this.game.selecionaCena("endGame");
    }
}
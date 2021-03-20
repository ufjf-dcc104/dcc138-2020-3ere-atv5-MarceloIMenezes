export default class InputManager {
    constructor() {
        this.comandos = new Map();
        this.teclado = new Map();
    }

    configTeclado(input) {
        for (const tecla in input) {
            const acao = input[tecla];
            this.comandos.set(acao, false);
            this.teclado.set(tecla, comando);
        }
        const that = this;
        addEventListener("keydown", (e) => {
            const action = that.teclado.get(e.key);
            if (action) {
                that.comandos.set(action, true);
            }
        });
        addEventListener("keyup", (e) => {
            const action = that.teclado.get(e.key);
            if (action) {
                that.comandos.set(action, false);
            }
        });
    }
}
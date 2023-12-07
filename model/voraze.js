export class Voraz {
    constructor({ id, nome, imagem, ataque, defesa}) {
        this.id = id;
        this.nome = nome;
        this.imagem = imagem;
        this.ataque = ataque;
        this.defesa = defesa;
    }
}

class Vorazes {
    constructor() {
        this.vorazes = [];
    }

    addVoraze(voraze) {
        this.vorazes.push(voraze);
    }

    getVoraze(id) {
        return this.vorazes.find(voraze => voraze.id === id);
    }

    getVorazes() {
        //remove duplicates
        this.removeDuplicates();
        return this.vorazes;
    }

    getCont() {
        return this.cont;
    }

    removeDuplicates() {
        this.vorazes = this.vorazes.filter((voraze, index, self) =>
            index === self.findIndex((h) => (
                h.nome === voraze.nome
            ))
        )
    }

    consoleVorazes() {
        console.log(this.vorazes);
    }

}

export default Vorazes;
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

    select5RandomVorazes() {
        let randomVorazes = [];
        let randomIndex = 0;
        let vorazes = this.vorazes;

        for (let i = 0; i < 6; i++) {
            randomIndex = Math.floor(Math.random() * vorazes.length);
            randomVorazes.push(vorazes[randomIndex]);
            vorazes.splice(randomIndex, 1);
        }

        return randomVorazes;
    }

}

export default Vorazes;
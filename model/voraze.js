//definir a classe Voraz
export class Voraz {
    //construtor da classe que inicializa um personagem
    constructor({ id, nome, imagem, ataque, defesa}) {
        this.id = id;
        this.nome = nome;
        this.imagem = imagem;
        this.ataque = ataque;
        this.defesa = defesa;
    }
}

//definir a classe Vorazes
class Vorazes {
    //construtor da classe que inicializa uma lista de personagens
    constructor() {
        this.vorazes = [];
    }
    //método para adicionar um personagem à lista
    addVoraze(voraze) {
        this.vorazes.push(voraze);
    }
    //método para obter um personagem específico da lista pelo ID
    getVoraze(id) {
        return this.vorazes.find(voraze => voraze.id === id);
    }
    //remover personagens duplicados
    getVorazes() {
        this.removeDuplicates();
        return this.vorazes;
    }
    //método para obter o número total de personagem
    getCont() {
        return this.cont;
    }
    //método para remover lista de personagens duplicadas
    removeDuplicates() {
        this.vorazes = this.vorazes.filter((voraze, index, self) =>
            index === self.findIndex((h) => (
                h.nome === voraze.nome
            ))
        )
    }

}
//exporte Vorazes
export default Vorazes;
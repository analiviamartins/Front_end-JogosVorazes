//definir classe listVorazes
class listVorazes {
    //construtor da classe que inicializa a lista
    constructor() {
        this.persosArray = [];
    }

    //método para adicionar personagem
    addPerso(vorazes) {
        this.persosArray.push(vorazes);
        this.removeDuplicates()
    }
    //método para obter personagem por id
    getPerso(id) {
        return this.persosArray.find(vorazes => vorazes.id === id);
    }
    //método para obter todos os personagens
    getPersos() {
        //remove personagens duplicados
        this.removeDuplicates();
        return this.persosArray;
    }
    //método para obter personagens de um distrito específico
    getVorazesDistrict(distrito){
        return this.personagens.filter((personagem) => personagem.distrito.toLowerCase() === distrito.toLowerCase() )
      }
  
      //retorna uma lista de personagens que possuem um nome específico
      getVorazesName(nome){
        return this.personagens.filter((personagem) => personagem.nome.toLowerCase() === nome.toLowerCase() )
      }
  
      //retorna uma lista de personagens que possuem uma profissão específico
      getVorazesProfi(profissao){
        return this.personagens.filter((personagem) => personagem.profissao.toLowerCase() === profissao.toLowerCase() )
      }
      //método para obter o número total de personagens
    getCont() {
        return this.cont;
    }
    //metodo para remover lista duplicada de personagem
    removeDuplicates() {
        this.persosArray = this.persosArray.filter((perso, index, self) =>
            index === self.findIndex((h) => (
                h.id === perso.id
            ))
        )
    }

    //método para selecionar 5 personagens aleatórios da lista   
    select5RandomPersos() {
        let randomPersos = [];
        let randomIndex = 0;
        let persosArray = this.persosArray;

        for (let i = 0; i<6; i++) {
            randomIndex = Math.floor(Math.random() * persosArray.length);
            randomPersos.push(persosArray[randomIndex]);
            persosArray.splice(randomIndex, 1);
        }

        return randomPersos;
    }

}
export default listVorazes;

class listVorazes {
    constructor() {
        this.persosArray = [];
    }

    addPerso(vorazes) {
        this.persosArray.push(vorazes);
        this.removeDuplicates()
    }

    getPerso(id) {
        return this.persosArray.find(vorazes => vorazes.id === id);
    }

    getPersos() {
        //remove duplicates
        this.removeDuplicates();
        return this.persosArray;
    }

    getVorazesDistrict(distrito){
        return this.personagens.filter((personagem) => personagem.distrito.toLowerCase() === distrito.toLowerCase() )
      }
  
      // Retorna uma lista de personagens que possuem um nome específico
      getVorazesName(nome){
        return this.personagens.filter((personagem) => personagem.nome.toLowerCase() === nome.toLowerCase() )
      }
  
      // Retorna uma lista de personagens que possuem uma profissão específico
      getVorazesProfi(profissao){
        return this.personagens.filter((personagem) => personagem.profissao.toLowerCase() === profissao.toLowerCase() )
      }

    getCont() {
        return this.cont;
    }

    removeDuplicates() {
        this.persosArray = this.persosArray.filter((perso, index, self) =>
            index === self.findIndex((h) => (
                h.id === perso.id
            ))
        )
    }

    consolePersos() {
        console.log(this.persosArray);
    }

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
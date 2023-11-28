class listVorazes {
    constructor() {
        this.persosArray = [];
    }

    addPerso(perso) {
        this.persosArray.push(perso);
    }

    getPerso(id) {
        return this.persosArray.find(perso => perso.id === id);
    }

    getPerso() {
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
                h.nome === perso.nome
            ))
        )
    }

    consolePersos() {
        console.log(this.persosArray);
    }

    select5RandomPersos() {
        let randomPersos = [];
        let randomIndex = 0;
        let persos = this.persosArray;

        for (let i = 0; i < 6; i++) {
            randomIndex = Math.floor(Math.random() * persos.length);
            randomPersos.push(persos[randomIndex]);
            persos.splice(randomIndex, 1);
        }

        return randomPersos;
    }

}
export default listVorazes;
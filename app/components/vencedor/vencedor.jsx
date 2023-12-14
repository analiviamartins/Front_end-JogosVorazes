// Importando os módulos necessários
import React from 'react'
import style from './vencedor.module.css';

// Definindo o componente Ganhador
const Ganhador = ({ isOpen, onClose, winner, player }) => {
   // Se o modal não estiver aberto, não renderiza nada
    if (!isOpen) {
      return null;
}

 // Se houver um vencedor, renderiza o modal com as informações do vencedor
return (
    <>
     {
        winner ? (
            <div className={style.modal_overlay}>
            <div className={style.modal}>
              <div className={style.modal_header}>
                <h2>Resultado da Batalha</h2>
              </div>
              <div className={style.modal_body}>
                <h1>{winner.nome} é o vencedor!</h1>
                <h2>{player} ganhou esse duelo!</h2>
                <img src={winner.imagem} alt={winner.nome} width={256}  height={128}/>
                <p><strong>Ataque:</strong>{winner.dano}</p>
                <p><strong>Defesa:</strong>{winner.defesa}</p>
                <button className={style.close_button} onClick={onClose}>
                  Voltar
                </button>
              </div>
            </div>
          </div>
        ):(null)
       
    }
    </>
   
   
  );
};

// Exportando o componente Ganhador
export default Ganhador;
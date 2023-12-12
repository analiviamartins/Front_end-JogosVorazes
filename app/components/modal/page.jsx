//importe dos itens necessários
'use client'
import React from 'react';
import style from './modal.module.css';

//criação do Modal
const Modal = ({ isOpen, onClose, vorazes }) => {
  if (!isOpen) {
    return null;
  } 

  return (
    <>
    {
      vorazes? (
        //criação do card
      <div className={style.modal_overlay}>
        <div className={style.modal}>

          <div className={style.modal_header}>
            {/*adição da logo*/}
            <img src="/modal.png" alt="Logo" width={70} height={70} className={style.img} />
          </div>
          {/*adição da descrição*/}
          <div>
            <h2>{vorazes.descricao}</h2>
          </div>
          {/*botão para fechar o card*/}
          <button className={style.close_button} onClick={onClose}>
              <strong>Fechar</strong>
            </button>
        </div>
      </div>
      ):(null)
    }
    </>
  );
};

//exporte do Modal
export default Modal;
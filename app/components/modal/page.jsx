//importando itens necessarios
'use client'
import React from 'react';
import style from './modal.module.css';

//definindo o componente Modal
const Modal = ({ isOpen, onClose, vorazes }) => {
  if (!isOpen) {
    return null;
  } 
  //retornando dados
  return (
    <>
    {
      vorazes? (
      <div className={style.modal_overlay}>
        <div className={style.modal}>

          <div className={style.modal_header}>
            <img src="/modal.png" alt="Logo" width={70} height={70} className={style.img} />
          </div>
          <div>
            <h2>{vorazes.descricao}</h2>
          </div>
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
//exportando o componente Modal
export default Modal;
'use client'
import React from 'react';
import style from './modal.module.css';


const Modal = ({ isOpen, onClose, vorazes }) => {
  if (!isOpen) {
    return null;
  } 

  return (
    <>
    {
      vorazes? (
      <div className={style.modal_overlay}>
        <div className={style.modal}>

          <div className={style.modal_header}>
            <h2>Descrição: </h2>
            <button className={style.close_button} onClick={onClose}>
              Fechar
            </button>
          </div>
          <div>
            <h2>{vorazes.descricao}</h2>
          </div>
          

        </div>
      </div>
      ):(null)
    }
    </>
  );
};

export default Modal;
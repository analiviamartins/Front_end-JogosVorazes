'use client'
import React, { useEffect, useState } from 'react';
import style from './modal.module.css';
import Home from '../../personagens/page.jsx';
import axios from 'axios';

const Modal = ({ isOpen, onClose, vorazes,id }) => {
  if (!isOpen) {
    return null;
  } 

  console.log('vorazes:', vorazes); // Log the vorazes array to the console
 console.log('id:', id); // Log the id to the console

  const personagem = vorazes.find((personagem) => personagem.id == id);

  return (
    <>

      <div className={style.modal_overlay}>
        <div className={style.modal}>

          <div className={style.modal_header}>
            <h2>Descrição</h2>
            <button className={style.close_button} onClick={onClose}>
              Fechar
            </button>
          </div>
          
        <Home image={personagem.imagem} name={personagem.nome} description={personagem.descricao} index={index}/>

        </div>
      </div>

    </>
  );
};

export default Modal;
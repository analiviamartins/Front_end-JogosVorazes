//importe dos itens necessarios
'use client';
import React, { useState } from 'react';
import styles from '../PopUp/popUp.module.css'
import styles from './popUp.module.css'

//definindo o componente Home
export default function Home() {
    //definindo o estado inicial para o pop-up
    const [showPopUp, setShowPopUp] = useState(false);
    const [PopupMessage, setPopUpMessage] = useState('');
    const [PopUptype, setPopUptype] = useState('');

    //definindo a função para mostrar o pop-up
    function handleShowPopUp(time, message, type) {
        setPopUptype(type);
        setPopUpMessage(message);
        setShowPopUp(true);
        setTimeout(() => {
            setShowPopUp(false);
       
        }, time);
   } 
   //retornando dados
   return (
    <div>
        <button onClick={() => handleShowPopUp('Error', 'error', '4000')}>
            
        </button>
    </div> 
   )
}
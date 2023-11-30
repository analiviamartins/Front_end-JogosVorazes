'use client';
import React, { useState } from 'react';
import styles from '../PopUp/popUp.module.css'
import styles from './popUp.module.css'

export default function Home() {
    const [showPopUp, setShowPopUp] = useState(false);
    const [PopupMessage, setPopUpMessage] = useState('');
    const [PopUptype, setPopUptype] = useState('');

    function handleShowPopUp(time, message, type) {
        setPopUptype(type);
        setPopUpMessage(message);
        setShowPopUp(true);
        setTimeout(() => {
            setShowPopUp(false);
       
        }, time);
   } 
   return (
    <div>
        <button onClick={() => handleShowPopUp('Error', 'error', '4000')}>
            
        </button>
    </div> 
   )
}
import React from 'react';
import styles from '../PopUp/popUp.module.css'
import styles from './popUp.module.css'

const PopupMessage = ({ message, type}) => { 
    var color = (type === 'success') ? styles.success : styles.error;
}
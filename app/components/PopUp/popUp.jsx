import React from 'react';
import styles from './popUp.module.css'

const PopupMessage = ({ message, type}) => { 
    var color = (type === 'success') ? styles.success : styles.error;
    var mainDiv = styles.mainDiv + ' ' + color;

  return (
    <div className={mainDiv}>
      <p>{message}</p>
    </div>
  );
};

export default PopupMessage;
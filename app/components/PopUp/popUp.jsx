import React, { useState } from 'react';
import styles from './popUp.module.css';

export default function Home() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [popupMessage, setPopUpMessage] = useState('');
  const [popUpType, setPopUpType] = useState('');

  function handleShowPopUp(type, message, time) {
    setPopUpType(type);
    setPopUpMessage(message);
    setShowPopUp(true);

    setTimeout(() => {
      setShowPopUp(false);
    }, time);
  }

  return (
    <div>
      <button onClick={() => handleShowPopUp('Error', 'This is an error message', 4000)}>
        Show error message
      </button>
      <button onClick={() => handleShowPopUp('Success', 'This is a success message', 4000)}>
        Show success message
      </button>

      {showPopUp && (
        <div className={styles.popupContainer}>
          <div className={popUpType === 'Success' ? styles.success : styles.error}>
            {popupMessage}
          </div>
        </div>
      )}
    </div>
  );
}
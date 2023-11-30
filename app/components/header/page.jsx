import React from "react";
import styles from '../header/page.module.css';
const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.div0}>
      <div className={styles.div1}>
        <img src="Front_end-JogosVorazes/app/components/header/jogos.png" alt="" className={styles.img}/>
      </div>
      <div className={styles.div2}>
        <button>contato</button>
      </div>
      </div>
    </div>
    
  );
};

export default Header;
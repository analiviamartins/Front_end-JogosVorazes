import React from "react";
import styles from '../header/page.module.css';
const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.div0}>
      <div className={styles.div1}>
        <img src="https://mail.google.com/mail/u/0?ui=2&ik=5f1304eb85&attid=0.1&permmsgid=msg-f:1783827309980979023&th=18c16d7cc00e8f4f&view=fimg&fur=ip&sz=s0-l75-ft&attbid=ANGjdJ9RYdsaLq7B5lN4DkSfkfujNGuXFF8OLuMCSF8CxCz-E2UGpMeRKbE3w-6sG_fy9MZU2p_sdubXg_59SYscHvqSsRDwVJY_zX-kjkjhsAEOkISM-lxGjSSkfZk&disp=emb&realattid=ii_lpikrk6c0" alt="" className={styles.img}/>
      </div>
      <div className={styles.div2}>
        <button>contato</button>
      </div>
      </div>
    </div>
    
  );
};

export default Header;
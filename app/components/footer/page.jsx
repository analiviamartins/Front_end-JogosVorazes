import React from 'react';
import styles from './footer.module.css';
import { FaInstagram, FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
<div className={styles.footerContent}>
      <div className={styles.footerIcon}>
      <FaInstagram />
      <FaFacebook />
      <FaTwitter />
      <FaGithub />
</div>
    <div className={styles.btnTopo}>
       <a href='./'>
        <button className={styles.button}>Voltar ao topo</button>
      </a>
      </div>
    <div className={styles.footerText}>
      <p>© 2023 - Todos os direitos reservados.</p>
      </div>
      </div>
  );
}

export default Footer;
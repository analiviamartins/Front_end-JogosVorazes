//Importe das bibliotecas e componentes necessários
import React from 'react';
import styles from './footer.module.css';
import { FaInstagram, FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

//Criar função footer
function Footer() {
  return (
<div className={styles.footerContent}>
      <div className={styles.footerIcon}>
       {/*chamada icons*/}
      <FaInstagram />
      <FaFacebook />
      <FaTwitter />
      <FaGithub />
</div>
     {/*adição de um botão*/}
    <div className={styles.btnTopo}>
       <a href='./'>
        <button className={styles.button}>Voltar ao topo</button>
      </a>
      </div>
       {/*descrição*/}
    <div className={styles.footerText}>
      <p>© 2023 - Todos os direitos reservados.</p>
      </div>
      </div>
  );
}

//exporte footer
export default Footer;
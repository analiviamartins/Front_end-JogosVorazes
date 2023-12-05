import React from 'react';
import styles from './footer.module.css';
import {BsInstagram} from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsGithub} from 'react-icons/bs';

function Footer() {
  return (
<div className={styles.footerContent}>
      <div className={styles.footerIcon}>
        <BsInstagram />
        <BsFacebook />
        <BsTwitter />
        <BsGithub />
</div>
    <div className={styles.footerText}>
      <p>© 2023 - Todos os direitos reservados.</p>
      </div>
      </div>
  );
}

export default Footer;
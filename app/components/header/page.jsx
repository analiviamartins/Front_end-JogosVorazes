import React from 'react';
import style from './page.module.css';

const Header = () => (
 <header>
  <div className={style.header}>
  <img className={style.logo} src='/logoHeader.png' alt='Logo' width={200} height={60}/>
  <button className={style.button}>Contato</button>
  </div>
 </header>
);

export default Header;
 
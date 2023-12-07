import React from 'react';
import style from './page.module.css';
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiArcheryTarget } from "react-icons/gi";


const Header = () => (
 <header>
  <div className={style.header}>
  <img className={style.logo} src='/logoHeader.png' alt='Logo' width={200} height={60}/>
  <a href="./batalha" >
      <button className={style.button}><GiArcheryTarget />
</button>
    </a>
    <a href='./personagens' >
        <button className={style.button}><FaUser />
</button>
    </a>
    <a href='./cadastro' >
        <button className={style.button}><FaUsers /></button>
    </a>
  </div>
 </header>
);

export default Header;
 
//importe dos itens necessarios e icons
import React from 'react';
import style from './page.module.css';
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiArcheryTarget } from "react-icons/gi";
import { MdOutlineContactPage } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";

//definindo o componente Header
const Header = () => (
    <header>
        <div className={style.header}>
            <div className={style.title}>
            <img className={style.logo} src='/logoHeader.png' alt='Logo' width={200} height={60} />
            </div>
            
              
        <div className={style.buttons}>
              <a href='./' >
                    <button className={style.button}><IoIosHome /></button>
                </a>
            <a href="./batalha" >
                <button className={style.button}><GiArcheryTarget />
                </button>
            </a>
            <a href='./personagens' >
                <button className={style.button}><FaUser />
                </button>
            </a>
            <a href='./pessoas' >
                <button className={style.button}><FaUsers /></button>
            </a>
            <a href='./contatos' >
                <button className={style.button}><MdOutlineContactPage /></button>
            </a>

            </div>
        </div>
    </header>
);

//exportando o componente Header
export default Header;
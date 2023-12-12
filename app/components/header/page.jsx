//Importe das bibliotecas e componentes necessários
import React from 'react';
import style from './page.module.css';
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiArcheryTarget } from "react-icons/gi";
import { MdOutlineContactPage } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";

//Criar função header
const Header = () => ( 
    <header>
        <div className={style.header}>
            {/*criação título*/}
            <div className={style.title}>
            {/*adição da logo*/}
            <img className={style.logo} src='/logoHeader.png' alt='Logo' width={200} height={60} />
            </div>
            
         {/*chamada icons*/}
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
            <a href='./pessoa' >
                <button className={style.button}><FaUsers /></button>
            </a>
            <a href='./contato' >
                <button className={style.button}><MdOutlineContactPage /></button>
            </a>

            </div>
        </div>
    </header>
);

//exporte headet
export default Header;
import React from 'react';
import style from './page.module.css';
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiArcheryTarget } from "react-icons/gi";
import { MdOutlineContactPage } from "react-icons/md";

const Header = () => (
    <header>
        <div className={style.header}>
            <div className={style.title}>
            <img className={style.logo} src='/logoHeader.png' alt='Logo' width={200} height={60} />
            </div>
        <div className={style.buttons}>
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

export default Header;
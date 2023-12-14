// 'use client' é uma diretiva para o Babel que permite o uso de recursos mais recentes do JavaScript.
"use client";

// Importando os módulos necessários
import React, { useState } from 'react';
import style from './contato.module.css';
import Header from '../components/header/page.jsx';
import Footer from '../components/footer/page.jsx';

// Função para validar o endereço de e-mail
function isValidEmail(email) {
 return /\S+@\S+\.\S+/.test(email);
}

// Função para validar o número de telefone
function isValidPhoneNumber(phoneNumber) {
  var phoneNumberPattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return phoneNumberPattern.test(phoneNumber);
}

// Componente principal do formulário de contato
export default function ContactPage() {
 // Estado para armazenar o valor do e-mail
 const [email, setEmail] = useState("");
 // Estado para armazenar o valor do telefone
 const [phone, setPhone] = useState("");
 // Estado para armazenar erros de e-mail
 const [emailError, setEmailError] = useState("");
 // Estado para armazenar erros de telefone
 const [phoneError, setPhoneError] = useState("");

 // PopUp
 const [showPopup, setShowPopup] = useState(false);
 const [popupMessage, setPopupMessage] = useState("");
 const [popupType, setPopupType] = useState("");

 const handleShowPopup = (message, type) => {
  setPopupMessage(message);
  setPopupType(type);
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
  }, 3000);
};

  // Função para lidar com a mudança de valor no campo de e-mail
 const handleEmailChange = (event) => {
  setEmail(event.target.value);
  if (!isValidEmail(event.target.value)) {
    setEmailError("Email inválido");
    handleShowPopup("Parâmetros incompletos", "error");
  } else {
    setEmailError("");
    handleShowPopup("Erro aleatório", "error");
  }
 };

 // Função para lidar com a mudança de valor no campo de telefone
 const handlePhoneChange = (event) => {
  setPhone(event.target.value);
  if (!isValidPhoneNumber(event.target.value)) {
    setPhoneError("Telefone inválido");
    handleShowPopup("Parâmetros incompletos", "error");
  } else {
    setPhoneError("");
    handleShowPopup("Erro aleatório", "error");
  }
 };

  // Renderização do componente
 return (
  <div className={style.container1}>
    <Header />
  <form className={style.container}>
    
    <div className={style.titleBlock}>
    <h1>Contato</h1>
    <div className={style.nameBlock}>
      <label htmlFor="name">Nome *</label>
      <input className={style.name} id="name" type="text" name="name" required />
    </div>
    <div className={style.emailBlock}>
      <label htmlFor="email">Email *</label>
      <input className={style.email} id="email" type="email" name="email" value={email} onChange={handleEmailChange} required />
      {emailError && <span>{emailError}</span>}
    </div>
    <div className={style.phoneBlock}>
      <label htmlFor="phone">Telefone *</label>
      <input className={style.phone} id="phone" type="tel" name="phone" value={phone} onChange={handlePhoneChange} required />
      {phoneError && <span>{phoneError}</span>}
    </div>
    <div className={style.messageBlock}>
      <label htmlFor="message">Comentário *</label>
      <input className={style.message} id="message" rows="6" name="message" required></input>
    </div>
    <div className={style.buttonBlock}>
      <button type="submit" className={style.button}>Enviar</button>
    </div>
    {showPopup && <PopUp message={popupMessage} type={popupType} />}
    </div>
    
  </form>
  <Footer />
  </div>
 );
}
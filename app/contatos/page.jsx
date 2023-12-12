"use client";
import React, { useState } from 'react';
import style from './contato.module.css';

function isValidEmail(email) {
 return /\S+@\S+\.\S+/.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  var phoneNumberPattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return phoneNumberPattern.test(phoneNumber);
}

export default function ContactPage() {
 const [email, setEmail] = useState("");
 const [phone, setPhone] = useState("");
 const [emailError, setEmailError] = useState("");
 const [phoneError, setPhoneError] = useState("");

 const handleEmailChange = (event) => {
  setEmail(event.target.value);
  if (!isValidEmail(event.target.value)) {
    setEmailError("Email inválido");
  } else {
    setEmailError("");
  }
 };

 const handlePhoneChange = (event) => {
  setPhone(event.target.value);
  if (!isValidPhoneNumber(event.target.value)) {
    setPhoneError("Telefone inválido");
  } else {
    setPhoneError("");
  }
 };

 return (
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
    </div>
  </form>
 );
}
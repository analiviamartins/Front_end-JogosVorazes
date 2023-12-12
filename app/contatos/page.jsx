"use client";
import React, { useState } from 'react';

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
  <form className="container">
    <h1>Contato</h1>
    <div className="name block">
      <label htmlFor="name">Nome *</label>
      <input id="name" type="text" name="name" required />
    </div>
    <div className="email block">
      <label htmlFor="email">Email *</label>
      <input id="email" type="email" name="email" value={email} onChange={handleEmailChange} required />
      {emailError && <span>{emailError}</span>}
    </div>
    <div className="phone block">
      <label htmlFor="phone">Telefone *</label>
      <input id="phone" type="tel" name="phone" value={phone} onChange={handlePhoneChange} required />
      {phoneError && <span>{phoneError}</span>}
    </div>
    <div className="message block">
      <label htmlFor="message">Comentário *</label>
      <textarea id="message" rows="6" name="message" required></textarea>
    </div>
    <div className="button block">
      <button type="submit">Enviar</button>
    </div>
  </form>
 );
}
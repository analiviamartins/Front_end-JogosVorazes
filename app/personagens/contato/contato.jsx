import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import "./style.css";

const PopUp = ({ mensagem, onClose }) => {
  return (
    <div className="pop-up-overlay">
      <div className="pop-up">
        <div className="pop-up-conteudo">
          <p>{mensagem}</p>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

const Contato = () => {
  const [popUpVisivel, setPopUpVisivel] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [inputErrors, setInputErrors] = useState({
    nome: false,
    email: false,
    telefone: false,
    mensagem: false,
  });

  const isValidEmail = (value) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const exibirPopUp = () => {

    if (!nome || !isValidEmail(email) || !telefone || !mensagem) {
      setInputErrors({
        nome: !nome,
        email: !isValidEmail(email),
        telefone: !telefone,
        mensagem: !mensagem,
      });
    } else {
      setPopUpVisivel(true);
      setTimeout(() => {
        setPopUpVisivel(false);
      }, 3000);

      setInputErrors({
        nome: false,
        email: false,
        telefone: false,
        mensagem: false,
      });
    }
  };

  return (
    <div className="container">
      <div className="coluna-de-entrada">
        <div>
          <h1>Nome</h1>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={inputErrors.nome ? "entrada-com-erro" : ""}
          />
        </div>
        <div>
          <h1>Email</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputErrors.email ? "entrada-com-erro" : ""}
          />
        </div>
      </div>
      <div className="coluna-de-entrada">
        <div>
          <h1>Telefone</h1>
          <InputMask
            mask="(99) 99999-9999"
            maskChar={null}
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className={inputErrors.telefone ? "entrada-com-erro" : ""}
          />
        </div>
        <div>
          <h1>Mensagem</h1>
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className={inputErrors.mensagem ? "entrada-com-erro" : ""}
          />
        </div>
      </div>
      {popUpVisivel && (
        <PopUp
          mensagem="Enviado com sucesso"
          onClose={() => setPopUpVisivel(false)}
        />
      )}
      <div className="container-botao">
        <button onClick={exibirPopUp}>Enviar</button>
      </div>
    </div>
  );
};

export default Contato;

"use client"
//npm install react-input-mask
// Importações necessárias
import React, { useState } from "react";
import InputMask from "react-input-mask";
import "./page.modules.css";
import axios from "axios";

// Componente do Pop-up
const PopUp = ({ mensagem, sucesso, onClose }) => {
  return (
    <div className={`pop-up-overlay ${sucesso ? "sucesso" : "erro"}`}>
      <div className="pop-up">
        <div className="pop-up-conteudo">
          <p>{mensagem}</p>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

// Componente de Contato
const Contato = () => {
  // Estados para controlar o estado do Pop-up, dados de entrada e erros de entrada
  const [popUpVisivel, setPopUpVisivel] = useState(false);
  const [popUpSucesso, setPopUpSucesso] = useState(true);
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

  // Função para exibir o Pop-up
  const exibirPopUp = (sucesso, mensagem) => {
    setPopUpSucesso(sucesso);
    setPopUpVisivel(true);
    // Oculta o Pop-up após 3 segundos
    setTimeout(() => {
      setPopUpVisivel(false);
    }, 3000);
  };

  // Função para validar o formato de e-mail
  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  // Função para enviar dados
  const enviarDados = async () => {
    // Configura erros de entrada para campos obrigatórios
    setInputErrors({
      nome: !nome,
      email: !validarEmail(email),
      telefone: !telefone,
      mensagem: !mensagem,
    });

    // Verifica se há campos obrigatórios vazios
    if (!nome || !validarEmail(email) || !mensagem) {
      return;
    }

    try {
      // Chama a API para enviar dados
      const response = await axios.post("http://10.88.200.193:5000", {
        nome,
        email,
        telefone,
        mensagem,
      });

      if (response.status === 200) {
        // Exibe Pop-up com mensagem de sucesso
        exibirPopUp(true, "Mensagem enviada com sucesso");
      } else {
        // Exibe Pop-up com mensagem de erro
        exibirPopUp(false, "Erro ao enviar dados à API");
        console.error("Erro ao enviar dados à API:", response.data);
      }
    } catch (error) {
      // Exibe Pop-up com mensagem de erro
      exibirPopUp(false, "Erro ao enviar dados à API");
      console.error("Erro ao enviar dados à API:", error.message);
    }
  };

  // JSX do componente de Contato
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
            mask="+55 (99) 99999-9999"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className={inputErrors.telefone ? "entrada-com-erro" : ""}
          />
        </div>
        <div>
          <h1>Mensagem</h1>
          <input
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className={inputErrors.mensagem ? "entrada-com-erro" : ""}
          />
        </div>
      </div>
      
      {popUpVisivel && (
        <PopUp
          mensagem={popUpSucesso ? "Mensagem enviada com sucesso" : "Mensagem enviada com sucesso"}
          sucesso={popUpSucesso}
          onClose={() => setPopUpVisivel(false)}
        />
      )}
      <div className="container-botao">
        <button onClick={enviarDados}>Enviar</button>
      </div>
    </div>
  );
};

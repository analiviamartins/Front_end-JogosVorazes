'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import style from "./page.module.css";

function Home() {
  const [dadosApi, setDadosApi] = useState([]);
  const [nome, setNome] = useState("");
  const [url, setImage] = useState("");
  const [age, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [hobby, setHobby] = useState("");
  const [pessoaEmEdicao, setPessoaEmEdicao] = useState(null);

  useEffect(() => {
    async function PessoaFetch() {
      try {
        const resposta = await axios.get("/api/equipe");
        setDadosApi(resposta.data.membros);
      } catch (error) {
        console.log("error fetching data:", error);
      }
    }

    PessoaFetch();
  }, []);

  const removePessoa = async (id) => {
    try {
      await axios.delete(`/api/equipe/${id}`);
      const updatedData = dadosApi.filter((p) => p.id !== id);
      setDadosApi(updatedData);
    } catch (error) {
      console.log("error removing person:", error);
    }
  };

  const editarPessoa = async () => {
    try {
      if (!pessoaEmEdicao) {
        // Se não houver pessoa em edição, não faz nada
        return;
      }

      const pessoaEditada = {
        nome,
        url,
        idade: age,
        email,
        hobby,
      };

      await axios.put(`/api/equipe/${pessoaEmEdicao.id}`, { pessoaEditada });

      // Atualiza os dados na interface
      const updatedData = dadosApi.map((p) =>
        p.id === pessoaEmEdicao.id ? { id: pessoaEmEdicao.id, ...pessoaEditada } : p
      );
      setDadosApi(updatedData);

      // Limpa os campos após a edição
      setNome("");
      setImage("");
      setIdade("");
      setEmail("");
      setHobby("");
      setPessoaEmEdicao(null); // Finaliza o modo de edição
    } catch (error) {
      console.log("error editing person:", error);
    }
  };

  const iniciarEdicao = (pessoa) => {
    // Preenche os campos com os dados da pessoa selecionada
    setNome(pessoa.nome);
    setImage(pessoa.url);
    setIdade(pessoa.idade);
    setEmail(pessoa.email);
    setHobby(pessoa.hobby);
    setPessoaEmEdicao(pessoa);
  };

  const cadastrarPessoa = async () => {
    try {
      // Valida se todos os campos estão preenchidos
      if (!nome || !url || !age || !email || !hobby) {
        console.log("Preencha todos os campos.");
        return;
      }

      const novaPessoa = {
        nome,
        url,
        idade: age,
        email,
        hobby,
      };

      const resposta = await axios.post("/api/equipe", { nome, url, age, email, hobby });
      setDadosApi([...dadosApi, resposta.data]); // Adiciona a nova pessoa aos dados existentes

      // Limpa os campos após o cadastro
      setNome("");
      setImage("");
      setIdade("");
      setEmail("");
      setHobby("");

      // Adiciona mensagem de sucesso
      console.log("Pessoa cadastrada com sucesso!");
    } catch (error) {
      console.log("error creating person:", error);

      // Adiciona mensagem de erro
      console.log("Erro ao cadastrar pessoa. Tente novamente.");
    }
  };
  ;

  return (
    <div className={style.pageBody}>
      <p>Cadastro</p>
      {dadosApi && dadosApi.length > 0 ? (
        <div>
          {dadosApi.map((pesso) => (
            <div key={pesso.id}>
              <div>
                <p>
                  <strong> Nome:</strong> {pesso.nome}{" "}
                </p>
                <img src={pesso.url} alt={pesso.nome} />

                <p>
                  <strong>Idade:</strong> {pesso.idade}
                </p>

                <p>
                  <strong>Email:</strong> {pesso.email}
                </p>

                <p>
                  <strong>Hobby:</strong> {pesso.hobby}
                </p>

                <div className={style.buttonContainer}>
                  <button
                    className={style.remove}
                    onClick={() => removePessoa(pesso.id)}
                  >
                    Excluir
                  </button>
                  <button
                    className={style.edit}
                    onClick={() => iniciarEdicao(pesso)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <input
        value={nome}
        className={style.input}
        onChange={(e) => setNome(e.target.value)}
        type="text"
        placeholder="Nome:"
      />

      <input
        value={url}
        className={style.input}
        onChange={(e) => setImage(e.target.value)}
        type="url"
        placeholder="Link da sua imagem:"
      />

      <input
        value={age}
        className={style.input}
        onChange={(e) => setIdade(e.target.value)}
        type="number"
        placeholder="Idade:"
      />

      <input
        value={email}
        className={style.input}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email:"
      />

      <input
        value={hobby}
        className={style.input}
        onChange={(e) => setHobby(e.target.value)}
        type="text"
        placeholder="Seu hobby:"
      />

      <div className={style.buttonContainer}>
        <button
          className={style.add}
          onClick={pessoaEmEdicao ? editarPessoa : cadastrarPessoa}
        >
          {pessoaEmEdicao ? "Salvar Edição" : "Cadastrar Pessoa"}
        </button>
      </div>
    </div>
  );
}

export default Home;